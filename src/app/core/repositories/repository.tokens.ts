// src/app/repositories/repository.tokens.ts
import { InjectionToken } from '@angular/core';
import { IBaseRepository } from './intefaces/base-repository.interface';
import { ITasksRepository } from './intefaces/tasks-repository.interface';
import { IPeopleRepository } from './intefaces/people-repository.interface';
import { IBaseMapping } from './intefaces/base-mapping.interface';
import { Person } from '../models/person.model';
import { IGroupRepository } from './intefaces/group-repository.interface';
import { Group } from '../models/group.model';

export const RESOURCE_NAME_TOKEN = new InjectionToken<string>('ResourceName');
export const PEOPLE_RESOURCE_NAME_TOKEN = new InjectionToken<string>('PeopleResourceName');
export const GROUP_RESOURCE_NAME_TOKEN = new InjectionToken<string>('GroupResourceName');


// Inyectan los repositorios
export const REPOSITORY_TOKEN = new InjectionToken<IBaseRepository<any>>('REPOSITORY_TOKEN');
export const PEOPLE_REPOSITORY_TOKEN = new InjectionToken<IPeopleRepository>('IPeopleRepository');
export const GROUP_REPOSITORY_TOKEN = new InjectionToken<IGroupRepository>('IGroupRepository')
export const TASKS_REPOSITORY_TOKEN = new InjectionToken<ITasksRepository>('ITasksRepository');

// Proporcionan la URL de la API con la que trabajará la app
export const API_URL_TOKEN = new InjectionToken<string>('ApiUrl');
export const PEOPLE_API_URL_TOKEN = new InjectionToken<string>('PeopleApiUrl');
export const GROUP_API_URL_TOKEN = new InjectionToken<string>('GroupApiUrl');
export const TASKS_API_URL_TOKEN = new InjectionToken<string>('TasksApiUrl');

// Permiten inyectar el mapeo entre los datos de la API y los modelos de la aplicación
export const REPOSITORY_MAPPING_TOKEN = new InjectionToken<IBaseMapping<any>>('IBaseRepositoryMapping');
export const PEOPLE_REPOSITORY_MAPPING_TOKEN = new InjectionToken<IBaseMapping<Person>>('IPeopleRepositoryMapping');
export const GROUP_REPOSITORY_MAPPING_TOKEN = new InjectionToken<IBaseMapping<Group>>('IGroupRepositoryMapping');

