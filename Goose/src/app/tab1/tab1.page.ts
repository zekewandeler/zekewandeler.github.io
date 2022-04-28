import { Component, ElementRef, ViewChild } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

declare var google: any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  map: any;
  latitude: any = 43.602875962462235; //latitude
  longitude: any = -116.2004880913129;

  infoWindows: any = [];
  constructor() { } 
  options = {
    timeout: 10000, 
    enableHighAccuracy: true, 
    maximumAge: 3600
  };

  async locate() {
    this.latitude = (await Geolocation.getCurrentPosition()).coords.latitude;
    this.longitude = (await Geolocation.getCurrentPosition()).coords.longitude;
  
  console.log('Current position:', this.latitude, this.longitude);
}

  ionViewDidEnter() {
    this.locate();
    this.showMap();
  }


  addMarkersToMap(markers) {

    const gooseIcon = {
      url: "https://cdn-icons-png.flaticon.com/512/141/141723.png",
      scaledSize: new google.maps.Size(40, 40),
      origin: new google.maps.Point(0, 0), 
      anchor: new google.maps.Point(20,40)
    }

    const poopIcon = {
      url: "https://cdn-icons-png.flaticon.com/512/1391/1391045.png",
      scaledSize: new google.maps.Size(40, 40),
      origin: new google.maps.Point(0, 0), 
      anchor: new google.maps.Point(20,40)
    }

    for (let marker of markers) {
      console.log("marker", marker)
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);
      let mapMarker = new google.maps.Marker({
        position: position,
        title: marker.title,
        icon: marker.poops == 0 ? gooseIcon : poopIcon,
        latitude: marker.latitude,
        longitude: marker.longitude,
        poops: marker.poops,
        goose: marker.goose,
        description: marker.description
      });
      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
    }
  }

  addInfoWindowToMarker(marker) {
    console.log(marker)
    let infoWindowContent = '<div class="content" style="color: black">' + 
                            '<h1 id="firstHeading" class"firstHeading">'+ marker.title + '</h1>' +
                            '<p>'+ marker.description + '</p>' +
                            '<ion-row><ion-col size="6"><h4>Goose: ' + marker.goose +'</h4></ion-col>' +
                            '<ion-col size="6"><h4>Poops: ' + marker.poops + '</h4></ion-col></ion-row>' +
                            '<p>Latitude: ' + marker.latitude + '</p>' +
                            '<p>Longitude: ' + marker.longitude + '</p>' +
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

  async showMap() {
    await this.locate();
    let myStyles =[
      {
          featureType: "poi",
          elementType: "labels",
          stylers: [
                { visibility: "off" }
          ]
      }
  ];
  
  const location = new google.maps.LatLng(this.latitude, this.longitude);
  const options = {
    center: location,
    zoom: 15,
    disableDefaultUI: true,
    styles: myStyles
    
  }
  this.map = new google.maps.Map(this.mapRef.nativeElement, options);
  this.addMarkersToMap(markers);
  }

  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;
}

export let markers: any = [
  {
  title: "Test 1",
  poops: "2",
  goose: '0',
  latitude: '43.60294095053635',
  longitude: "-116.20574953409313",
  description: "I think this is cool!"
  },
  {
    title: "Test 2",
    poops: "0",
    goose: '1',
    description: "I think this is cool!",
    latitude: '43.60447922083559',
    longitude: "-116.21051313717362"
  },
  {
    title: "Test 3",
    poops: "7",
    goose: '3',
    description: "I think this is cool!",
    latitude: '43.602754490857585',
    longitude: "-116.19688751574967"
  } 
]