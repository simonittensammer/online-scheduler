import {Injectable} from '@angular/core';
import {Calendar} from '../models/calendar';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  SERVER_URL = 'http://localhost:8080/';

  calendar!: Calendar | null;
  calendarList: Array<Calendar> = [];

  constructor(
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
}
