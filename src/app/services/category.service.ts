import { Injectable, signal, WritableSignal } from '@angular/core';
import { StorageService } from './storage.service';
import { ICategory } from '../models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories: WritableSignal<ICategory[]> = signal<ICategory[]>([]);

  constructor(private storageService: StorageService) { }

  async getCategoriesList() {
    try {
      const categories = await this.storageService.loadCategories();
      this.categories.set(categories);
    } catch (error) {
      console.log('Error getting categories', error);
      throw new Error('Error getting categories');
    }
  }

  async addCategory(category: ICategory) {
    try {
      await this.storageService.createCategory(category);
      await this.getCategoriesList();
    } catch (error) {
      console.log('Error adding category', error);
    }
  }

  async editCategory(id: number, name: string) {
    try {
      await this.storageService.updateCategory(id, name);
      await this.getCategoriesList();
    } catch (error) {
      console.log('Error editing category', error);
    }
  }

  async deleteCategory(category_id: number) {
    try {
      await this.storageService.deleteCategory(category_id);
      await this.getCategoriesList();
    } catch (error) {
      console.log('Error deleting category', error);
    }
  }

  getCategories() {
    return this.categories;
  }

}
