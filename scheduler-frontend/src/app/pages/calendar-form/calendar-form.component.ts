import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {CalendarService} from '../../services/calendar.service';
import {Calendar} from '../../models/calendar';

@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrls: ['./calendar-form.component.scss']
})
export class CalendarFormComponent implements OnInit {

  calendarForm!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    public calendarService: CalendarService
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

  saveCalendar(): void { // REMINDER: add feature if calendar is edited and not created
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
          this.location.back();
        });
      });
    } else {
      this.calendarService.createCalendar(this.calendarForm.value).subscribe(value => {
        this.calendarService.calendarList.push(value);
        this.location.back();
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
