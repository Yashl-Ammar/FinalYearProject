from flask import Flask, request, jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import ast
from flask import Flask
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os
import pymongo
# Load environment variables
load_dotenv()

app = Flask(__name__)

def preprocess_tags(tags_column):
    """Check if input is a string representation of a list and convert to a list if so.
    Return input directly if it's already a list."""
    def convert(tag):
        if isinstance(tag, str):
            try:
                return ast.literal_eval(tag)
            except ValueError:
                return []  # or some other fallback value like ['unknown']
        return tag
    
    return tags_column.apply(convert)


def vectorize_skills_tfidf(skills, vectorizer=None):
    """Vectorize the provided skills using TF-IDF vectorizer."""
    if vectorizer is None:
        vectorizer = TfidfVectorizer(stop_words='english', lowercase=True)
        return vectorizer.fit_transform(skills), vectorizer
    else:
        return vectorizer.transform(skills)

def recommend_jobs_based_on_skills_tfidf(dataset, freelancer_skills, top_n=10):
    """Recommend jobs based on a list of freelancer's skills using TF-IDF."""
    # Ensure 'skills' are in list format
    dataset['skills'] = preprocess_tags(dataset['skills'])
    dataset['skills_joined'] = dataset['skills'].apply(lambda x: ' '.join(x))

    # Vectorize job skills using TF-IDF
    skills_matrix, vectorizer = vectorize_skills_tfidf(dataset['skills_joined'])

    # Vectorize freelancer's skills using TF-IDF
    freelancer_skills_joined = ' '.join(freelancer_skills)
    freelancer_vector = vectorizer.transform([freelancer_skills_joined])

    # Calculate cosine similarity
    cosine_sim_skills = cosine_similarity(freelancer_vector, skills_matrix)

    # Identify top N similar jobs
    top_indexes = pd.Series(cosine_sim_skills.flatten()).nlargest(top_n).index
    recommended_jobs = dataset.iloc[top_indexes]

    return recommended_jobs  # Return the entire DataFrame row of recommended jobs



@app.route('/recommend_jobs', methods=['POST'])
def recommend_jobs():
    try:
        data = request.get_json()
        freelancer_skills = data['skills']
        client = pymongo.MongoClient(os.getenv("DB_URI"))
        # Database Name
        db = client["test"]
 
        # Collection Name
        col = db["jobs"]
        # Attempt to fetch jobs from MongoDB 'jobs' collection
        try:
            jobs_cursor = col.find()
            print("Fetched jobs_cursor:", jobs_cursor)  # Debug print
        except Exception as e:
            print("Error fetching jobs from MongoDB:", e)
            return jsonify({'error': str(e)}), 500

        jobs_list = list(jobs_cursor)
        print(f"Fetched {len(jobs_list)} jobs")  # Debug print to confirm jobs are fetched

        if not jobs_list:
            return jsonify({'error': 'No jobs found in database'}), 404

        # Convert jobs to DataFrame
        jobs_df = pd.DataFrame(jobs_list)

        # Ensure 'tags' field exists and is correctly formatted
        if 'skills' in jobs_df.columns:
            jobs_df['skills'] = jobs_df['skills'].apply(lambda x: x if isinstance(x, list) else [])
        else:
            print("The 'skills' column is missing in jobs data.")

        # Recommend jobs based on freelancer's skills
        recommended_jobs = recommend_jobs_based_on_skills_tfidf(jobs_df, freelancer_skills)
        # Convert DataFrame to JSON and return
        recommended_jobs_json = recommended_jobs.to_json(orient='records', default_handler=str)
        return jsonify(recommended_jobs_json)

    except Exception as e:
        print("Exception occurred:", e)  # Log the exception
        return jsonify({'error': str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True)
