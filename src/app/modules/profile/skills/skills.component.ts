import { ProfileService } from './../../shared/services/profile-service/profile.service';
import { StorageService } from './../../shared/services/storage-service/storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  skills: any[] = [];
  skillsDocumentCreated = false;
  user: any;

  constructor(
    private storageService: StorageService,
    private profileService: ProfileService
  ) {
    this.user = this.storageService.getCurrentUser();
  }

  ngOnInit() {
    this.getSkills();
  }

  getSkills() {
    this.profileService.getSkills(this.user.uid).subscribe(
      (res) => {
        if (!res) {
          return;
        }
        this.skills = res.skills;
        this.skillsDocumentCreated = true;
      }
    );
  }

  addSkill(skill: any) {
    if (skill.value != '' && this.skillsDocumentCreated == false) {
      this.skills.push(skill.value);
      skill.value = '';

      const rootSkills = {
        uid: this.user.uid,
        skills: this.skills
      }

      this.profileService.addSkills(rootSkills).subscribe(
        (res) => {
          this.getSkills();
        }
      );
    } else {
      if (skill.value != '') {
        this.skills.push(skill.value);
        skill.value = '';

        const rootSkills = {
          uid: this.user.uid,
          skills: this.skills
        }

        this.profileService.updateSkills(rootSkills).subscribe(
          (res) => {
            this.getSkills();
          }
        );
      }
    }
  }

  deleteSkill(i) {
    this.skills.splice(i, 1);
    const rootSkills = {
      uid: this.user.uid,
      skills: this.skills
    }
    this.profileService.updateSkills(rootSkills).subscribe(
      res => {
        this.getSkills();
      }
    );
  }
}
