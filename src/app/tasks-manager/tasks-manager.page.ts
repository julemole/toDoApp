import { Component, effect, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonList, IonIcon, IonFab, IonFabButton, IonModal, IonButtons, IonButton, IonInput, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { CardComponent } from '../components/card/card.component';
import { ICategory, ITask } from '../models/task.interface';
import { CategoryService } from '../services/category.service';
import { TasksService } from '../services/tasks.service';
import { RemoteConfigService } from '../services/remote-config.service';

@Component({
  selector: 'app-tasks-manager',
  templateUrl: './tasks-manager.page.html',
  standalone: true,
  styleUrls: ['./tasks-manager.page.scss'],
  imports: [IonButton, IonButtons, IonModal, IonFab, IonFabButton, IonContent, IonHeader, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonList, IonInput, IonSelect, IonSelectOption, IonIcon, CommonModule, FormsModule, CardComponent],
})
export class TasksManagerPage implements OnInit {

  categories: WritableSignal<ICategory[]> = signal<ICategory[]>([]);
  tasks: WritableSignal<ITask[]> = signal<ITask[]>([]);
  filteredTasks: ITask[] = [];
  filter: string | number = 'all';
  showModal: boolean = false;

  selectedCategory: number | null = null;
  taskName: string | null = null;
  taskCategory: number | null = null;
  isFeatureEnabled: boolean = false;

  constructor(private categoryService: CategoryService, private tasksService: TasksService,
    private remoteConfigService: RemoteConfigService
   ) {
    addIcons({add});
    this.categories = this.categoryService.getCategories();
    this.tasks = this.tasksService.getTasks();

    effect(() => {
      this.tasks();
      this.filterTasks({detail: {value: this.filter}});
    });
  }

  async ngOnInit() {
    this.isFeatureEnabled = await this.remoteConfigService.getFirebaseFlag();
    await this.loadCategories();
    await this.loadTasks();
  }

  async loadCategories() {
    try {
      await this.categoryService.getCategoriesList();
    } catch (error) {
      console.log('Error getting categories', error);
    }
  }

  async loadTasks() {
    try {
      await this.tasksService.getTasksList();
    } catch (error) {
      console.log('Error getting tasks', error);
    }
  }

  openModal() {
    this.showModal = true;
  }

  filterTasks(event?: any) {
    if (event) {
      this.filter = event.detail.value;
    }

    this.filteredTasks = this.tasks().filter(task => {
      const matchesState =
        this.filter === 'all' || (this.filter === 'done' ? task.completed : !task.completed);
      const matchesCategory =
        this.selectedCategory === null || this.selectedCategory === 0 || Number(task.category_id) === this.selectedCategory;

      return matchesState && matchesCategory;
    });
  }


  filterByCategory(event: any) {
    this.selectedCategory = event.detail.value;
    this.filterTasks();
  }

  async addTask() {
    if(this.taskName === null || this.taskCategory === null ) return;

    const task: ITask = {
      name: this.taskName!,
      category_id: this.taskCategory!
    }

    try {
      await this.tasksService.addTask(task);
      this.taskName = '';
      this.taskCategory = null;
      this.showModal = false;
    } catch (error) {
      console.log('Error adding task', error);
    }
  }

  closePreview() {
    this.showModal = false;
  }




}
