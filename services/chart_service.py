import matplotlib
matplotlib.use('Agg') # Use this to avoid GUI issues in Flask
import matplotlib.pyplot as plt
from io import BytesIO
import base64

# ----------- Helper Function for Chart -----------
def generate_sentiment_chart(pos, neu, neg):
    # Create Matplotlib Chart
    labels = ["Positive", "Neutral", "Negative"]
    values = [pos, neu, neg]
    colors = ['green', 'blue', 'red']

    plt.figure(figsize=(5, 4)) # Width 5 inches, height 4 inches.
    plt.bar(labels, values, color=colors) # Draws vertical bars.
    plt.ylim(0, 1) # Set y-axis limits
    plt.ylabel('Proportion')
    plt.title("Sentiment Distribution")

     # Save plot to BytesIO object
    img = BytesIO()
    plt.savefig(img, format='png') 
    plt.close() # Close the plot to free memory
    img.seek(0) # Rewind to the beginning of the BytesIO Object

    # Encode image to base64 string for HTML
    chart_url = base64.b64encode(img.getvalue()).decode('utf8')
    return chart_url
