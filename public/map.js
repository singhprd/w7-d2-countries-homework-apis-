var Map = function(latLng, zoomVar, map) {
  this.googleMap = new google.maps.Map( document.getElementById(map), {
    center: latLng,
    zoom: zoomVar,
  } );

  this.addMarker = function( latLng, label, title ) {
    var marker = new google.maps.Marker({
      position: latLng,
      map: this.googleMap,
      label: label,
      title: title
    })
    return marker;
  }

  this.bindClick = function() {
    var counter = 1;
    google.maps.event.addListener(
      this.googleMap, 
      'click', 
        function(event){
    console.log("batman")
        latLngNew = {lat: event.latLng.lat(), lng: event.latLng.lng()}
        this.addMarker(latLngNew, counter.toString());
        counter ++; 
        }.bind(this)
    )
  }

  this.addInfoWindow = function( latLng, title ) {
    var marker = this.addMarker(latLng, "1", title);
    marker.addListener( 'click', function(){
      var infoWindow = new google.maps.InfoWindow({content: title});
      infoWindow.open( this.map, marker )
    })
  }

};
