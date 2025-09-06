from weasyprint import HTML
from flask import render_template
from io import BytesIO

def generate_pdf(text, sentiment, subjectivity, scores, chart_base64):
    """
    Generates a PDF report in memory using HTML template.
    Returns BytesIO object ready to send via Flask.
    """
    html_content = render_template(
        "report_template.html",
        text=text,
        sentiment=sentiment,
        subjectivity=subjectivity,
        scores=scores,
        chart_base64=chart_base64
    )

    pdf_buffer = BytesIO()
    HTML(string=html_content).write_pdf(pdf_buffer)
    pdf_buffer.seek(0)
    return pdf_buffer
