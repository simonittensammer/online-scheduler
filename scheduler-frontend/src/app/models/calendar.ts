import {Appointment} from './appointment';

export class Calendar {
  name: string;
  description: string;
  pw: string;
  appointments: Array<Appointment>;

  constructor(name: string, description: string, pw: string, appointments: Array<Appointment>) {
    this.name = name;
    this.description = description;
    this.pw = pw;
    this.appointments = appointments;
  }
}
