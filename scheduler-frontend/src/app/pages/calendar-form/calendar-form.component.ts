import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {CalendarService} from '../../services/calendar.service';

@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrls: ['./calendar-form.component.scss']
})
export class CalendarFormComponent implements OnInit {

  calendarForm!: FormGroup;

  constructor(
    private router: Router,
    private location: Location,
    public calendarService: CalendarService
  ) { }

  ngOnInit(): void {
    this.calendarForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(),
      pw: new FormControl('', Validators.required)
    });
  }

  saveCalendar(): void { // REMINDER: add feature if calendar is edited and not created
    this.calendarService.createCalendar(this.calendarForm.value).subscribe(value => {
      this.calendarService.calendarList.push(value);
      this.location.back();
    });
  }

  goBack(): void {
    this.location.back();
  }
}