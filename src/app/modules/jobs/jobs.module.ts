import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobDetailsComponent } from './job-details/job-details.component';
import { JobListComponent } from './job-list/job-list.component';
import { Routes, RouterModule } from '@angular/router';
import { JobsComponent } from './jobs.component';
import { JobFilterComponent } from './job-filter/job-filter.component';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

const routes: Routes = [
  {
    path: '', component: JobsComponent, children: [
      { path: '', component: JobListComponent }
    ]
  },
];


@NgModule({
  declarations: [
    JobDetailsComponent,
    JobListComponent,
    JobsComponent,
    JobFilterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCheckboxModule,
    MatIconModule,
    MatListModule
  ]
})
export class JobModule { }
