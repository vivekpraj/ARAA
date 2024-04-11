// Function to initialize Google Maps
function initializeMap() {
  const mapOptions = {
    center: { lat: 40.7128, lng: -74.006 }, // Default to New York
    zoom: 12
  };

  // Create a new map instance
  const map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // Enable traffic layer
  const trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);

  // Initialize DirectionsService and DirectionsRenderer
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  return { map, directionsService, directionsRenderer }; // Return map and directions objects
}

// Function to handle Google Maps API loading errors
function handleMapError() {
  // Display an error message or take appropriate action
  console.error('Error loading Google Maps API.');
  alert('Error loading Google Maps. Please try again later.');
}

// Function to open the map and initialize directions
function openMap() {
  const mapContainer = document.getElementById('mapContainer');
  mapContainer.style.display = 'block'; // Show map container

  // Initialize the map and directions if not already initialized
  if (!window.mapData) {
    window.mapData = initializeMap(); // Initialize the map and directions objects
  }
}

// Function to calculate and display directions based on user input
function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  const start = document.getElementById('startInput').value.trim();
  const end = document.getElementById('endInput').value.trim();
  
  if (!start || !end) {
    alert('Please enter both starting and ending addresses.');
    return;
  }

  const request = {
    origin: start,
    destination: end,
    travelMode: 'DRIVING' // Can be 'DRIVING', 'WALKING', 'BICYCLING', or 'TRANSIT'
  };

  // Call DirectionsService to get route
  directionsService.route(request, (result, status) => {
    if (status === 'OK') {
      directionsRenderer.setDirections(result); // Display the route on the map
    } else {
      console.error('Error fetching directions:', status);
      alert('Error fetching directions. Please try again.');
    }
  });
}

// Event listener for the button to open the map and calculate directions
document.getElementById('openMapBtn').addEventListener('click', () => {
  openMap(); // Open the map
  if (window.mapData) {
    const { directionsService, directionsRenderer } = window.mapData;
    calculateAndDisplayRoute(directionsService, directionsRenderer); // Calculate and display directions
  }
});

// Load Google Maps API asynchronously
function loadGoogleMapsAPI() {
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCg3cbRmixir5PXaxq77qGgYuIIWqXICE8&callback=initMap`;
  script.async = true;
  script.defer = true;
  script.onerror = handleMapError; // Handle script loading errors
  document.head.appendChild(script);
}

// Call loadGoogleMapsAPI to start loading the Maps API
loadGoogleMapsAPI();

//function for News Display

function fetchNews() {
  const apiKey = '5306016eec974e1bb87e4f599916240e';
  const apiUrl = `https://newsapi.org/v2/everything?q=road%20accident&sortBy=publishedAt&apiKey=${apiKey}`;

  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          console.log('API response:', data); // Log API response for debugging
          if (data.articles && data.articles.length > 0) {
              console.log('Articles:', data.articles); // Log articles for debugging
          } else {
              console.error('No articles found.');
          }
      })
      .catch(error => {
          console.error('Error fetching news:', error);
      });
}

// Call fetchNews when the page loads
window.addEventListener('load', fetchNews);

function displayNews(articles) {
  articles.forEach(article => {
      console.log(article.title); // Log each article's title
  });
}