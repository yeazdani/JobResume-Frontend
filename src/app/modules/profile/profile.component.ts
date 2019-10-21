import { RootPostJob } from './../models/root-post-job.model';
import { RootExperience } from './../models/root-experience.model';
import { StorageService } from './../shared/services/storage-service/storage.service';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ProfileService } from '../shared/services/profile-service/profile.service';
import { RootEducation } from '../models/root-education.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  durationInSeconds = 2;

  experienceList: any[] = [];
  educationList: any[] = [];
  postedJobs: number = 0;

  experienceDocumentCreated = false;
  educationDocumentCreated = false;

  user: any;

  constructor(
    private _snackBar: MatSnackBar,
    private storageservice: StorageService,
    private profileService: ProfileService
  ) {
    this.user = this.storageservice.getCurrentUser();
  }

  ngOnInit() {
    this.getExperienceUpdate();
    this.getEducationUpdate();
    this.getPostedJobs();
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  getExperienceUpdate() {
    this.profileService.getExperience(this.user.uid).subscribe(
      (res: RootExperience) => {
        if (!res) {
          return;
        }
        this.experienceList = res.experience;
        this.experienceDocumentCreated = true;
      }
    );
  }

  getEducationUpdate() {
    this.profileService.getEducation(this.user.uid).subscribe(
      (res: RootEducation) => {
        if (!res) {
          return;
        }
        this.educationList = res.education;
        this.educationDocumentCreated = true;
      }
    );
  }

  addExperience() {
    if (this.experienceDocumentCreated) {
      const obj = this.mapExperienceData();
      this.profileService.updateExperience(obj).subscribe(
        res => {
          this.getExperienceUpdate();
        }
      );
    } else {
      const obj = this.mapExperienceData();
      this.profileService.addExperience(obj).subscribe(
        res => {
          console.log(res)
          this.getExperienceUpdate();
        }
      );
    }
  }

  addEducation() {
    console.log('working')
    if (this.educationDocumentCreated) {
      console.log('working2')
      const obj = this.mapEducationData();
      this.profileService.updateEducation(obj).subscribe(
        res => {
          this.getEducationUpdate();
        },
        err => {
          console.log(err)
        }
      );
    } else {
      console.log('working3')
      const obj = this.mapEducationData();
      console.log('working4')
      this.profileService.addEducation(obj).subscribe(
        res => {
          this.getEducationUpdate();
        }
      );
    }
  }

  deleteExperience(i) {
    this.experienceList.splice(i, 1);
    const rootExp = {
      uid: this.user.uid,
      experience: this.experienceList
    }
    this.profileService.updateExperience(rootExp).subscribe(
      res => {
        this.getExperienceUpdate();
      }
    );
  }

  deleteEducation(i) {
    this.educationList.splice(i, 1);
    const rootEdu = {
      uid: this.user.uid,
      education: this.educationList
    }
    this.profileService.updateEducation(rootEdu).subscribe(
      res => {
        this.getEducationUpdate();
      }
    );
  }

  mapExperienceData() {
    const exp = {
      company_name: "",
      job_title: "",
      date_from: "",
      date_to: "",
      locaiton: "",
      details: "",
    }
    this.experienceList.push(exp);
    const rootExp = {
      uid: this.user.uid,
      experience: this.experienceList
    }
    return rootExp;
  }

  mapEducationData() {
    const edu = {
      institution: "",
      degree: "",
      date_from: "",
      date_to: "",
      location: "",
    }
    this.educationList.push(edu);
    const rootEdu = {
      uid: this.user.uid,
      education: this.educationList
    }
    return rootEdu;
  }

  getPostedJobs() {
    this.profileService.getJob(this.user.uid).subscribe(
      (res: RootPostJob) => {
        if (!res) {
          return;
        }
        this.postedJobs = res.postJobs.length;
      }
    );
  }

}
