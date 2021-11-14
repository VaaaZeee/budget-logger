import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { UnAuthGuard } from './core/guards/auth/un-auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/login/login.module').then((m) => m.LoginPageModule),
    canActivate: [UnAuthGuard],
    canLoad: [UnAuthGuard],
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./pages/auth/signup/signup.module').then(
        (m) => m.SignupPageModule
      ),
    canActivate: [UnAuthGuard],
    canLoad: [UnAuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
