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
    private snackBar: MatSnackBar,
    public calendarService: CalendarService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  copyUrl(): void{
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = 'https://simonittensammer.github.io/online-scheduler' + '/placeholder';
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.snackBar.open('Link copied!', 'Done', {duration: 2500});
  }

  showCalendarSettings(calendar: Calendar): void {
    this.router.navigate(['calendarSettings', calendar.name]);
  }
}
