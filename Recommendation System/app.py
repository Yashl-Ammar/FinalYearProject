from flask import Flask, request, jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import ast

app = Flask(__name__)

def preprocess_tags(tags_column):
    """Convert string representation of lists in the 'tags' column to actual lists."""
    return tags_column.apply(ast.literal_eval)

def vectorize_skills_tfidf(skills, vectorizer=None):
    """Vectorize the provided skills using TF-IDF vectorizer."""
    if vectorizer is None:
        vectorizer = TfidfVectorizer(stop_words='english', lowercase=True)
        return vectorizer.fit_transform(skills), vectorizer
    else:
        return vectorizer.transform(skills)

def recommend_jobs_based_on_skills_tfidf(dataset, freelancer_skills, top_n=10):
    """Recommend jobs based on a list of freelancer's skills using TF-IDF."""
    # Ensure 'tags' are in list format
    dataset['tags'] = preprocess_tags(dataset['tags'])
    dataset['tags_joined'] = dataset['tags'].apply(lambda x: ' '.join(x))

    # Vectorize job skills using TF-IDF
    skills_matrix, vectorizer = vectorize_skills_tfidf(dataset['tags_joined'])

    # Vectorize freelancer's skills using TF-IDF
    freelancer_skills_joined = ' '.join(freelancer_skills)
    freelancer_vector = vectorizer.transform([freelancer_skills_joined])

    # Calculate cosine similarity
    cosine_sim_skills = cosine_similarity(freelancer_vector, skills_matrix)

    # Identify top N similar jobs
    top_indexes = pd.Series(cosine_sim_skills.flatten()).nlargest(top_n).index
    recommended_jobs = dataset.iloc[top_indexes]

    return recommended_jobs[['job_title', 'tags']]

# Load the dataset into a DataFrame
df = pd.read_csv('freelancer_job_postings.csv', index_col='projectId')

@app.route('/recommend_jobs', methods=['POST'])
def recommend_jobs():
    """Endpoint to recommend jobs based on freelancer's skills."""
    try:
        # Get freelancer skills from request
        data = request.get_json()
        freelancer_skills = data['skills']

        # Recommend jobs based on freelancer's skills
        recommended_jobs = recommend_jobs_based_on_skills_tfidf(df, freelancer_skills)

        # Convert DataFrame to JSON and return
        recommended_jobs_json = recommended_jobs.to_json(orient='records')
        return jsonify(recommended_jobs_json)

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
