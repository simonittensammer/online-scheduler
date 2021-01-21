import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CalendarService} from '../../services/calendar.service';
import {Calendar} from '../../models/calendar';
import {first} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

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

  showAppointmentSettings(): void {
    this.router.navigate(['appointmentSettings', '']);
  }
}
