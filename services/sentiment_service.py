import nltk
nltk.download('vader_lexicon')  # Needed only first time to download VADER lexicon
from nltk.sentiment import SentimentIntensityAnalyzer
from textblob import TextBlob

# Load the model once instead of reloading it on every request
sa = SentimentIntensityAnalyzer() # Implement VADER for Sentiment Analysis

# ----------- Helper Function: Determine Sentiment ----------- 
def get_sentiment(text):
    scores = sa.polarity_scores(text) # Get polarity scores
    compound = scores['compound'] # Compound score for overall sentiment
    if compound >= 0.05:
        sentiment = "Positive 😊"
    elif compound <= -0.05:
        sentiment = "Negative 😢"
    else:
        sentiment = "Neutral 😐"
    return sentiment

# ----------- Helper Function: Determine Subjectivity----------- 
def get_subjectivity(text):
    # Subjectivity using TextBlob
    blob = TextBlob(text)
    subjectivity = blob.sentiment.subjectivity  # 0 (objective) to 1 (subjective)

    # Subjectivity Classification
    if subjectivity < 0.4:
        subjectivity_class = "Objective"
    elif subjectivity < 0.7:
        subjectivity_class = "Moderately Subjective"
    else:
        subjectivity_class = "Highly Subjective"
    return subjectivity, subjectivity_class

def get_detailed_scores(text: str) -> dict:
    """Returns pos/neu/neg scores for chart and table."""
    return sa.polarity_scores(text)

def analyze_text(text):
    sentiment = get_sentiment(text)
    subjectivity, subjectivity_class = get_subjectivity(text)
    scores = get_detailed_scores(text)

    return {
        "text": text,
        "sentiment": sentiment,
        "subjectivity": subjectivity,
        "subjectivity_class": subjectivity_class,
        "compound": scores["compound"],
        "pos": scores["pos"],
        "neg": scores["neg"],
        "neu": scores["neu"],
        "scores": scores
    }