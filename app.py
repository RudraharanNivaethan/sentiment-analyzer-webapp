from flask import Flask, request, render_template
from services.sentiment_service import get_sentiment, get_subjectivity
from services.chart_service import generate_sentiment_chart

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
@app.route('/app_page')
def app_page():
    return render_template('app.html')

# Result Route
@app.route('/analyze_sentiment', methods=['POST'])
def analyze_sentiment():
    text = request.form.get('text', '').strip()

    # Handle empty input
    if not text:
        return render_template('app.html', error="Please enter some text.")

    try:
        # Get sentiment and VADER scores
        sentiment, scores = get_sentiment(text)
        polarity = float(scores['compound']) # Compound score for overall sentiment
        pos = float(scores['pos']) # Fraction of text that is positive (0 to 1)
        neu = float(scores['neu']) # Fraction of text that is neutral (0 to 1)
        neg = float(scores['neg']) # Fraction of text that is negative (0 to 1)

        # Get Subjectivity and classification
        subjectivity, subjectivity_class = get_subjectivity(text)

        # Generate Sentiment Chart
        chart_url = generate_sentiment_chart(pos,neu,neg)

        return render_template('result.html',
                               text=text,
                               sentiment=sentiment,
                               polarity=polarity,
                               pos=pos,
                               neu=neu,
                               neg=neg,
                               subjectivity=subjectivity,
                               subjectivity_class=subjectivity_class,
                               chart_url=chart_url)     
    except Exception as e:
        # Catch any unexpected error and display friendly message
        return render_template('app.html', error=f"An error occurred: {str(e)}")
# ----------- End of Routes ----------- 

# Run the app only if this file is executed directly
if __name__ == '__main__':
    app.run(debug=False) # Set debug to False for production