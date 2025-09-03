# Sentiment Analysis Web App

## Overview
This is a **web application** that analyzes the sentiment of user-provided text.
It uses **Natural Language Processing (NLP)** techniques to calculate:
- **Compound Score** (overall sentiment, from -1 to +1)
- **Overall Sentiment** (Positive 😊 / Neutral 😐 / Negative 😢)
- **Subjectivity** (0 = objective, 1 = subjective)
- **Sentiment Breakdown** (percentage of positive, neutral, negative words)

The app also provides a **visual bar chart** of sentiment distribution.

Frontend is built with **PHP and CSS**, while backend uses **Flask, NLTK (VADER), TextBlob, and Matplotlib**.

---

## Features

- **Home Page (`home.php`)**
  - Introduction to sentiment metrics:
    - Compound Score, Overall Sentiment, Subjectivity, Sentiment Breakdown
  - CTA button **Start Sentiment Analysis** → leads to App page (`app.php`)
  - “Learn More About This App” button → leads to **About Page** (`about.php`)

- **App Page / Text Input Form (`app.php`)**
  - Users can input text for sentiment analysis
  - Submit button triggers analysis and redirects to **Result Page**

- **Sentiment Result Page (`result.php`)**
  - Displays:
    - Input text
    - Overall Sentiment
    - Compound Score
    - Positive, Neutral, Negative percentages
    - Subjectivity score
    - Factual / Opinionated classification
  - Shows **dynamic bar chart** of sentiment distribution
  - Button **Analyze Another Text** → returns to App page

- **About Page (`about.php`)**
  - Explains the app’s purpose, technologies used, and features
  - Provides background on NLP and sentiment analysis

- **Contact Page (`contact.php`)**
  - Shows team members, their contributions, and GitHub links

- **Reusable Components**
  - **Header (`header.php`)** and **Footer (`footer.php`)** included on all pages
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
- **PHP & CSS** – Frontend pages 

---

## Folder Structure
```
sentiment-analyzer-webapp/
│
├── templates/           ← All PHP pages
│   ├── home.php
│   ├── app.php
│   ├── result.php
│   ├── about.php
│   └── contact.php
│
├── static/              ← Static files (CSS, JS, images, charts)
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── images/
│       └── logo.png
│
├── header.php           ← Reusable header
├── footer.php           ← Reusable footer
├── app.py (or backend PHP scripts)  ← Flask/PHP backend logic
├── README.md            ← Project overview & instructions
├── requirements.txt     ← Python dependencies
```
