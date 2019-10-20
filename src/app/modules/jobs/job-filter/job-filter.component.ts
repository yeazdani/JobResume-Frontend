import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatCheckbox } from '@angular/material';

@Component({
  selector: 'app-job-filter',
  templateUrl: './job-filter.component.html',
  styleUrls: ['./job-filter.component.scss']
})
export class JobFilterComponent implements OnInit {

  @Output() checkedEvent = new EventEmitter<string>();

  filterCheckBoxs: any[] = ["Full-Time", "Part-Time", "Montreal", "Toronto"];

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
