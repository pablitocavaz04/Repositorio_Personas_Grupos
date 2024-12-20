// src/app/services/impl/people.service.ts
import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base-service.service';
import { Task } from '../../models/task.model';
import { TASKS_REPOSITORY_TOKEN } from '../../repositories/repository.tokens';
import { ITasksRepository } from '../../repositories/intefaces/tasks-repository.interface';
import { ITasksService } from '../interfaces/tasks-service.interface';

// Indica que el servicio será un Singleton, solo habrá una instancia de él
@Injectable({
  providedIn: 'root'
}) // Hereda BaseService y lo parametriza para trabajar con Task
export class TasksService extends BaseService<Task> implements ITasksService {
  constructor( // Inyecta el repositorio ITasksRepository
    @Inject(TASKS_REPOSITORY_TOKEN) repository: ITasksRepository
  ) {
    super(repository); // Constructor de BaseService
  }

  // Implementa métodos específicos si los hay
}
