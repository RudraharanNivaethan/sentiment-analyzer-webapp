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

## Key Features
- **Compound Sentiment Score (VADER-based)**  
- **Overall Sentiment Classification (Positive/Neutral/Negative)**  
- **Subjectivity Measurement (TextBlob, scale 0–1)**  
- **Subjectivity Categorization (Objective, Moderately Subjective, Highly Subjective)**  
- **Detailed Sentiment Breakdown (positive, negative, neutral percentages)**  
- **Interactive Visual Charts on Web Page (rendered with JavaScript)**  
- **PDF Export with Matplotlib Charts** (charts generated on server and embedded via WeasyPrint)  
- **Real-Time Analysis via Flask web interface**

---

## Pages

- **Home Page (`home.html`)**
  - Introduction to sentiment metrics:
    - Compound Score, Overall Sentiment, Subjectivity, Sentiment Breakdown
  - CTA button **Start Analyzing** → leads to App page (`app.html`)
  - “Learn More” button → leads to **About Page** (`about.html`)

- **App Page (`app.html`)**
  - Users can input text for sentiment analysis
  - Submit button triggers **dynamic analysis on the same page** (no separate result page)
  - Shows:
    - Overall Sentiment
    - Compound Score
    - Positive, Neutral, Negative percentages
    - Subjectivity score
    - Factual / Opinionated classification
  - Includes **dynamic bar chart** of sentiment distribution
  - Button **Clear** → clears input and resets results

- **About Page (`about.html`)**
  - Explains the app’s purpose, technologies used, and features
  - Provides background on NLP and sentiment analysis

- **Contact Page (`contact.html`)**
  - Shows team members, their contributions, and contact links
---

## Usage
1. Enter any sentence or paragraph into the input form.  
2. Click **Analyze**.  
3. The app displays:  
   - Overall sentiment (Positive/Negative/Neutral)  
   - Compound score  
   - Positive, Neutral, Negative percentages  
   - Subjectivity score and classification  
   - Sentiment distribution chart  
4. Optionally, export results as a styled PDF report.

---
## Tech Stack

The Sentiment Analysis Web App leverages a combination of backend, frontend, and AI/NLP tools to provide real-time sentiment insights and visual reports:

### Backend
- Python – Core programming language for logic and server-side functionality
- Flask – Lightweight web framework for handling routes, templates, and API requests

#### NLP / Sentiment Analysis
- NLTK (VADER) – Rule-based sentiment analysis tuned for social media and informal text
- TextBlob – Measures subjectivity and provides polarity scores

### Frontend
- HTML & CSS – Structuring and styling web pages
- JavaScript – Dynamic rendering of sentiment results and charts

#### Visualization & Reporting
- Matplotlib – Generates bar charts of sentiment distribution
- WeasyPrint – Converts HTML + CSS into styled PDF reports with embedded charts

#### Utilities
- Requests – Handles HTTP requests if needed for external APIs
- Virtualenv – Isolates project dependencies and prevents conflicts with global Python packages
---

## Scope and Considerations
The Sentiment Analysis Web App is designed as a lightweight and accessible tool for analyzing English text. It is most effective in:

- **Social Media Monitoring** – Tracking opinions and trends in posts and comments  
- **Customer Feedback Analysis** – Understanding reviews in e-commerce and services  
- **Educational Demonstrations** – Teaching NLP basics in classrooms or workshops  
- **Content Analysis** – Exploring blogs, surveys, or articles for sentiment

**Considerations:**
- Optimized for short, informal text (tweets, comments, reviews)  
- Based on lexicons, so may not always detect sarcasm, irony, or jargon  
- English-only support in current version  
- Thresholds for subjectivity are practical but may vary depending on application  

---

## Folder Structure
```
sentiment-analyzer-webapp/
│
├── app.py
├── requirements.txt
├── README.md
├── .gitignore
├── virtualenv/
│
├── templates/
│   ├── home.html             # Main landing page of the web app
│   ├── app.html              # Page where users input text and analyze sentiment
│   ├── about.html            # About page describing the app
│   ├── contact.html          # Contact page for user inquiries
│   ├── header.html           # Common header included in all pages
│   ├── footer.html           # Common footer included in all pages
│   └── report_template.html  # HTML template used for generating PDF reports
│
├── static/
│   ├── css/                  # Stylesheets
│   └── images/               # Images used in the app or reports
│
├── services/
│   ├── sentiment_service.py  # Handles NLP operations:
│   │                            - Determine sentiment (VADER)
│   │                            - Determine subjectivity and subjectivity class 
|   |                              (TextBlob)
│   │                            - Return detailed scores (pos, neu, neg, compound)
│   │
│   ├── chart_service.py      # Generates and embeds charts for PDF reports
│   │
│   └── report_service.py     # Generates PDF reports using WeasyPrint
```
---
## Developer Guide / How to Run

