import { Router } from '@angular/router';
import { RootPostJob } from './../../models/root-post-job.model';
import { PostJob } from './../../models/post-job.model';
import { ProfileService } from './../../shared/services/profile-service/profile.service';
import { UserInfo } from './../../models/user-info.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StorageService } from '../../shared/services/storage-service/storage.service';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.scss']
})
export class PostJobComponent implements OnInit {

  jobTypes: any[] = ['Full-Time', 'Part-Time'];

  @Output() emitSnackBar = new EventEmitter<void>();

  user: UserInfo;
  postJobs: PostJob[] = [];
  jobExsists = false;

  job_title: string = "";
  company_name: string = "";
  location: string = "";
  job_type: string = "";
  deadline: string = "";
  job_details: string = "";

  constructor(
    private storageService: StorageService,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.user = this.storageService.getCurrentUser();
  }

  ngOnInit() {
    this.getExistingJobs();
  }

  getExistingJobs() {
    this.profileService.getJob(this.user.uid).subscribe(
      (res: RootPostJob) => {
        if (!res) {
          return;
        }
        this.jobExsists = true;
        this.postJobs = res.postJobs;
      }
    );
  }

  post() {
    const rooObj = this.mapDate();
    if (!this.jobExsists) {
      this.profileService.postJob(rooObj).subscribe(
        res => {
          this.getExistingJobs();
          this.emitSnackBar.emit();
          this.router.navigate(['/profile']);
        }
      );
    } else {
      this.profileService.putJob(rooObj).subscribe(
        res => {
          this.getExistingJobs();
          this.emitSnackBar.emit();
          this.router.navigate(['/profile']);
        }
      );
    }
  }

  mapDate() {
    const postJob = {
      job_title: this.job_title,
      company_name: this.company_name,
      location: this.location,
      job_type: this.job_type,
      deadline: this.deadline,
      job_details: this.job_details,
      publish_date: new Date()
    }
    this.postJobs.push(postJob);
    const rootPostJob = {
      uid: this.user.uid,
      postJobs: this.postJobs
    }
    return rootPostJob;
  }
}
