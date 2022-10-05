import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {

  editForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) { }

  ngOnInit() {
    //retrieved the tripId
    let tripCode = localStorage.getItem("tripCode");
    if (!tripCode){
      alert("No trip code found!");
      this.router.navigate(['']);
      return;
    }

    console.log('EdiTripComponenet#onInit found tripCode ' + tripCode);

    //Initialize
    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    })

    console.log('EditTripComponent#onInit calling TripDataService#getTrip( \'' + tripCode);

    this.tripService.getTrip(tripCode)
      .then(data => {
        console.log(data);
        //dont use editForm.setValue() unless you want an error
        this.editForm.patchValue(data[0]);
      })
  }

  onSubmit(){
    this.submitted = true;

    if (this.editForm.valid) {
      this.tripService.updateTrip(this.editForm.value)
        .then(data => {
          console.log(data);
          this.router.navigate(['']);
        });
    }
  }

  //get the form short name to acess the fields
  get f() { return this.editForm.controls; }
  
}