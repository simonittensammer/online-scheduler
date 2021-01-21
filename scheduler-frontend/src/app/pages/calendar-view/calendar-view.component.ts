import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CalendarService} from '../../services/calendar.service';
import {Calendar} from '../../models/calendar';
import {first} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Appointment} from '../../models/appointment';
import {AppointmentService} from '../../services/appointment.service';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss']
})
export class CalendarViewComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public calendarService: CalendarService,
    public appointmentService: AppointmentService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.calendarService.getCalendar(params.name)
        .pipe(first())
        .subscribe(value => {
          this.calendarService.calendar = value;
        });
    });
  }

  createAppointment(): void {
    this.router.navigate(['appointmentSettings', '']);
    // this.appointmentService.editedAppointment = null;
  }

  editAppointment(appointment: Appointment): void {
    this.router.navigate(['appointmentSettings', appointment.id]);
    // this.appointmentService.editedAppointment = appointment;
  }
}
