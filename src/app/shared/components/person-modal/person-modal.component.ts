import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Person } from 'src/app/core/models/person.model';
import { MyPeopleService } from 'src/app/core/services/my-people.service';



@Component({
  selector: 'app-person-modal',
  templateUrl: './person-modal.component.html',
  styleUrls: ['./person-modal.component.scss'],
})
export class PersonModalComponent  implements OnInit {
  private _genders: string[] = ['Masculino', 'Femenino', 'Otros'];
  public get genders(): string[] {
    return this._genders;
  }
  public set genders(value: string[]) {
    this._genders = value;
  }
  formGroup:FormGroup;
  @Input() person:Person|undefined;

  constructor(
    private fb:FormBuilder,
    private modalCtrl:ModalController,
    private peopleService: MyPeopleService
  ) { 
    this.formGroup = this.fb.group({
      name:['', [Validators.required, Validators.minLength(2)]],
      surname:['', [Validators.required, Validators.minLength(2)]],
      email:['', [Validators.required, Validators.email]],
      gender:['', [Validators.required]],
      age:[0, [Validators.required]]
    });
  }

  ngOnInit() {}

  get name(){
    return this.formGroup.controls['name'];
  }

  get surname(){
    return this.formGroup.controls['surname'];
  }

  get age(){
    return this.formGroup.controls['age'];
  }

  get email(){
    return this.formGroup.controls['email'];
  }

  get gender(){
    return this.formGroup.controls['gender'];
  }
  
  /*onSubmit(){
    if (this.formGroup.valid) {
      console.log('Formulario enviado:', this.formGroup.value);
      // Pasar los datos al cerrar el modal
      this.modalCtrl.dismiss(this.formGroup.value);
    } else {
      console.log('Formulario inválido');
    }

  }
  */

  onSubmit() {
    if (this.formGroup.valid) {
      const personData: Person = this.formGroup.value;
      console.log('Formulario enviado:', personData);

      // Llamar al servicio para agregar la persona al servidor JSON
      this.peopleService.addPerson(personData).subscribe(
        (response) => {
          console.log('Persona agregada:', response);
          // Cerrar el modal y pasar los datos
          this.modalCtrl.dismiss(response);
        },
        (error) => {
          console.error('Error al agregar persona:', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }

}
