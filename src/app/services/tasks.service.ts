import { Injectable, signal, WritableSignal } from '@angular/core';
import { StorageService } from './storage.service';
import { ITask } from '../models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasks: WritableSignal<ITask[]> = signal<ITask[]>([]);

  constructor(private storageService: StorageService) { }

  async getTasksList() {
    try {
      const tasks = await this.storageService.loadTasks();
      this.tasks.set(tasks);
    } catch (error) {
      console.log('Error getting tasks', error);
      throw new Error('Error getting tasks');
    }
  }

  async addTask(task: ITask) {
    try {
      await this.storageService.createTask(task);
      await this.getTasksList();
    } catch (error) {
      console.log('Error adding task', error);
    }
  }

  async editTask(task: ITask) {
    try {
      await this.storageService.updateTask(task);
      await this.getTasksList();
    } catch (error) {
      console.log('Error editing task', error);
    }
  }

  async markDone(task: ITask) {
    try {
      await this.storageService.markDone(task);
      await this.getTasksList();
    } catch (error) {
      console.log('Error marking task as done', error);
    }
  }

  async deleteTask(task_id: number) {
    try {
      await this.storageService.deleteTask(task_id);
      await this.getTasksList();
    } catch (error) {
      console.log('Error deleting task', error);
    }
  }

  getTasks() {
    return this.tasks;
  }
}
