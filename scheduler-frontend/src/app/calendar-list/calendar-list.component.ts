import { Component, OnInit } from '@angular/core';
import {CalendarService} from '../services/calendar.service';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.scss']
})
export class CalendarListComponent implements OnInit {
  searchQuery = '';

  constructor(
    public calendarService: CalendarService
  ) { }

  ngOnInit(): void {
    this.calendarService.getAllCalendars().subscribe(value => {
      this.calendarService.calendarList = value;
    });
  }

}
