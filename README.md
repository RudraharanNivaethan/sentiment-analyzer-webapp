# Sentiment Analysis Web App

## Overview
This is a **web application** that analyzes the sentiment of user-provided text.
It uses **Natural Language Processing (NLP)** techniques to calculate:
- **Compound Score** (overall sentiment, from -1 to +1)
- **Overall Sentiment** (Positive 😊 / Neutral 😐 / Negative 😢)
- **Subjectivity** (0 = objective, 1 = subjective)
- **Sentiment Breakdown** (percentage of positive, neutral, negative words)

The app also provides a **visual bar chart** of sentiment distribution.

Frontend is built with **HTML and CSS**, while backend uses **Flask, NLTK (VADER), TextBlob, and Matplotlib**.

---

## Features

- **Home Page (`home.html`)**
  - Introduction to sentiment metrics:
    - Compound Score, Overall Sentiment, Subjectivity, Sentiment Breakdown
  - CTA button **Start Sentiment Analysis** → leads to App page (`app.html`)
  - “Learn More About This App” button → leads to **About Page** (`about.html`)

- **App Page / Text Input Form (`app.html`)**
  - Users can input text for sentiment analysis
  - Submit button triggers analysis and redirects to **Result Page**

- **Sentiment Result Page (`result.html`)**
  - Displays:
    - Input text
    - Overall Sentiment
    - Compound Score
    - Positive, Neutral, Negative percentages
    - Subjectivity score
    - Factual / Opinionated classification
  - Shows **dynamic bar chart** of sentiment distribution
  - Button **Analyze Another Text** → returns to App page

- **About Page (`about.html`)**
  - Explains the app’s purpose, technologies used, and features
  - Provides background on NLP and sentiment analysis

- **Contact Page (`contact.html`)**
  - Shows team members, their contributions, and GitHub links

- **Reusable Components**
  - **Header (`header.html`)** and **Footer (`footer.html`)** included on all pages
  - Header contains navigation and optional logo
  - Footer contains GitHub links and contact/social info

- **Backend / AI Features**
  - Flask routes handle form submission and template rendering
  - **VADER (NLTK)** computes sentiment scores
  - **TextBlob** calculates subjectivity
  - **Matplotlib** generates visual charts dynamically

---

## Technologies Used
- **Python 3.x**
- **Flask** – Web framework
- **NLTK (VADER)** – Sentiment analysis
- **TextBlob** – Subjectivity analysis
- **Matplotlib** – Data visualization
- **HTML & CSS** – Frontend pages 

---

## Folder Structure
```
sentiment-analyzer-webapp/
│
├── templates/                   ← All HTML pages
│   ├── home.html
│   ├── app.html
│   ├── result.html
│   ├── about.html
│   └── contact.html
│
├── static/                      ← Static files (CSS, JS, images)
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── images/
│       └── logo.png
│
├── services/                    ← Modular Python helper functions
│   ├── sentiment_service.py     ← get_sentiment, get_subjectivity
│   └── chart_service.py         ← generate_sentiment_chart
│
├── header.html                  ← Reusable header
├── footer.html                  ← Reusable footer
├── app.py                       ← Flask backend logic and App 
├── README.md                    ← Project overview & instructions
├── requirements.txt             ← Python dependencies
└── .gitignore                   ← Ignore virtual env, __pycache__, etc.
```
