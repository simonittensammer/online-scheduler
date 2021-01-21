import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {CalendarService} from '../../services/calendar.service';
import {ActivatedRoute, Params} from '@angular/router';
import {first} from 'rxjs/operators';
import {AppointmentService} from '../../services/appointment.service';
import {Calendar} from '../../models/calendar';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {

  appointmentForm!: FormGroup;

  constructor(
    private location: Location,
    public calendarService: CalendarService,
    public appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.appointmentForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(),
      date: new FormControl('', Validators.required),
      startTime: new FormControl(''),
      endTime: new FormControl('')
    });

    this.route.params.subscribe((params: Params) => {
      if (params.id !== '' && params.id != null) {
        this.appointmentService.getAppointment(params.id)
          .pipe(first())
          .subscribe(value => {
            this.calendarService.editedAppointment = value;
            this.appointmentForm.patchValue(this.calendarService.editedAppointment);
            console.log(this.calendarService.editedAppointment);
          });
      } else {
        this.calendarService.editedAppointment = null;
        console.log(this.calendarService.editedAppointment);
      }
    });
  }

  saveAppointment(): void {
    if (this.calendarService.editedAppointment != null) {
      console.log('update');
      this.calendarService.updateAppointment(this.appointmentForm.value).subscribe(() => {
        this.snackBar.open('Appointment successfully updated!', 'Done', {duration: 2500});
        this.calendarService.getAllCalendars().subscribe(value2 => {
          this.calendarService.calendarList = value2;
          this.location.back();
          this.calendarService.editedAppointment = null;
        });
      });
    } else {
      console.log('create');
      console.log(this.appointmentForm.value);
      const appointment = this.appointmentForm.value;
      appointment.date = appointment.date.toISOString();
      this.calendarService.addAppointment(appointment).subscribe(value => {
        this.calendarService.calendar?.appointments.push(value);
        this.snackBar.open('Appointment successfully created!', 'Done', {duration: 2500});
        this.location.back();
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
