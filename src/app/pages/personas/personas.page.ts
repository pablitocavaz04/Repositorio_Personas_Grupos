import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
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
    private alertCtrl: AlertController,
    private peopleSvc:PeopleService,
    private modalCtrl:ModalController
  ) { }

  ngOnInit():void {
    this.getMorePeople();
  }

  selectedPerson: any = null;
  page:number = 1;
  pageSize:number = 25;

  refresh(){
    this.page=1;
    this.peopleSvc.getAll(this.page, this.pageSize).subscribe({
      next:(response:Paginated<Person>)=>{
        this._people.next([...response.data]);
        this.page++;
      }
    });
  }

  getMorePeople(notify:HTMLIonInfiniteScrollElement | null = null){
    this.peopleSvc.getAll(this.page, this.pageSize).subscribe({
      next:(response:Paginated<Person>)=>{
        this._people.next([...this._people.value, ...response.data]);
        this.page++;
        notify?.complete();
      }
    })
  }

  async openPersonDetail(person: any, index: number) {
    await this.presentModalPerson('edit', person);
    this.selectedPerson = person;
  }

  onIonInfinite(ev:InfiniteScrollCustomEvent) {
    this.getMorePeople(ev.target);
  }

  private async presentModalPerson(mode:'new'|'edit', person:Person|undefined=undefined){
    const modal = await this.modalCtrl.create({
      component:PersonModalComponent,
      componentProps:(mode=='edit'?{
        person: person
      }:{})
    });
    modal.onDidDismiss().then((response:any)=>{
      switch (response.role) {
        case 'new':
          this.peopleSvc.add(response.data).subscribe({
            next:res=>{
              this.refresh();
            },
            error:err=>{}
          });
          break;
        case 'edit':
          this.peopleSvc.update(person!.id, response.data).subscribe({
            next:res=>{
              this.refresh();
            },
            error:err=>{}
          });
          break;
        default:
          break;
      }
    });
    await modal.present();
  }

  async onAddPerson(){
    await this.presentModalPerson('new');
  }
  
  deletePerson(id:string){
    this.peopleSvc.delete(id).subscribe({
      next:res=>{
        this.refresh();
      },
      error:err=>{}
    });
    
  }

  async onDeletePersonConfirm(id:string){
    const alert = await this.alertCtrl.create({
      header: 'ATENCIÓN',
      message: '¿Desea borrar este usuario?',
      buttons: [
        {
          text: 'Yes',
          handler:() =>{
            this.deletePerson(id)
          }
        },
        {
          text: 'No',
          htmlAttributes: {
            'aria-label': 'close',
          },
        },
      ],
    });

    await alert.present();
  }

}
