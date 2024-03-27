import numpy as np
import pandas as pd
#Visualization Libraries
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
import ast
import os
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def preprocess_tags(tags_column):
    """Convert string representation of lists in the 'tags' column to actual lists."""
    return tags_column.apply(ast.literal_eval)

def vectorize_skills(skills, vectorizer=None):
    """Vectorize the provided skills using the given vectorizer or create a new one."""
    if vectorizer is None:
        vectorizer = CountVectorizer(stop_words='english', lowercase=True)
        return vectorizer.fit_transform(skills), vectorizer
    else:
        return vectorizer.transform(skills)

def recommend_jobs_based_on_skills(dataset, freelancer_skills, top_n=10):
    """Recommend jobs based on a list of freelancer's skills."""
    # Ensure 'tags' are in list format
    dataset['tags'] = preprocess_tags(dataset['tags'])
    dataset['tags_joined'] = dataset['tags'].apply(lambda x: ' '.join(x))

    # Vectorize job skills
    skills_matrix, vectorizer = vectorize_skills(dataset['tags_joined'])

    # Vectorize freelancer's skills
    freelancer_skills_joined = ' '.join(freelancer_skills)
    freelancer_vector = vectorizer.transform([freelancer_skills_joined])

    # Calculate cosine similarity
    cosine_sim_skills = cosine_similarity(freelancer_vector, skills_matrix)

    # Identify top N similar jobs
    top_indexes = pd.Series(cosine_sim_skills.flatten()).nlargest(top_n).index
    recommended_jobs = dataset.iloc[top_indexes]

    return recommended_jobs[['job_title', 'tags']]

# Load your dataset
df =pd.read_csv('freelancer_job_postings.csv',index_col='projectId')

# Example usage
freelancer_skills = ['python','Database']
recommended_jobs = recommend_jobs_based_on_skills(df, freelancer_skills)
print(recommended_jobs)
