import { RootSkills } from './../../models/root-skills.model';
import { RootExperience } from './../../models/root-experience.model';
import { UserInfo } from './../../models/user-info.model';
import { ProfileService } from './../../shared/services/profile-service/profile.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StorageService } from '../../shared/services/storage-service/storage.service';
import { RootEducation } from '../../models/root-education.model';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-preview-resume',
  templateUrl: './preview-resume.component.html',
  styleUrls: ['./preview-resume.component.scss']
})
export class PreviewResumeComponent implements OnInit {
  user: any;
  userInfo: UserInfo;
  rootExperience: RootExperience;
  rootEducation: RootEducation;
  rootSkills: RootSkills[];
  imageURL: any;
  defaultImage = "../../../../assets/default.jpg";

  constructor(
    private storageService: StorageService,
    private profileService: ProfileService,
    private fireStorage: AngularFireStorage,
    public dialogRef: MatDialogRef<PreviewResumeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = this.storageService.getCurrentUser();
  }

  ngOnInit() {
    this.profileService.getUserInfo(this.user.uid)
      .subscribe((res: UserInfo) => {
        this.userInfo = res;
        if (res.picRef) {
          const ref = this.fireStorage.ref('users/' + this.user.uid);
          ref.getDownloadURL()
            .subscribe((avatarUrl) => {
              // Do something with avatarUrl here
              this.imageURL = avatarUrl;
            }, (error) => {
              // Handle error here
              // Show popup with errors or just console.error
              // console.error(error);
            });
        } else {
          this.imageURL = this.defaultImage;
        }
      });
    this.profileService.getExperience(this.user.uid)
      .subscribe((res: RootExperience) => {
        this.rootExperience = res;
      });
    this.profileService.getEducation(this.user.uid)
      .subscribe((res: RootEducation) => {
        this.rootEducation = res;
      });
    this.profileService.getSkills(this.user.uid)
      .subscribe((res: RootSkills[]) => {
        this.rootSkills = res;
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
