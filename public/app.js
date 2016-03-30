// when the windows has loaded call function
window.onload = function(){

console.log('App started');
// variables   
var countries;
var foundCountry;
var findCountryFromName;
var dropDown = document.getElementById('dropdown');
var last = localStorage.getItem('last');
var tableRow = document.getElementById('table-row-info');

// perform AJAX request and AJAX request location
var url = "https://www.restcountries.eu/rest/v1";
var request = new XMLHttpRequest();
request.open("GET", url);
request.send();

// when request has loaded and is sucessful (200) take the response and create a JSON object
  request.onload = function() {
    if(request.status === 200) {
      jsonString = request.responseText;
      countries = JSON.parse(jsonString);
    }
  // run function to create dropdown menu
  createDropDown( countries );
  // run .onchange to load information when the page is loaded
  dropDown.onchange();
  }; 

// Functions
// finds a country from a string and sets it to the var foundCountry
// WHY DOESNT RETURN WORK?? BAAA -Its Asyncronous or something?
  var findCountryFromName = function( name ) {
    countries.forEach( function(each) {
      if(each.name === name) {
        foundCountry = each;
      }
    })
  }

  // when dropdown is changed gets information for that country and adds it to the table
  dropDown.onchange = function() {
    // removes old table data
    while (tableRow.hasChildNodes()) {   
      tableRow.removeChild(tableRow.firstChild);
    }
    // gets currently selected from dropdown
    var selCountry = dropDown.options[dropDown.selectedIndex].value;
    // gets the object of that country
    findCountryFromName(selCountry);
    // inserts info into the table
    insertInfo(foundCountry);
    // stores the last selected country into localstorage as a string 
    localStorage.setItem('last', foundCountry.name);
  }

  var createDropDown = function(countries) {      
    countries.forEach( function(each) {
      var option = document.createElement('option')
      option.innerHTML = each.name;
      dropDown.appendChild(option);
      option.value = each.name;
      if(option.value === last) {
        option.selected = 'selected';
      }      
    }); 
  }

  insertInfo = function(country) {
    var tableRow = document.getElementById('table-row-info');
    info1 = document.createElement('td');
    info1.innerHTML = country.population;
    tableRow.appendChild(info1);

    info2 = document.createElement('td');
    info2.innerHTML = country.capital;
    tableRow.appendChild(info2);
    getSpotifyMusic(country.name);
  }

  getSpotifyMusic = function(country) {
    var urlSpot = 'https://api.spotify.com/v1/search?q='+'"national anthem of '+country+'&type=track';
    var requestSpot = new XMLHttpRequest();
    requestSpot.open("GET", urlSpot);
    requestSpot.send();

    requestSpot.onload = function() {
      if(requestSpot.status === 200) {
        jsonSpotString = requestSpot.responseText;
        jsonSpotString = JSON.parse(jsonSpotString);
        previewUrl = jsonSpotString.tracks.items[0].preview_url;
        musicPlayer = document.getElementById('music-player');
        musicPlayer.src = previewUrl;
      }
    }
  }; 

}
