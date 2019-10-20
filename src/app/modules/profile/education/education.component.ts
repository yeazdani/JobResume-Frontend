import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StorageService } from '../../shared/services/storage-service/storage.service';
import { ProfileService } from '../../shared/services/profile-service/profile.service';
import { Education } from '../../models/education.model';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  user: any;

  @Output() deleteEvent = new EventEmitter<void>();
  @Output() emitSnackBar = new EventEmitter<void>();

  institution: string = "";
  degree: string = "";
  date_from: string = "";
  date_to: string = "";
  location: string = "";

  @Input('selfIndex') selfIndex;
  @Input('educationArray') education: Education[];

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
    this.institution = this.education[this.selfIndex].institution;
    this.degree = this.education[this.selfIndex].degree;
    this.location = this.education[this.selfIndex].location;
    this.date_from = this.education[this.selfIndex].date_from;
    this.date_to = this.education[this.selfIndex].date_to;
  }

  deleteEducation() {
    this.deleteEvent.emit();
  }

  updateEducation() {
    const rootObj = this.mapData();
    this.profileService.updateEducation(rootObj).subscribe(
      res => {
        this.emitSnackBar.emit();
      }
    )
  }

  mapData() {
    this.education[this.selfIndex].institution = this.institution;
    this.education[this.selfIndex].degree = this.degree;
    this.education[this.selfIndex].date_from = this.date_from;
    this.education[this.selfIndex].date_to = this.date_to;
    this.education[this.selfIndex].location = this.location;

    const rootExp = {
      uid: this.user.uid,
      education: this.education
    }
    return rootExp;
  }


}
