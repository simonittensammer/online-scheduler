import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CalendarService} from '../../services/calendar.service';
import {Calendar} from '../../models/calendar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public calendarService: CalendarService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  showCalendarSettings(calendar: Calendar): void {
    this.router.navigate(['calendarSettings', calendar.name]);
  }
}
