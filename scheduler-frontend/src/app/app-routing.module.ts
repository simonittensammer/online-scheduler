import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CalendarViewComponent} from './pages/calendar-view/calendar-view.component';
import {CalendarListComponent} from './pages/calendar-list/calendar-list.component';
import {CalendarFormComponent} from './pages/calendar-form/calendar-form.component';
import {AppointmentFormComponent} from './pages/appointment-form/appointment-form.component';

const routes: Routes = [
  {
    path: '',
    component: CalendarListComponent
  },
  {
    path: 'calendar/:name',
    component: CalendarViewComponent
  },
  {
    path: 'calendarSettings/:name',
    component: CalendarFormComponent
  },
  {
    path: 'appointmentSettings/:id',
    component: AppointmentFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
