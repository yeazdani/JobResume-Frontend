import { ProfileService } from './../../shared/services/profile-service/profile.service';
import { StorageService } from './../../shared/services/storage-service/storage.service';
import { Experience } from './../../models/experience.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  user: any;

  @Output() deleteEvent = new EventEmitter<void>();
  @Output() emitSnackBar = new EventEmitter<void>();

  company_name = "";
  job_title = "";
  location = "";
  details = "";
  dateFrom = "";
  dateTo = "";

  @Input('selfIndex') selfIndex;
  @Input('experienceArray') experience: Experience[];

  constructor(
    private storageService: StorageService,
    private profileService: ProfileService
  ) {
    this.user = this.storageService.getCurrentUser();
  }

  ngOnInit() {
    this.showData();
  }

  showData() {
    this.company_name = this.experience[this.selfIndex].company_name;
    this.job_title = this.experience[this.selfIndex].job_title;
    this.location = this.experience[this.selfIndex].location;
    this.details = this.experience[this.selfIndex].details;
    this.dateFrom = this.experience[this.selfIndex].date_from;
    this.dateTo = this.experience[this.selfIndex].date_to;
  }

  deleteExperience() {
    this.deleteEvent.emit();
  }

  updateExperience() {
    const rootObj = this.mapData();
    this.profileService.updateExperience(rootObj).subscribe(
      res => {
        this.emitSnackBar.emit();
      }
    )
  }

  mapData() {
    this.experience[this.selfIndex].company_name = this.company_name;
    this.experience[this.selfIndex].job_title = this.job_title;
    this.experience[this.selfIndex].date_from = this.dateFrom;
    this.experience[this.selfIndex].date_to = this.dateTo;
    this.experience[this.selfIndex].details = this.details;
    this.experience[this.selfIndex].location = this.location;

    const rootExp = {
      uid: this.user.uid,
      experience: this.experience
    }
    return rootExp;
  }

}
