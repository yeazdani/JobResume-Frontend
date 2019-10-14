import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  skills: any[] = [];
  constructor() { }

  ngOnInit() {
  }
  
  addSkill(skill: any) {
    if (skill.value != '') {
      this.skills.push(skill.value);
      skill.value = '';
    }

  }
  deleteSkill(i) {
    this.skills.splice(i, 1);
  }
}
