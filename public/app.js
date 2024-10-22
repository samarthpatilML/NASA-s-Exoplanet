document.getElementById('searchButton').addEventListener('click', async () => {
    const starName = document.getElementById('starInput').value;
    if (!starName) {
        alert('Please enter a star name.');
        return;
    }

    try {
        const response = await fetch(`/api/stars?star=${starName}`);
        const star = await response.json();

        if (star.error) {
            document.getElementById('result').innerHTML = `<p>${star.error}</p>`;
        } else {
            document.getElementById('result').innerHTML = `
                <h2>${star.st_name}</h2>
                <p><strong>Temperature:</strong> ${star.st_teff} K</p>
                <p><strong>Distance:</strong> ${star.st_dist} light-years</p>
            `;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').innerHTML = `<p>Error fetching star data.</p>`;
    }
});
