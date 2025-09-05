// Global variable to store latest results
let currentResults = null;

// Mobile menu toggle
const mobileToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('active');
        if (mobileToggle) mobileToggle.classList.remove('active');
    });
});

// Textarea auto-resize and character counter
const textInput = document.getElementById('textInput');
const charCount = document.getElementById('charCount');

if (textInput) {
    textInput.addEventListener('input', function() {
        // Auto-resize
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';

        // Character count
        if (charCount) charCount.textContent = this.value.length;
    });
}

// Clear text function
function clearText() {
    if (textInput) textInput.value = '';
    if (charCount) charCount.textContent = '0';
    if (textInput) textInput.style.height = 'auto';

    const resultsContainer = document.getElementById('resultsContainer');
    if (resultsContainer) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-chart-line"></i>
                <h3>No Analysis Yet</h3>
                <p>Enter some text and click "Analyze Sentiment" to see detailed results</p>
            </div>
        `;
    }

    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) exportBtn.disabled = true;

    currentResults = null;
}

// Load sample text
function loadSampleText() {
    const sampleTexts = [
        "I absolutely love this product! It's amazing and works perfectly.",
        "This is terrible. I hate it so much. The quality is awful.",
        "The weather is okay today. Nothing particularly exciting or disappointing.",
        "I'm really excited about this new project! It has so much potential.",
        "I'm feeling quite frustrated with this situation. The delays are unacceptable."
    ];

    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    if (textInput) textInput.value = randomText;
    if (charCount) charCount.textContent = randomText.length;

    // Trigger auto-resize
    if (textInput) {
        textInput.style.height = 'auto';
        textInput.style.height = textInput.scrollHeight + 'px';
    }
}

// Export results to JSON
function exportResults() {
    if (!currentResults) return;

    const exportData = {
        timestamp: new Date().toISOString(),
        text: currentResults.analyzedText,
        wordCount: currentResults.wordCount,
        overallSentiment: currentResults.overallSentiment,
        compoundScore: currentResults.compoundScore,
        subjectivity: currentResults.subjectivity,
        breakdown: {
            positive: currentResults.positivePercent,
            neutral: currentResults.neutralPercent,
            negative: currentResults.negativePercent
        }
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `sentiment-analysis-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Optional: Apply basic styles for sentiment breakdown dynamically
const style = document.createElement('style');
style.textContent = `
    .sentiment-breakdown {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
    }
    .breakdown-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing-sm);
        background: var(--bg-secondary);
        border-radius: var(--radius-md);
    }
    .breakdown-label {
        font-weight: 500;
        color: var(--text-secondary);
    }
    .breakdown-value {
        font-weight: 700;
        font-size: 1.125rem;
    }
`;
document.head.appendChild(style);
