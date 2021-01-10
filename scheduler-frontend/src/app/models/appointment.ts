export class Appointment {
  id: number;
  title: string;
  description: string;
  date: string;
  start: string;
  end: string;

  constructor(id: number, title: string, description: string, date: string, start: string, end: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
    this.start = start;
    this.end = end;
  }
}
