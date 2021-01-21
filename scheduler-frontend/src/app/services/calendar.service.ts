import {Injectable} from '@angular/core';
import {Calendar} from '../models/calendar';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Appointment} from '../models/appointment';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  SERVER_URL = 'http://localhost:8080/';

  calendar!: Calendar | null;
  calendarList: Array<Calendar> = [];
  editedAppointment!: Appointment | null;

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {
  }

  getAllCalendars(): Observable<Array<Calendar>> {
    return this.http.get<Array<Calendar>>(this.SERVER_URL + 'calendar');
  }

  getCalendar(name: string): Observable<Calendar> {
    return this.http.get<Calendar>(this.SERVER_URL + 'calendar/' + name)
      .pipe(map(calendar => {
        return calendar;
      }));
  }

  createCalendar(calendar: Calendar): Observable<Calendar> {
    return this.http.post<Calendar>(this.SERVER_URL + 'calendar', calendar);
  }

  updateCalendar(calendar: Calendar): Observable<Calendar> {
    return this.http.put<Calendar>(this.SERVER_URL + 'calendar', calendar);
  }

  addAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.SERVER_URL + 'calendar/' + this.calendar?.name + '/appointment', appointment);
  }

  updateAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(this.SERVER_URL + '/calendar/' + this.calendar?.name + '/appointment/' + this.editedAppointment?.id, appointment);
  }

  copyUrl(calendar: Calendar | null): void {
    const calendarName = calendar?.name;
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = window.location.origin + '/calendar/' + calendarName;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.snackBar.open('Link for calendar "' + calendarName + '" copied!', 'Done', {duration: 2500});
  }
}