### 1️⃣ Create a Virtual Environment
Navigate to your project’s root folder:

```bash
cd sentiment-analyzer-webapp
python -m venv virtualenv
```
### 2️⃣ Activate the Virtual Environment

Windows:
```bash
virtualenv\Scripts\activate
```

Linux / WSL / macOS:
```bash
source virtualenv/bin/activate
```

After activation, your terminal prompt should show (virtualenv) at the beginning.

### 3️⃣ Install Dependencies

With the virtual environment active, install all required packages:
```bash
pip install -r requirements.txt
```

Packages used in this project:
- Flask
- nltk
- textblob
- matplotlib
- requests
- weasyprint

You can also install them individually if needed.

### 4️⃣ Run the Flask App

Make sure the virtual environment is still active. Then run:
```bash
python app.py
```

Open your browser at:
```bash
http://127.0.0.1:5000/
```
The app is now running locally, using the packages from your isolated environment.

### 5️⃣ Deactivate the Virtual Environment

When finished, deactivate with:
```bash
deactivate
```
Your terminal will return to the global Python environment.

### 6️⃣ Keep Dependencies Updated

Whenever you install new packages, update requirements.txt:
```bash
pip freeze > requirements.txt
```
---

## Best Practices and Reusable Components

The Sentiment Analysis Web App follows modern software engineering principles to ensure **modularity, maintainability, and scalability**. Key best practices implemented in the project include:

### 1. Modular and Maintainable Code
- Core functionality is separated into reusable Python services:
  - **`sentiment_service.py`** – Handles NLP logic for sentiment and subjectivity analysis.
  - **`chart_service.py`** – Generates Matplotlib charts for PDF embedding.
  - **`report_service.py`** – Creates styled PDF reports using HTML templates and WeasyPrint.
- Keeps code organized, scalable, and easy to maintain or extend.

### 2. Separation of Frontend and Backend
- **Frontend (HTML/CSS/JS)** is managed via Flask templates and `static/` resources.
- **Backend (Python/Flask)** handles all NLP computations, chart generation, and PDF creation.
- Ensures UI/UX changes do not affect core logic and vice versa.

### 3. Reusable Services
- Service functions are designed to be **reusable across pages or projects**.
- Example: `sentiment_service.get_sentiment()` can be used in:
  - Web pages
  - CLI tools
  - API endpoints

### 4. Virtual Environment for Dependency Isolation
- Project uses a **virtualenv** to isolate Python packages.
- Prevents conflicts with global packages and ensures portability.

### 5. Requirements Management
- Dependencies listed in `requirements.txt`.
- Allows other developers to quickly replicate the exact environment with:
  ```bash
  pip install -r requirements.txt
  ```

### 6. Version Control Hygiene
- `.gitignore` excludes unnecessary files:
  - Virtual environment folder
  - `__pycache__` and `.pyc` files
  - IDE/editor-specific files
- Keeps Git history clean and repository lightweight.

### 7. Template Reuse
- **Header (`header.html`)** and **Footer (`footer.html`)** are included on all pages using Jinja2.
- Reduces redundant code and ensures consistent layout across pages.

### 8. Clear Naming Conventions
- Files and functions have descriptive names (`sentiment_service`, `chart_service`, `report_service`).
- Makes code self-documenting and easier to understand.

### 9. Documentation and Instructions
- `README.md` provides clear **setup instructions, usage guide, and dependency details**.
- Makes the project accessible to new developers or users.

### 10. Use of Comments and Docstrings
- Services and functions include docstrings explaining **purpose, inputs, and outputs**.
- Enhances code readability and maintainability.

### 11. Clear Data Flow
- Logical sequence: **Input → NLP Analysis → Chart Generation → PDF Export**.
- Simplifies debugging, testing, and future enhancements.

### 12. Lightweight and Fast
- Lexicon-based models (VADER + TextBlob) enable **quick sentiment analysis**.
- Suitable for real-time analysis of short to medium text.
---

## Future Improvements
- Deep Learning Models (e.g., BERT, RoBERTa) for better context handling  
- Multilingual Support for analyzing text in multiple languages  
- Domain-Specific Lexicons (finance, healthcare, legal)  
- Interactive Dashboards for advanced visualization  
- Database Integration for storing past analyses and generating large-scale reports  
---