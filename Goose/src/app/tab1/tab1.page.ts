
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  constructor() { } 
  @ViewChild('map') mapView: ElementRef;
 
  ionViewDidEnter() {
    this.createMap();
  }

    createMap() {
      const boundingRect = this.mapView.nativeElement.getBoundingClientRect() as DOMRect;
   
      CapacitorGoogleMaps.create({
        width: Math.round(boundingRect.width),
        height: Math.round(boundingRect.height),
        x: Math.round(boundingRect.x),
        y: Math.round(boundingRect.y),
        zoom: 5
      });
   
      CapacitorGoogleMaps.addListener('onMapReady', async () => {
        CapacitorGoogleMaps.setMapType({
          type: "normal" // hybrid, satellite, terrain
        });
        
        this.showCurrentPosition();
      });
    }
   
    async showCurrentPosition() {
      // todo
    }
   
    ionViewDidLeave() {
      CapacitorGoogleMaps.close();
    }
   
  }


let map: google.maps.Map;
const center: google.maps.LatLngLiteral = {lat: 30, lng: -110};

// Initialize and add the map
function initMap(): void {
  // The location of Uluru
  const uluru = { lat: -25.344, lng: 131.031 };
  // The map, centered at Uluru
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 4,
      center: uluru,
    }
  );

  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;