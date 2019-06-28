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
  // Create and send a GET request based on URL params
  if (params.name === undefined) {
    xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/?limit=100');
    xhr.send();
  } else {
    xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + params.id);
    xhr.send();
  }

  // Render markup with returned API data
  function renderAppMarkup(data) {

    // Set up HTML string
    var html = '';

    // Create 3 random numbers and store them in an array
    var randomArray = [];
    for (var i = 0; i < 3; i++) {
      var randomIndex = Math.floor(Math.random() * 100);
      randomArray.push(randomIndex);
    }

    // Check for URL parameters
    if (params.name === undefined) {
      // Add markup for each of the 3 randomly selected Pokemon
      app.innerHTML = randomArray.map(function(index) {
        html =
          '<div class="pokemon-cards">' +
            '<a href="?name=' + data.results[index].name + '&id=' + (index + 1) + '">' +
              '<h2>' + data.results[index].name.toUpperCase() + '</h2>' +
              '<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + (index + 1) + '.png">' +
            '</a>' +
          '</div>';
        return html;
      }).join('');
    } else {
      // Add markup for individual Pokemon card info based on URL params
      app.innerHTML =
        '<div id="pokemon-card">' +
          '<h2>' + params.name.toUpperCase() + '</h2>' +
          '<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + params.id + '.png">' +
          '<h3>Base Experience: ' + data.base_experience + '</h3>' +
          '<h3>Skills:</h3>' +
          '<ul>' +
            data.abilities.map(function(index) {
              html = '<li>' + index.ability.name + '</li>';
              return html;
            }).join('');
          '</ul>' +
        '</div>';
    }

  } // End of renderAppMarkup function

} // End of loadApp function

// Run loadApp function on page load
loadApp();
