// Get app container
var app = document.querySelector('#app');

/**
 * Get the URL parameters
 * source: https://css-tricks.com/snippets/javascript/get-url-variables/
 */
var getParams = function (url) {
  var params = {};
  var parser = document.createElement('a');
  url = url || window.location.href;
  parser.href = url;
  var query = parser.search.substring(1);
  var vars = query.split('&');
  for (var i=0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      params[pair[0]] = decodeURIComponent(pair[1]);
  }
  return params;
};

// Cache URL parameters
var params = getParams();

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
          app.innerHTML = 'Sorry, we are having trouble getting data from the PokéAPI. Please try again later.';
          console.log(xhr);
      }
  };
  // Create and send a GET request
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/?limit=100');
  xhr.send();

  // Render markup with returned API data
  function renderAppMarkup(data) {

    // Set up HTML string
    var html = '';
    // Check for URL parameters
    if (params.name === undefined) {
      // Create 3 random numbers and store them in an array
      randomArray = [];
      for (var i = 0; i < 3; i++) {
        var randomIndex = Math.floor(Math.random() * 100);
        randomArray.push(randomIndex);
      }
      // Add markup for each of the 3 randomly selected Pokemon
      randomArray.forEach(function(index) {
        html +=
          '<div class="pokemon-cards">' +
            '<a href="?name=' + data.results[index].name + '&id=' + (index + 1) + '">' +
              '<h2>' + data.results[index].name.toUpperCase() + '</h2>' +
              '<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + (index + 1) + '.png">' +
            '</a>' +
          '</div>';
      });
    } else {
      // Render individual Pokemon card info based on URL param data (name, id)
    }

    // Inject HTML into the DOM
    app.innerHTML = html;

  } // End of renderAppMarkup function

} // End of loadApp function

// Run loadApp function on page load
loadApp();
