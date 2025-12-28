const searchBtn = document.getElementById('searchBtn');
const resetBtn = document.getElementById('resetSearch');

function searchCondition() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        const searchValue = input.toLowerCase();

        if (searchValue.includes('beach')) {
            displayResults(data.beaches);
        }
        else if (searchValue.includes('temple')) {
            displayResults(data.temples);
        }
        else if (searchValue.includes('country')) {
            const countries = data.countries;
            const resultCities = [];
            
            countries.forEach(country => {
                country.cities.forEach(city => {
                    resultCities.push(city);
                });
            });

            displayResults(resultCities);
        }
        else {
            resultDiv.innerHTML = 'Sorry, we could not find that destination.';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
}

function displayResults(results) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    results.forEach(place => {
        const placeDiv = document.createElement('div');
        placeDiv.classList.add('recommendation-card');

        placeDiv.innerHTML = `
            <img src="./assets/images/${place.imageUrl}" alt="${place.name}">
            <h3>${place.name}</h3>
            <p>${place.description}</p>
            <button class="visit-btn">Visit</button>
        `;

        resultDiv.appendChild(placeDiv);
    });
}

function resetSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('result').innerHTML = '';
}

searchBtn.addEventListener('click', searchCondition);
resetBtn.addEventListener('click', resetSearch);