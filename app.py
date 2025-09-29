from flask import Flask, render_template, request, jsonify, send_file
from services.sentiment_service import get_sentiment, get_subjectivity, get_detailed_scores, analyze_text
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
    result = analyze_text(data.get("text", ""))
    return jsonify(result)

@app.route("/export", methods=["POST"])
def export():
    data = request.get_json()
    text = data.get("text", "")
    result = analyze_text(text)  # reuse same function

    chart_base64 = generate_sentiment_chart(
        result["pos"], result["neu"], result["neg"]
    )

    pdf_buffer = generate_pdf(
        result["text"], result["sentiment"], result["subjectivity"],
        result["scores"], chart_base64
    )

    return send_file(
        pdf_buffer,
        as_attachment=True,
        download_name="sentiment_report.pdf",
        mimetype="application/pdf"
    )

# Run the app only if this file is executed directly
if __name__ == '__main__':
    app.run(debug=False) # Set debug to False for production