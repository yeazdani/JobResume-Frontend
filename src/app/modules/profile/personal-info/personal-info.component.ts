import { UserInfo } from './../../models/user-info.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StorageService } from '../../shared/services/storage-service/storage.service';
import { ProfileService } from '../../shared/services/profile-service/profile.service';


@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

  @Output() emitSnackBar = new EventEmitter<void>();

  user: any;
  loading = false;

  uid: string = "";
  first_name: string = "";
  last_name: string = "";
  email: string = "";
  current_title: string = "";
  phone: string = "";
  location: string = "";
  picRef: string = "";

  userInfo: UserInfo;

  constructor(
    private storageService: StorageService,
    private profileService: ProfileService,

  ) {
    this.user = this.storageService.getCurrentUser();
  }

  ngOnInit() {
    this.loading = true;
    this.getUserInfo();
  }

  getUserInfo() {
    this.profileService.getUserInfo(this.user.uid)
      .subscribe(
        res => {
          this.uid = res.uid;
          this.first_name = res.first_name;
          this.last_name = res.last_name;
          this.email = res.email;
          this.phone = res.phone;
          this.location = res.location;
          this.current_title = res.current_title;
          this.picRef = res.picRef;

          this.loading = false;
        },
        err => {
          console.log(err)
        }
      );
  }
  update() {
    this.userInfo = {
      uid: this.uid,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      current_title: this.current_title,
      phone: this.phone,
      location: this.location,
      picRef: this.picRef
    }
    this.profileService.updateUserInfo(this.userInfo).subscribe(
      res => {
        this.emitSnackBar.emit();
      }
    );

  }


}
