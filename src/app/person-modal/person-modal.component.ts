import { Component, Input, OnInit } from '@angular/core';
import { Person } from '../core/models/person.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-person-modal',
  templateUrl: './person-modal.component.html',
  styleUrls: ['./person-modal.component.scss'],
})
export class PersonModalComponent  implements OnInit {

  @Input() person:Person|undefined
  constructor(
    private modalCtrl:ModalController
  ) { }

  ngOnInit() {}

}
