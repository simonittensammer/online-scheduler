import { Component, OnInit } from '@angular/core';
import {CalendarService} from '../services/calendar.service';
import {Router} from '@angular/router';
import {Calendar} from '../models/calendar';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.scss']
})
export class CalendarListComponent implements OnInit {
  searchQuery = '';

  constructor(
    private router: Router,
    public calendarService: CalendarService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.calendarService.getAllCalendars().subscribe(value => {
      this.calendarService.calendarList = value;
    });
  }

  viewCalendar(calendar: Calendar): void {
    this.router.navigate(['calendar', calendar.name]);
  }

  copyUrl(): void{
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = 'https://simonittensammer.github.io/online-scheduler' + this.router.url;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.snackBar.open('Link copied!', 'Done', {duration: 2500});
  }
}
