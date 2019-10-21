import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './modules/guards/auth.guard';

const routes: Routes = [
  {
    path: '', loadChildren: () =>
      import('./modules/auth/auth.module')
        .then(m => m.AuthModule)
  },
  {
    path: 'jobs', loadChildren: () =>
      import('./modules/jobs/jobs.module')
        .then(m => m.JobModule)
  },
  {
    path: '',
    redirectTo: '/jobs',
    pathMatch: 'full'
  },
  {
    path: 'profile', loadChildren: () =>
      import('./modules/profile/profile.module')
        .then(m => m.ProfileModule),
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
