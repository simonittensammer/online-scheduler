import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CalendarViewComponent} from './calendar-view/calendar-view.component';
import {CalendarListComponent} from './calendar-list/calendar-list.component';

const routes: Routes = [
  {
    path: '',
    component: CalendarListComponent
  },
  {
    path: 'calendar-view',
    component: CalendarViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
