import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {

  @Input() job_title: string;
  @Input() company_name: string;
  @Input() location: string;
  @Input() job_type: string;
  @Input() deadline: string;

  constructor() { }

  ngOnInit() {
  }

}
