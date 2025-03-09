document.getElementById('searchBtn').addEventListener('click', search);
document.getElementById('clearBtn').addEventListener('click', clearResults);

function search() {
    const keyword = document.getElementById('searchInput').value.toLowerCase();
    fetch('./travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const results = [];
            
            // Check for matching keywords
            if (keyword === 'beach') {
                results.push(...data.beaches);
            } else if (keyword === 'temple') {
                results.push(...data.temples);
            } else if (keyword === 'country') {
                results.push(...data.countries);
            }
            
            displayResults(results);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayResults(results) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = ''; // Clear previous results
    
    if (results.length === 0) {
        resultsContainer.innerHTML = 'No results found.';
        return;
    }

    results.forEach(result => {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'result';
        resultDiv.innerHTML = `
            <h3>${result.name}</h3>
            <img src="${result.imageUrl}" alt="${result.name}">
            <p>${result.description}</p>
        `;
        resultsContainer.appendChild(resultDiv);
    });
}

function clearResults() {
    document.getElementById('searchInput').value = '';
    document.getElementById('searchResults').innerHTML = '';
}

