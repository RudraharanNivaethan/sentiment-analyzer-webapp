from flask import Flask, render_template, request, jsonify, send_file
from services.sentiment_service import get_sentiment, get_subjectivity, get_detailed_scores
from services.chart_service import generate_sentiment_chart
from services.report_service import generate_pdf

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
    data = request.get_json()
    text = data.get("text", "")

    sentiment = get_sentiment(text)
    subjectivity, subjectivity_class = get_subjectivity(text)
    scores = get_detailed_scores(text)
    compound = scores["compound"]
    pos = scores["pos"]
    neg = scores["neg"]
    neu = scores["neu"]

    return jsonify({
        "sentiment": sentiment,
        "subjectivity": subjectivity,
        "subjectivity_class": subjectivity_class,
        "compound": compound,
        "pos": pos,
        "neg": neg,
        "neu": neu
    })

@app.route("/export", methods=["POST"])
def export():
    data = request.get_json()
    text = data.get("text", "")
    sentiment = data.get("sentiment", "")
    subjectivity = data.get("subjectivity", "")

    # Get detailed scores & chart
    scores = get_detailed_scores(text)
    chart_base64 = generate_sentiment_chart(scores["pos"], scores["neu"], scores["neg"])

    # Generate PDF using modular service
    pdf_buffer = generate_pdf(text, sentiment, subjectivity, scores, chart_base64)

    return send_file(
        pdf_buffer,
        as_attachment=True,
        download_name="sentiment_report.pdf",
        mimetype="application/pdf"
    )

# Run the app only if this file is executed directly
if __name__ == '__main__':
    app.run(debug=False) # Set debug to False for production