import { Component, NgZone } from '@angular/core';
import { Router} from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { PhotoService } from '../services/photo.service';
import { markers } from "../tab1/tab1.page";


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})



export class Tab2Page {
  object:any;
  encounterTitle:string;
  encounterDesc:string;
  encounterPoop:string;
  encounterGoose:string;
  encounterLat:string;
  encounterLong:string;
  latitude: any; //latitude
  longitude: any; //longitude
  
  constructor(private route: Router, public photoService: PhotoService) {}
  options = {
    timeout: 10000, 
    enableHighAccuracy: true, 
    maximumAge: 3600
  };

  async getCurrentLocation() {
      this.latitude = (await Geolocation.getCurrentPosition()).coords.latitude;
      this.longitude = (await Geolocation.getCurrentPosition()).coords.longitude;
    
    console.log('Current position:', this.latitude, this.longitude);
  };

  async locate() {
    this.latitude = (await Geolocation.getCurrentPosition()).coords.latitude;
    this.longitude = (await Geolocation.getCurrentPosition()).coords.longitude;
  
  console.log('Current position:', this.latitude, this.longitude);
};
  

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  async reportEncounter() {
    await markers.push({
      title: this.encounterTitle,
      description: this.encounterDesc,
      poops: this.encounterPoop,
      goose: this.encounterGoose,
      latitude: this.encounterLat,
      longitude: this.encounterLong
    })
      this.route.navigate(['/tabs/tab1']);
    
  }

 
}