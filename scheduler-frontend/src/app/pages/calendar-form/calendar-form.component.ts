import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrls: ['./calendar-form.component.scss']
})
export class CalendarFormComponent implements OnInit {

  calendarForm!: FormGroup;

  constructor(
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.calendarForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(),
      pw: new FormControl('', Validators.required),
      confirmPw: new FormControl('', Validators.required)
    });
  }

  saveCalendar(): void {

  }

  cancel(): void {
    this.location.back();
  }
}
