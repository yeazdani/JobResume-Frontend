import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.scss']
})
export class PostJobComponent implements OnInit {
  jobTypes: any[] = ['Full-Time', 'Part-Time'];
  constructor() { }

  ngOnInit() {
  }

}
