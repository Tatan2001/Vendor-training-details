// Load JSON file
let trainingData;

fetch('vendor_training_data.json')
    .then(response => response.json())
    .then(data => {
        trainingData = data;
        console.log('JSON data loaded successfully.');
    })
    .catch(error => console.error('Error loading JSON:', error));

// Handle form submission
document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let candidateName = document.getElementById('candidateName').value.trim().replace(/\s+/g, ' ').toLowerCase();
    const companyName = document.getElementById('companyName').value.trim().toLowerCase();
    const sheetName = document.getElementById('sheetName').value;
    const resultDiv = document.getElementById('result');

    // Clear previous results
    resultDiv.innerHTML = '';

    // Validate inputs
    if (!sheetName || !trainingData[sheetName]) {
        resultDiv.innerHTML = `<p style="color: red;">Please select a valid sheet.</p>`;
        return;
    }

    // Filter data
    const filteredData = trainingData[sheetName].filter(entry =>
        (!candidateName || (entry["Candidate Name"] || "").toLowerCase().includes(candidateName)) &&
        (!companyName || (entry["Company Name"] || "").toLowerCase().includes(companyName))
    );

    // Display results
    if (filteredData.length > 0) {
        filteredData.forEach(entry => {
            const detailDiv = document.createElement('div');
            detailDiv.classList.add('details');
            detailDiv.innerHTML = `
                <p><strong>Enrollment Number:</strong> ${entry["Enrollment Number"]}</p>
                <p><strong>Candidate Name:</strong> ${entry["Candidate Name"]}</p>
                <p><strong>Company Name:</strong> ${entry["Company Name"]}</p>
                <p><strong>Result:</strong> ${entry["Result"]}</p>
                <p><strong>Training Dates:</strong> ${entry["Date of Training"]}</p>
                <p><strong>Validity:</strong> ${entry["Validity"]}</p>
            `;
            resultDiv.appendChild(detailDiv);
        });
    } else {
        resultDiv.innerHTML = `<p style="color: red;">No results found.</p>`;
    }
});
