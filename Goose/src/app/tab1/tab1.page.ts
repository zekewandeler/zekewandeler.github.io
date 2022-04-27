import { Component, ElementRef, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';


declare var google: any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  map: any;
  latitude: any = 43.602875962462235; //latitude
  longitude: any = -116.2004880913129; //longitude

  infoWindows: any = [];
  markers: any = [
    {
    title: "Test 1",
    poops: "2",
    goose: '0',
    latitude: '43.60294095053635',
    longitude: "-116.20574953409313"
    },
    {
      title: "Test 2",
      poops: "0",
      goose: '1',
      latitude: '43.60447922083559',
      longitude: "-116.21051313717362"
    },
    {
      title: "Test 3",
      poops: "7",
      goose: '3',
      latitude: '43.602754490857585',
      longitude: "-116.19688751574967"
    },  
     
  ]
  constructor(private geolocation: Geolocation) { } 
  options = {
    timeout: 10000, 
    enableHighAccuracy: true, 
    maximumAge: 3600
  };

  // use geolocation to get user's device coordinates
  getCurrentCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      return {latitude: resp.coords.latitude, longitude: resp.coords.longitude};

     }).catch((error) => {
       console.log('Error getting location', error);
     });
     return {latitude: this.latitude, longitude: this.longitude};
  }


  ionViewDidEnter() {
    this.showMap();
  }


  addMarkersToMap(markers) {

    const gooseIcon = {
      url: "https://cdn-icons-png.flaticon.com/512/141/141723.png",
      scaledSize: new google.maps.Size(50, 50),
      origin: new google.maps.Point(0, 0), 
      anchor: new google.maps.Point(25,50)
    }

    const poopIcon = {
      url: "https://cdn-icons-png.flaticon.com/512/1391/1391045.png",
      scaledSize: new google.maps.Size(50, 50),
      origin: new google.maps.Point(0, 0), 
      anchor: new google.maps.Point(25,50)
    }



    for (let marker of markers) {
      console.log(marker.poops)
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);
      let mapMarker = new google.maps.Marker({
        position: position,
        title: marker.title,
        icon: marker.poops == 0 ? gooseIcon : poopIcon,
        latitude: marker.latitude,
        longitude: marker.longitude,
        poops: marker.poops,
        goose: marker.goose
      });
      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
    }
  }

  addInfoWindowToMarker(marker) {
    let infoWindowContent = '<div class="content" style="color: black">' + 
                            '<h2 id="firstHeading" class"firstHeading">'+ marker.title + '</h2>' +
                            '<img id="infoPic" style="max-height: 200px"src="http://wildlifecontroltraining.com/wp-content/uploads/2016/05/Fig-3-Fresh-droppings-of-canada-goose.jpg">' +
                            '<p>Latitude: ' + marker.latitude + '</p>' +
                            '<p>Longitude: ' + marker.longitude + '</p>' +
                            '<p>Poops: ' + marker.poops + '</p>' +
                            '<p>Goose: ' + marker.goose + '</p>' +
                            '</div>';

    let infoWindow = new google.maps.InfoWindow({content: infoWindowContent });

    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
    })
    this.infoWindows.push(infoWindow);
  }

  closeAllInfoWindows() {
    for(let window of this.infoWindows) {
      window.close();
    }
  }

  showMap() {
    let myStyles =[
      {
          featureType: "poi",
          elementType: "labels",
          stylers: [
                { visibility: "off" }
          ]
      }
  ];
  
  const location = new google.maps.LatLng(this.getCurrentCoordinates().latitude, this.getCurrentCoordinates().longitude);
  const options = {
    center: location,
    zoom: 15,
    disableDefaultUI: true,
    styles: myStyles
    
  }
  this.map = new google.maps.Map(this.mapRef.nativeElement, options);
  this.addMarkersToMap(this.markers);
  }

  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;
}
 