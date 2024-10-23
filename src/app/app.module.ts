// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GroupRepositoryFactory, PeopleRepositoryFactory } from './core/repositories/repository.factory';
import { PeopleService } from './core/services/impl/people.service';
import { GROUP_API_URL_TOKEN, GROUP_REPOSITORY_MAPPING_TOKEN, GROUP_RESOURCE_NAME_TOKEN, PEOPLE_API_URL_TOKEN, PEOPLE_REPOSITORY_MAPPING_TOKEN, PEOPLE_RESOURCE_NAME_TOKEN } from './core/repositories/repository.tokens';
import { provideHttpClient } from '@angular/common/http';
import { PeopleLocalStorageMapping } from './core/repositories/impl/people-mapping-local-storage.service';
import { PeopleMappingJsonServer } from './core/repositories/impl/people-mapping-json-server.service';
import { GroupMappingJsonServer } from './core/repositories/impl/group-mapping-json-server.service';
import { PersonModalComponent } from './person-modal/person-modal.component';

@NgModule({
  declarations: [AppComponent,PersonModalComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(),

    { provide: PEOPLE_RESOURCE_NAME_TOKEN, useValue: 'personas' },
    { provide: PEOPLE_API_URL_TOKEN, useValue: 'http://localhost:3000' },

    { provide: GROUP_RESOURCE_NAME_TOKEN, useValue: 'grupos' },
    { provide: GROUP_API_URL_TOKEN, useValue: 'http://localhost:3000' },
    // Registrar los repositorios
    {
      provide: PEOPLE_REPOSITORY_MAPPING_TOKEN,
      useClass: PeopleMappingJsonServer
    },
    PeopleRepositoryFactory,
    {
      provide: GROUP_REPOSITORY_MAPPING_TOKEN,
      useClass: GroupMappingJsonServer
    },
    GroupRepositoryFactory,
    // Registrar otros repositorios según sea necesario
    // Servicios de aplicación
    {
      provide: 'PeopleService',
      useClass: PeopleService
    }
  ],
  // ... otros proveedores],
  bootstrap: [AppComponent],
})
export class AppModule {}
