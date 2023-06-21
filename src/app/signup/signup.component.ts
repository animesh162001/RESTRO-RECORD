import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import{Router}from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  submitted=false;
  
  
  
  constructor(private FormBuilder:FormBuilder, private _http: HttpClient, private router: Router){

  }

  ngOnInit(){
    this.signupForm = this.FormBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['', [Validators.required,Validators.email]],
      
      mobile: ['',[Validators.required,Validators.pattern("(^(\\+91-?)|0)?[0-9]{10}$")]],
      
      password: ['', [Validators.required, Validators.minLength(8)]]
      
    })
  }

  signUp(){
    this._http.post<any>("http://localhost:4200/signup", this.signupForm.value).subscribe(res => {
      
      this.signupForm.reset();
      this.router.navigate(['login']);
    }, err =>{
      alert('Registration failed');
    }
    )
  }

  onSubmit(){
    this.submitted=true;


        

        if(this.signupForm.invalid){
          return
        }

        
        
  }

  
}

