import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatCheckbox } from '@angular/material';

@Component({
  selector: 'app-job-filter',
  templateUrl: './job-filter.component.html',
  styleUrls: ['./job-filter.component.scss']
})
export class JobFilterComponent implements OnInit {

  @Output() checkedEvent = new EventEmitter<string>();

  jobTypeFilters: any[] = ["Full-Time", "Part-Time"];
  locationFilters: any[] = ["Montreal", "Toronto"];
  developers: any[] = ["PHP","Angular","Java"]

  constructor() { }

  ngOnInit() {
  }

  checked(checkbox: MatCheckbox, value) {
    if (checkbox.checked == false) {
      this.checkedEvent.emit(value);
    } else {
      this.checkedEvent.emit("");
    }
  }

}
