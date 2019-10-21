import { UserInfo } from './../../models/user-info.model';
import { ProfileService } from './../../shared/services/profile-service/profile.service';
import { StorageService } from './../../shared/services/storage-service/storage.service';
import { Component, OnInit } from '@angular/core';
import { PreviewResumeComponent } from '../preview-resume/preview-resume.component';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-info',
  templateUrl: './side-info.component.html',
  styleUrls: ['./side-info.component.scss']
})
export class SideInfoComponent implements OnInit {
  selectedFile: File = null;
  subscription: Subscription;

  user: UserInfo;
  firstName;
  lastName;

  constructor(
    public dialog: MatDialog,
    private storageService: StorageService,
    private profileService: ProfileService
  ) {
    this.user = this.storageService.getCurrentUser();
  }

  ngOnInit() {
    this.userInfo();
    this.subscription = this.profileService.getFromSibling().subscribe(
      res => {
        this.userInfo();
      }
    );
  }

  userInfo() {
    this.profileService.getUserInfo(this.user.uid).subscribe(
      (res: UserInfo) => {
        this.firstName = res.first_name;
        this.lastName = res.last_name;
      }
    );
  }

  fetchImage() {
    this.profileService.getPhoto(this.user.uid).subscribe(
      res => {
        if (!res) {
          console.log('no Image Uploaded Before')
          return;
        }
        console.log('Image available')
      }
    );
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    this.uploadImage();
  }

  uploadImage() {
    const fd = new FormData();
    fd.append('image', this.selectedFile);
    fd.append('uid', this.user.uid);
    this.profileService.uploadPhoto(fd).subscribe(
      res => {
        console.log("image Uploaded")
        this.fetchImage();
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PreviewResumeComponent, {
      width: '90%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog closed event');
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
