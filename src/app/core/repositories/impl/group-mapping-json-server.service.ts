import { Injectable } from "@angular/core";
import { IBaseMapping } from "../intefaces/base-mapping.interface";
import { Paginated } from "../../models/paginated.model";
import { Group } from "../../models/group.model";
import { Person } from "../../models/person.model";

export interface GroupRaw {
  id?: string
  nombre: string
}
@Injectable({
  providedIn: 'root'
})
export class GroupsMappingJsonServer implements IBaseMapping<Group> {
  setAdd(data: Group):GroupRaw {
      return {
          nombre:data.name
  };
}
  setUpdate(data: Group):GroupRaw {
      let toReturn:any = {};
      Object.keys(data).forEach(key=>{
          switch(key){
              case 'name': toReturn['nombre']=data[key];
              break;
          }
      });
      return toReturn;
  }
  getPaginated(page:number, pageSize: number, pages:number, data:GroupRaw[]): Paginated<Group> {
      return {page:page, pageSize:pageSize, pages:pages, data:data.map<Group>((d:GroupRaw)=>{
          return this.getOne(d);
      })};
  }
  getOne(data: GroupRaw):Group {
      return {
          id:data.id!, 
          name:data.nombre, 
      };
  }
  getAdded(data: any):Person {
      throw new Error("Method not implemented.");
  }
  getUpdated(data: any):Person {
      throw new Error("Method not implemented.");
  }
  getDeleted(data: any):Person {
      throw new Error("Method not implemented.");
  }
}
