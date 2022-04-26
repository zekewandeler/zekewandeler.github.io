import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImageModalPage } from '../image-modal/image-modal.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor (private modalController: ModalController){
  }
  openPreview(img){
   this.modalController.create({
    component: ImageModalPage,
     componentProps:{
       img:img
     }
   }).then(modal =>modal.present());
  }

}
