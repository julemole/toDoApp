import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksManagerPage } from './tasks-manager.page';

describe('TasksManagerPage', () => {
  let component: TasksManagerPage;
  let fixture: ComponentFixture<TasksManagerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
