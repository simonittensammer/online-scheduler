import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {CalendarService} from '../../services/calendar.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {

  appointmentForm!: FormGroup;

  constructor(
    private location: Location,
    public calendarService: CalendarService
  ) { }

  ngOnInit(): void {
    this.appointmentForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(),
      date: new FormControl('', Validators.required),
      startTime: new FormControl(''),
      endTime: new FormControl('')
    });
  }

  saveAppointment(): void {
    this.calendarService.addAppointment(this.appointmentForm.value).subscribe(value => {
      this.calendarService.calendar?.appointments.push(value);
      this.location.back();
    });
  }

  goBack(): void {
    this.location.back();
  }
}
