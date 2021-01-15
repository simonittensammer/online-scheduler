import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {

  appointmentForm!: FormGroup;

  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {
    this.appointmentForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(),
      date: new FormControl('', Validators.required),
      startTime: new FormControl(''),
      endTime: new FormControl('')
    });
  }

  saveAppointment(): void {

  }

  goBack(): void {
    this.location.back();
  }
}
