import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {CalendarService} from '../../services/calendar.service';
import {Calendar} from '../../models/calendar';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrls: ['./calendar-form.component.scss']
})
export class CalendarFormComponent implements OnInit {

  calendarForm!: FormGroup;
  hide = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    public calendarService: CalendarService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.calendarForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(),
      pw: new FormControl('', Validators.required)
    });

    if (this.calendarService.calendar) {
      this.calendarForm.patchValue(this.calendarService.calendar);
      this.calendarForm.get('name')?.disable();
    }
  }

  saveCalendar(): void {
    if (this.calendarService.calendar) {
      const updatedCalendar = new Calendar(
        this.calendarService.calendar.name,
        this.calendarForm.value.description,
        this.calendarForm.value.pw,
        this.calendarService.calendar.appointments
      );
      this.calendarService.updateCalendar(updatedCalendar).subscribe(value => {
        this.calendarService.getAllCalendars().subscribe(value2 => {
          this.calendarService.calendarList = value2;
          this.snackBar.open('Calendar successfully updated!', 'Done', {duration: 2500});
          this.location.back();
        });
      });
    } else {
      this.calendarService.createCalendar(this.calendarForm.value).subscribe(value => {
        this.calendarService.calendarList.push(value);
        this.snackBar.open('Calendar successfully created!', 'Done', {duration: 2500});
        this.router.navigate(['calendar', this.calendarForm.value.name]);
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
