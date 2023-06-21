
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup ,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;


  constructor(private FormBuilder: FormBuilder, private _http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.FormBuilder.group({
      email: ['',[Validators.email, Validators.required]],
      password: ['',[ Validators.required]],
    })
  }

  logIn(){
    this._http.get<any>("http://localhost:4200/signup").subscribe(res => {
    
    const user = res.find((a:any)=>{
      return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password


    })
    if(user) {
      this.router.navigate(['restaurant']);
      this.loginForm.reset();
    }
    else{
      alert('User not found. Try Again!');
      this.loginForm.reset();
    }
     
      
    }, err =>{
      alert('Registration failed');
    }
    )
  }

//  
}