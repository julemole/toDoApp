import { IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonButton } from '@ionic/angular/standalone';
import { Component, Input, OnInit } from '@angular/core';
import { ITask } from 'src/app/models/task.interface';
import { NgClass } from '@angular/common';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonButton, NgClass],
  styleUrls: ['./card.component.scss'],
})
export class CardComponent  implements OnInit {

  @Input() category: string = '';
  @Input() title: string = '';
  @Input() task!: ITask;

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    console.log('first')
  }

  async markDone() {
    try {
      await this.tasksService.markDone(this.task);
    } catch (error) {
      console.log('Error marking task as done', error);
    }
  }

  async deleteTask() {
    try {
      await this.tasksService.deleteTask(this.task.id!);
    } catch (error) {
      console.log('Error deleting task', error);
    }
  }

}
