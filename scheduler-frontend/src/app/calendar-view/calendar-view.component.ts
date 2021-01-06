import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {CalendarService} from '../services/calendar.service';
import {Calendar} from '../models/calendar';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss']
})
export class CalendarViewComponent implements OnInit {
  calendar!: Calendar;

  constructor(
    private route: ActivatedRoute,
    public calendarService: CalendarService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.calendarService.getCalendar(params.name)
        .pipe(first())
        .subscribe(value => {
          this.calendar = value;
          console.log(this.calendar);
        });
    });
  }
}
