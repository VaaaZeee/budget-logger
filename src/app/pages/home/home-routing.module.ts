import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'categories',
        loadChildren: () =>
          import('./categories/categories.module').then(
            (m) => m.CategoriesPageModule
          ),
      },
      {
        path: 'transaction',
        loadChildren: () =>
          import('./transaction/transaction.module').then(
            (m) => m.TransactionPageModule
          ),
      },
      {
        path: 'overview',
        loadChildren: () =>
          import('./overview/overview.module').then(
            (m) => m.OverviewPageModule
          ),
      },
      {
        path: '',
        redirectTo: 'categories',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'categories',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
