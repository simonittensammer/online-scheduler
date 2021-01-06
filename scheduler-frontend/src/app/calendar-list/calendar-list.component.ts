import { Component, OnInit } from '@angular/core';
import {CalendarService} from '../services/calendar.service';
import {Router} from '@angular/router';
import {Calendar} from '../models/calendar';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.scss']
})
export class CalendarListComponent implements OnInit {
  searchQuery = '';

  constructor(
    private router: Router,
    public calendarService: CalendarService
  ) { }

  ngOnInit(): void {
    this.calendarService.getAllCalendars().subscribe(value => {
      this.calendarService.calendarList = value;
    });
  }

  viewCalendar(calendar: Calendar): void {
    this.router.navigate(['calendar-view']);
  }
}
