import { Sort } from './../util/sort';
import { map } from 'rxjs/operators';
import { ApiService } from '../shared/api.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RestaurantData } from './restaurant-model';
import { Data } from 'popper.js';
import { Observable, observable } from 'rxjs';

export interface Table{
  id:number;
  name: string;
  email: string;
  mobile: number;
  address: string;
  services: string;
  
}

@Component({
  selector: 'app-dashboard',
  
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
 // res:any;
 // headers = ['Id', 'Name', 'Email', 'Mobile', 'Address', 'Services'];
 
 
 
 
  
  formValue!: FormGroup
  submitted=false;

  restaurantModelObject: RestaurantData = new RestaurantData;
  allRestaurantData:any;

  showAdd!: boolean
  showBtn!: boolean

  showModal!: boolean


  constructor(private formBuilder: FormBuilder, private api: ApiService) {}
  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['', [Validators.email]],
      services: ['', Validators.required],
      mobile: ['',[Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      address: ['', [Validators.required,Validators.maxLength(150)]],

    })
    this.getAllData();
    
  }
  

  clickAddResto(){
    
    let ref=document.getElementById('clear');
    ref?.click();
    this.formValue.reset();
    this.showAdd=true;
    this.showBtn = false;
  }

  addResto() {
    
    this.restaurantModelObject.name = this.formValue.value.name;
    this.restaurantModelObject.email = this.formValue.value.email;
    this.restaurantModelObject.mobile = this.formValue.value.mobile;
    this.restaurantModelObject.address = this.formValue.value.address;
    this.restaurantModelObject.services = this.formValue.value.services;

    this.api.postRestaurant(this.restaurantModelObject).subscribe(res => {
      console.log(res);

      
      alert('restaurant  records  added  successfully');

      

      this.formValue.reset();
      this.getAllData();
    },

      err => {
        alert('somethimg is wrong !');
      });
    
     
  }

  getAllData():any{
    this.api.getRestaurant().subscribe(res => {

    

      res = res.sort((a : any, b : any) =>{return <number>(b.id) < <number>(a.id)});
     
      console.log(res);
      this.allRestaurantData=res;
      console.log('hello');
      return res;
      
  })
 
}

  deleteResto(data:any){

    if(confirm("Are you sure to delete " +"id - "+ data.id + "  "+ " "+  "having - - - >" + "name"+ "  as  " +data.name )){
    this.api.deleteResturant(data.id).subscribe(res=>{
      
      this.getAllData();
      this.showModal;
    })}

    else{

    }
  }

  editResto(data:any){
    this.showAdd=false;
    this.showBtn = true;
    this.restaurantModelObject.id=data.id;
  this.formValue.controls['name'].setValue(data.name);
  this.formValue.controls['email'].setValue(data.email);
  this.formValue.controls['services'].setValue(data.services);
  this.formValue.controls['mobile'].setValue(data.mobile);
  this.formValue.controls['address'].setValue(data.address);
  }

  updateResto(){
    this.restaurantModelObject.name = this.formValue.value.name;
    this.restaurantModelObject.email = this.formValue.value.email;
    this.restaurantModelObject.mobile = this.formValue.value.mobile;
    this.restaurantModelObject.address = this.formValue.value.address;
    this.restaurantModelObject.services = this.formValue.value.services;


    this.api.updateRestaurant(this.restaurantModelObject, this.restaurantModelObject.id).subscribe(res=>{
      let ref=document.getElementById('clear');
    ref?.click();
    this.formValue.reset();
    this.getAllData();
    })
  }

  onSubmit(){
    this.submitted=true;
        this.getAllData();

        if(this.formValue.invalid){
          return
        }
        
  }
}


