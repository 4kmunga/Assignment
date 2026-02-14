// Load saved places 
document.addEventListener('DOMContentLoaded', displayPlaces);

function handleAddVisitedPlaces(event) {
    event.preventDefault(); // Prevent page refresh

    const newPlace = {
        id: Date.now(),
        location: document.getElementById('location').value,
        landmark: document.getElementById('landmark').value,
        time: document.getElementById('timeOfTheYear').value,
        notes: document.getElementById('notes').value,
        imageUrl: document.getElementById('imageUrl').value
    };

    savePlaceLocally(newPlace);
    addPlaceToDOM(newPlace);
    document.getElementById('form-group').reset();
}

function savePlaceLocally(place) {
    let places = localStorage.getItem('myPlaces') ? JSON.parse(localStorage.getItem('myPlaces')) : [];
    places.push(place);
    localStorage.setItem('myPlaces', JSON.stringify(places));
}

function addPlaceToDOM(place) {
    const list = document.getElementById('list-of-places');
    const li = document.createElement('li');
    li.className = "place-card";
    
    li.innerHTML = `
        <div class="place-info">
            <h3>${place.location} <small>@ ${place.landmark}</small></h3>
            <p><strong>Visited:</strong> ${place.time || 'N/A'}</p>
            <p>${place.notes}</p>
        </div>
        ${place.imageUrl ? `<img src="${place.imageUrl}" alt="${place.location}" class="place-img">` : ''}
        <button onclick="removePlace(${place.id}, this)" class="btn-delete">Delete</button>
    `;
    list.appendChild(li);
}

function displayPlaces() {
    const places = localStorage.getItem('myPlaces') ? JSON.parse(localStorage.getItem('myPlaces')) : [];
    places.forEach(place => addPlaceToDOM(place));
}

function removePlace(id, element) {
    let places = JSON.parse(localStorage.getItem('myPlaces'));
    places = places.filter(p => p.id !== id);
    localStorage.setItem('myPlaces', JSON.stringify(places));
    element.parentElement.remove();
}
