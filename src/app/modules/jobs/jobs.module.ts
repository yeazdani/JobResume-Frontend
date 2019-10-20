import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { JobDetailsComponent } from './job-details/job-details.component';
import { JobListComponent } from './job-list/job-list.component';
import { Routes, RouterModule } from '@angular/router';
import { JobsComponent } from './jobs.component';
import { JobFilterComponent } from './job-filter/job-filter.component';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

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
    MatListModule,
    FormsModule,
    Ng2SearchPipeModule
  ]
})
export class JobModule { }
