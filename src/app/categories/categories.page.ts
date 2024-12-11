import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonButton, IonIcon, IonButtons, IonModal, IonInput } from '@ionic/angular/standalone';
import { ICategory } from '../models/task.interface';
import { addIcons } from 'ionicons';
import { saveOutline, add, pencilOutline, trashOutline } from 'ionicons/icons';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [IonInput, IonContent, IonCard, IonHeader, IonTitle, IonToolbar, CommonModule, IonButton, IonButtons, IonModal, IonIcon, FormsModule]
})
export class CategoriesPage implements OnInit {

  categories: WritableSignal<ICategory[]> = signal<ICategory[]>([]);
  categoryToEdit!: ICategory;
  showModal: boolean = false;
  action: | 'add' | 'edit' = 'add';
  categoryName: string = '';

  constructor(private categoryService: CategoryService) {
    addIcons({add, saveOutline, pencilOutline, trashOutline});
    this.categories = this.categoryService.getCategories();
  }

  ngOnInit() {
    this.loadCategories();
  }

  async loadCategories() {
    try {
      await this.categoryService.getCategoriesList();
    } catch (error) {
      console.log('Error getting categories', error);
    }
  }

  openModal(action?: string, category?: ICategory) {
    this.showModal = true;
    if(category) {
      this.categoryToEdit = category;
      this.categoryName = category.name;
    }
    if(action) this.action = action as 'add' | 'edit';
  }

  async addCategory() {
    if(this.categoryName === '') return;

    const category: ICategory = {
      name: this.categoryName
    }

    try {
      await this.categoryService.addCategory(category);
      this.categoryName = '';
      this.showModal = false;
    } catch (error) {
      console.log('Error adding category', error);
    }

  }

  async editCategory() {
    try {
      await this.categoryService.editCategory(this.categoryToEdit.id!, this.categoryName);
      this.showModal = false;
    } catch (error) {
      console.log('Error editing category', error);
    }
  }

  async deleteCategory(category_id: number) {
    try {
      await this.categoryService.deleteCategory(category_id);
    } catch (error) {
      console.log('Error deleting category', error);
    }
  }

  closePreview() {
    this.showModal = false;
  }

}
