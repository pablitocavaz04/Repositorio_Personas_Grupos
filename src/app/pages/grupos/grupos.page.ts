import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Paginated } from '../../core/models/paginated.model';
import { AlertController, InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { Group } from '../../core/models/group.model';
import { GroupService } from '../../core/services/impl/group.service';
import { GroupModalComponent } from 'src/app/shared/components/group-modal/group-modal.component';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.page.html',
  styleUrls: ['./grupos.page.scss'],
})
export class GruposPage implements OnInit {

  _group:BehaviorSubject<Group[]> = new BehaviorSubject<Group[]>([])
  group$:Observable<Group[]> = this._group.asObservable();

  constructor(
    private groupSvc:GroupService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit():void {
    this.getMoreGroups();
  }

  selectedGroup: any = null;
  page:number = 1;
  pageSize:number = 25;

  refresh(){
    this.page=1;
    this.groupSvc.getAll(this.page, this.pageSize).subscribe({
      next:(response:Paginated<Group>)=>{
        this._group.next([...response.data]);
        this.page++;
      }
    });
  }

  getMoreGroups(notify:HTMLIonInfiniteScrollElement | null = null){
    this.groupSvc.getAll(this.page, this.pageSize).subscribe({
      next:(response:Paginated<Group>)=>{
        this._group.next([...this._group.value, ...response.data]);
        this.page++;
        notify?.complete();
      }
    })
  }

  async openGroupDetail(Group: any, index: number) {
    await this.presentModalGroups('edit', Group);
    this.selectedGroup = Group;
  }

  onIonInfinite(ev:InfiniteScrollCustomEvent) {
    this.getMoreGroups(ev.target); 
  }

  private async presentModalGroups(mode:'new'|'edit', group:Group|undefined=undefined){
    const modal = await this.modalCtrl.create({
      component:GroupModalComponent,
      componentProps:(mode=='edit'?{
        group: group
      }:{})
    });
    modal.onDidDismiss().then((response:any)=>{
      switch (response.role) {
        case 'new':
          this.groupSvc.add(response.data).subscribe({
            next:res=>{
              this.refresh();
            },
            error:err=>{}
          });
          break;
        case 'edit':
          this.groupSvc.update(group!.id, response.data).subscribe({
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

  async onAddGroups(){
    await this.presentModalGroups('new');
  }

  deleteGroups(id:string){
    this.groupSvc.delete(id).subscribe({
      next:res=>{
        this.refresh();
      },
      error:err=>{}
    });
    
  }

  async onDeleteGroupsConfirm(id:string){
    const alert = await this.alertCtrl.create({
      header: 'ATENCIÓN',
      message: '¿Desea borrar este grupo?',
      buttons: [
        {
          text: 'Yes',
          handler:() =>{
            this.deleteGroups(id)
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
