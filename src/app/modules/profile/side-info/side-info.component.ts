import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ProfileService } from './../../shared/services/profile-service/profile.service';
import { StorageService } from './../../shared/services/storage-service/storage.service';
import { PreviewResumeComponent } from '../preview-resume/preview-resume.component';
import { UserInfo } from './../../models/user-info.model';
import { MatDialog } from '@angular/material';
import { Subscription, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-side-info',
  templateUrl: './side-info.component.html',
  styleUrls: ['./side-info.component.scss']
})
export class SideInfoComponent implements OnInit {

  subscription: Subscription;

  user: UserInfo;
  user2: UserInfo;
  firstName;
  lastName;
  uploadPercent: Observable<number>;
  imageURL: any;
  defaultImage = "../../../../assets/default.jpg";

  constructor(
    public dialog: MatDialog,
    private storageService: StorageService,
    private profileService: ProfileService,
    private fireStorage: AngularFireStorage
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
        this.user2 = res;
        this.firstName = res.first_name;
        this.lastName = res.last_name;
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
      }
    );
  }

  onFileSelected(event) {
    if (event.target.files.length < 1) {
      return;
    }
    const file = event.target.files[0];
    const filePath = 'users/' + this.user.uid;
    const fileRef = this.fireStorage.ref(filePath);
    const task = this.fireStorage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => fileRef.getDownloadURL().subscribe(
        res => {
          this.imageURL = res
        }
      ))
    )
      .subscribe(
        res => {
          // this.user2.picRef = this.imageURL;
          this.uploadImage();
        }
      );

  }

  uploadImage() {
    const newUserInfo: UserInfo = <UserInfo>{
      uid: this.user2.uid,
      first_name: this.user2.first_name,
      last_name: this.user2.last_name,
      email: this.user2.email,
      current_title: this.user2.current_title,
      phone: this.user2.uid,
      location: this.user2.location,
      picRef: true
    }
    this.profileService.updateUserInfo(newUserInfo).subscribe(
      res => {
        this.userInfo();
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PreviewResumeComponent, {
      width: '90%',
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog closed event');
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
