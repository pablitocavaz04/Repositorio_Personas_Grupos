import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { Person } from 'src/app/core/models/person.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Paginated } from 'src/app/core/models/paginated.model';
import { PeopleService } from 'src/app/core/services/impl/people.service';
import { PersonModalComponent } from 'src/app/shared/components/person-modal/person-modal.component';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.page.html',
  styleUrls: ['./personas.page.scss'],
})
export class PersonasPage implements OnInit {

  _people:BehaviorSubject<Person[]> = new BehaviorSubject<Person[]>([])
  people$:Observable<Person[]> = this._people.asObservable();

  constructor(
    private peopleSv:PeopleService,
    private modalCtrl:ModalController
  ) { }

  ngOnInit():void {
    this.getMorePeople();
  }

  page:number = 1;
  pageSize:number = 25;

  getMorePeople(notify:HTMLIonInfiniteScrollElement | null = null){
    this.peopleSv.getAll(this.page, this.pageSize).subscribe({
      next:(response:Paginated<Person>)=>{
        this._people.next([...this._people.value, ...response.data]);
        this.page++;
        notify?.complete();
      }
    })
  }

  onIonInfinite(ev:InfiniteScrollCustomEvent) {
    this.getMorePeople(ev.target);
  }

  async onAddPerson(){
    const modal = await this.modalCtrl.create({
      component:PersonModalComponent,
      componentProps:{
      }
    });
    modal.onDidDismiss().then((res:any)=>{
      console.log(res);
    });
    await modal.present();
  }
  
}
