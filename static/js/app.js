let lastResult = {}; // store last analysis
let sentimentChart = null; // store Chart.js instance

document.getElementById("analyzeForm").addEventListener("submit", async function(e) {
    e.preventDefault(); // stop reload

    let text = document.getElementById("text").value;

    let response = await fetch("/analyze_sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text })
    });

    let data = await response.json();

    // Store result for export
    lastResult = {
        text: text,
        sentiment: data.sentiment,
        subjectivity: data.subjectivity,
        subjectivity_class: data.subjectivity_class,
        compound : data.compound,
        pos: data.pos,
        neg: data.neg,
        neu: data.neu
    };

    // Show results
    let resultDiv = document.getElementById("result");
    resultDiv.style.display = "block";
    resultDiv.innerHTML = `
        <h2>Result</h2>
        <p><strong>Overall Sentiment:</strong> ${data.sentiment}</p>
        <p><strong>Nature of Text:</strong> ${data.subjectivity_class}</p>
        <p><strong>Compound Score:</strong> ${data.compound}</p>
        <p><strong>Subjectivity:</strong> ${data.subjectivity}</p>
        <h3>Sentiiment Breakdown</h3>
        <p><strong>Positive:</strong> ${data.pos}</p>
        <p><strong>Neutral:</strong> ${data.neu}</p>
        <p><strong>Negative:</strong> ${data.neg}</p><br>
        <!-- Chart container -->
        <center><div id="chartContainer" style="width: 50%; height:400px; margin-top: 20px; display:none;text-align:center;">
          <canvas id="sentimentChart"></canvas>
        </div></center>
    `;

    // Draw Chart
    drawChart(data.pos, data.neu, data.neg);

    // Show export button
    document.getElementById("exportBtn").style.display = "inline-block";
});

// Function to draw a modern, well-sized Chart.js chart
function drawChart(pos, neu, neg) {
    // Show the chart container
    const container = document.getElementById("chartContainer");
    container.style.display = "block";

    // Get the canvas context
    const ctx = document.getElementById("sentimentChart").getContext("2d");

    // Destroy previous chart if exists
    if (sentimentChart) {
        sentimentChart.destroy();
    }

    // Create a modern chart
    sentimentChart = new Chart(ctx, {
        type: 'bar', // can change to 'doughnut', 'pie', etc.
        data: {
            labels: ['Positive', 'Neutral', 'Negative'],
            datasets: [{
                label: 'Sentiment Scores',
                data: [pos, neu, neg],
                backgroundColor: ['#4CAF50', '#2196F3', '#F44336'], // modern colors
                borderRadius: 8,  // rounded bars
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, 
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function(context) {
                            let value = context.raw;
                            return `${context.label}: ${(value * 100).toFixed(1)}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1,
                    ticks: {
                        stepSize: 0.1,
                        callback: function(value) {
                            return (value * 100).toFixed(0) + '%';
                        }
                    },
                    grid: {
                        drawBorder: false,
                        color: '#e0e0e0'
                    }
                },
                x: {
                    grid: {
                        display: false,
                    },
                    barPercentage: 0.5,      // width of the bar relative to category
                    categoryPercentage: 0.5  // width of the category relative to available space
                }
            }
        }
    });
}

// Handle Export PDF
document.getElementById("exportBtn").addEventListener("click", async function() {
    let response = await fetch("/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lastResult)
    });

    // Download the PDF
    let blob = await response.blob();
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "sentiment_report.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
});
