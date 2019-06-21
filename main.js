// Get app container
var app = document.querySelector('#app');

// Create function to load app
var loadApp = function() {

  // Set up XHR request
  var xhr = new XMLHttpRequest();
  // Setup our listener to process request state changes
  xhr.onreadystatechange = function() {
      // Only run if the request is complete
      if (xhr.readyState !== 4) return;
      // Process our return data
      if (xhr.status >= 200 && xhr.status < 300) {
          // This will run when the request is successful
          renderAppMarkup(JSON.parse(xhr.responseText));
      } else {
          // This will run when it's not
          app.innerHTML = 'The request failed! Please try again later';
          console.log(xhr);
      }
  };
  // Create and send a GET request
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/?limit=100');
  xhr.send();

  // Render markup with returned API data
  function renderAppMarkup(data) {

    // Create 3 random numbers and store them in an array
    randomArray = [];
    for (var i = 0; i < 3; i++) {
      var randomIndex = Math.floor(Math.random() * 100);
      randomArray.push(randomIndex);
    }
    // Set up HTML string
    var html = '';
    // Add markup for each of the 3 randomly selected Pokemon
    randomArray.forEach(function(index) {
      html +=
        '<div class="rendered-pokemon">' +
          '<h1>' + data.results[index].name.toUpperCase() + '</h1>' +
          '<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + (index + 1) + '.png">' +
        '</div>';
    });
    // Inject HTML into the DOM
    app.innerHTML = html;

  }

} // end of loadApp function

// Run loadApp function on page load
loadApp();
