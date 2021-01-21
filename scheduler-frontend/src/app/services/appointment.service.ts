import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Calendar} from '../models/calendar';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Appointment} from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  SERVER_URL = 'http://localhost:8080/';
  editedAppointment!: Appointment | null;

  constructor(
    private http: HttpClient
  ) {
  }

  getAppointment(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(this.SERVER_URL + 'appointment/' + id)
      .pipe(map(appointment => {
        return appointment;
      }));
  }

  updateAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(this.SERVER_URL + 'appointment/', appointment);
  }
}
