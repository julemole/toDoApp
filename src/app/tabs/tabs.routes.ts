import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tasks-manager',
        loadComponent: () =>
          import('../tasks-manager/tasks-manager.page').then((m) => m.TasksManagerPage),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('../categories/categories.page').then((m) => m.CategoriesPage),
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tasks-manager',
    pathMatch: 'full',
  },
];
