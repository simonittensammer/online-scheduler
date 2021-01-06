import { Injectable } from '@angular/core';
import {Calendar} from '../models/calendar';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  SERVER_URL = 'http://localhost:8080/';

  calendarList: Array<Calendar> = [];

  constructor(
    private http: HttpClient
  ) { }

  getAllCalendars(): Observable<Array<Calendar>> {
    return this.http.get<Array<Calendar>>(this.SERVER_URL + 'calendar');
  }
}
