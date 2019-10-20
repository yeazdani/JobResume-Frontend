import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ProfileComponent } from './profile.component';
import { ExperienceComponent } from './experience/experience.component';
import { EducationComponent } from './education/education.component';
import { SkillsComponent } from './skills/skills.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { SideInfoComponent } from './side-info/side-info.component';
import { SettingsComponent } from './settings/settings.component';
import { PostJobComponent } from './post-job/post-job.component';
import { PreviewResumeComponent } from './preview-resume/preview-resume.component';
import { AuthGuard } from '../guards/auth.guard';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  {
    path: '', component: ProfileComponent
  },
  {
    path: 'post-job', component: PostJobComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [
    ProfileComponent,
    ExperienceComponent,
    EducationComponent,
    SkillsComponent,
    PersonalInfoComponent,
    SideInfoComponent,
    SettingsComponent,
    PostJobComponent,
    SnackbarComponent,
    PreviewResumeComponent,
  ],
  entryComponents: [PreviewResumeComponent, SnackbarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule,
  ]
})
export class ProfileModule { }
