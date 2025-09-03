from flask import Flask, request, render_template
import nltk
nltk.download('vader_lexicon', quiet=True)  # Download VADER lexicon
from nltk.sentiment import SentimentIntensityAnalyzer
from textblob import TextBlob
import matplotlib
matplotlib.use('Agg') # Use this to avoid GUI issues in Flask
import matplotlib.pyplot as plt
import os

# Initialize Flask App
app = Flask(__name__)

# ----------- Routes ----------- 
# Home Route
@app.route('/')
def home():
    return render_template('home.html')   # Show home page first

# About Route
@app.route('/about')
def about():
    return render_template('about.html')

# Contact Route
@app.route('/contact')
def contact():
    return render_template('contact.html')

# App Route
@app.route('/app')
def app_page():
    return render_template('app.html')

# Result Route
@app.route('/result', methods=['POST'])
def analyze_sentiment():
    text = request.form['text']

    # Use VADER for Sentiment Analysis
    sa = SentimentIntensityAnalyzer() # Implement VADER
    scores = sa.polarity_scores(text) # Get polarity scores

    polarity = scores['compound'] # Compound score for overall sentiment
    pos = scores['pos'] # Fraction of text that is positive (0 to 1)
    neu = scores['neu'] # Fraction of text that is neutral (0 to 1)
    neg = scores['neg'] # Fraction of text that is negative (0 to 1)

    # Determine sentiment
    if polarity >= 0.05:
        sentiment = "Positive 😊"
    elif polarity <= -0.05:
        sentiment = "Negative 😢"
    else:
        sentiment = "Neutral 😐"

    # Subjectivity using TextBlob
    blob = TextBlob(text)
    subjectivity = blob.sentiment.subjectivity  # 0 (objective) to 1 (subjective)

    # Subjectivity Classification
    if subjectivity < 0.5:
        subjectivity_class = "Objective"
    else:
        subjectivity_class = "Subjective"

    # Create Matplotlib Chart
    labels = ["Positive", "Neutral", "Negative"]
    values = [pos, neu, neg]
    colors = ['green', 'blue', 'red']

    plt.figure(figsize=(5, 4)) # Width 5 inches, height 4 inches.
    plt.bar(labels, values, color=colors) # Draws vertical bars.
    plt.ylim(0, 1) # Set y-axis limits
    plt.ylabel('Proportion')
    plt.title("Sentiment Distribution")
