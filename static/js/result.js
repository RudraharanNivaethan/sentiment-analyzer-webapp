document.addEventListener('DOMContentLoaded', function() {
    // Set report generation date
    const now = new Date();
    const dateString = now.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit'
    });
    const reportDateElement = document.getElementById('reportDate');
    if (reportDateElement) {
        reportDateElement.textContent = dateString;
    }
});

function exportReport() {
    try {
        // Collect data from the page
        const reportData = {
            timestamp: new Date().toISOString(),
            overallSentiment: document.getElementById('overallSentiment')?.textContent?.trim() || 'Unknown',
            compoundScore: parseFloat(document.getElementById('compoundScore')?.textContent) || 0,
            subjectivity: document.getElementById('subjectivity')?.textContent?.trim() || 'Unknown',
            wordCount: parseInt(document.getElementById('wordCount')?.textContent) || 0,
            breakdown: {
                positive: parseFloat(document.querySelector('.breakdown-item.positive .breakdown-value')?.textContent) || 0,
                neutral: parseFloat(document.querySelector('.breakdown-item.neutral .breakdown-value')?.textContent) || 0,
                negative: parseFloat(document.querySelector('.breakdown-item.negative .breakdown-value')?.textContent) || 0
            },
            originalText: document.getElementById('originalText')?.textContent?.trim() || ''
        };
        
        // Create and download the file
        const dataStr = JSON.stringify(reportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `sentiment-report-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error exporting report:', error);
        alert('An error occurred while exporting the report. Please try again.');
    }
}

function printReport() {
    try {
        window.print();
    } catch (error) {
        console.error('Error printing report:', error);
        alert('An error occurred while printing the report. Please try again.');
    }
}
