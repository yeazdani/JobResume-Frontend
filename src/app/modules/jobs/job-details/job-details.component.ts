import { SingleJob } from './../../models/single-job.model';
import { JobsService } from './../../shared/services/jobs-service/jobs.service';
import { PostJob } from './../../models/post-job.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
  loading = false;

  jobId: string = "";
  job_title: string = "";
  company_name: string = "";
  location: string = "";
  job_type: string = "";
  deadline: string = "";
  job_details: string = "";

  constructor(private jobsService: JobsService) { }

  ngOnInit() {
    // this.loadData();
  }

  loadData(id) {
    this.loading = true;
    this.jobsService.getJobById(id).subscribe(
      (res: SingleJob) => {
        this.job_title = res.job.job_title;
        this.company_name = res.job.company_name;
        this.location = res.job.location;
        this.job_type = res.job.job_type;
        this.deadline = res.job.deadline;
        this.job_details = res.job.job_details;
        this.loading = false;
      }
    );
  }

}
