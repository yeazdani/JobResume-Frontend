import { JobDetailsComponent } from './job-details/job-details.component';
import { JobsService } from './../shared/services/jobs-service/jobs.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SingleJob } from '../models/single-job.model';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  @ViewChild(JobDetailsComponent, { static: false }) jobDetails: JobDetailsComponent;

  searchName = "";

  jobs: SingleJob[] = [];
  loading = false;

  constructor(
    private jobsService: JobsService
  ) { }

  ngOnInit() {
    this.getAllJobs();
  }
  getAllJobs() {
    this.loading = true;
    const forkJoinArray = [];
    this.jobsService.getAllSingleJobs().subscribe(
      (res: SingleJob[]) => {
        this.jobs = res;
        this.jobDetails.loadData(this.jobs[0].id);
        this.loading = false;
      }
    )
  }

  passJobId(id) {
    this.jobDetails.loadData(id);
  }
  changeSearchName(value) {
    this.searchName = value;
  }
}
