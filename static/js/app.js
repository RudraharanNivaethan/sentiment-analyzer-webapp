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
        <div id="chartContainer" style="width: 50%; margin-top: 20px; display:none;text-align:center;">
          <canvas id="sentimentChart"></canvas>
        </div>
    `;

    // Draw Chart
    drawChart(data.pos, data.neu, data.neg);

    // Show export button
    document.getElementById("exportBtn").style.display = "inline-block";
});

// Function to draw Chart.js bar chart
function drawChart(pos, neu, neg) {
    let ctx = document.getElementById("sentimentChart").getContext("2d");
    document.getElementById("chartContainer").style.display = "block";

    if (sentimentChart) {
        sentimentChart.destroy(); // remove old chart
    }

    sentimentChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Positive', 'Neutral', 'Negative'],
            datasets: [{
                label: 'Sentiment Scores',
                data: [pos, neu, neg],
                backgroundColor: ['green', 'blue', 'red']
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1
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
