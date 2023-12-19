import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserserviceService } from './services/userservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private snack:MatSnackBar,private router:Router,private _user:UserserviceService) { }
  userData={
    phone:'',
    name:'',
    batchid:'',
    age:'',
    upiid:'',
    

  }
  b:any = false;
  
  formSubmit(){
    
    if(parseInt(this.userData.age)<18 || parseInt( this.userData.age)>65){
      this.snack.open("Age should be between 18 and 65",'', { duration: 3000 });
      return;
    }
    if(this.userData.phone.trim().length!=10){
      this.snack.open("Enter correct phone number",'', { duration: 3000 });
      return;
    }
    if(!/^[\w.-]+@[\w.-]+$/.test(this.userData.upiid.trim())){
      this.snack.open("Enter correct UPI id",'', { duration: 3000 });
      return;
    }
    this.b=true;
    this._user.submitApp(this.userData).subscribe((response)=>{ 
      
      
      
      if(response.status==202)
      this.b=false;
      this.snack.open("Application Submitted Successfully",'', { duration: 3000 });
      
    },(error)=>{
      this.b=false;
      if(error.status==302){
        this.snack.open("Application Already Exists",'', { duration: 3000 });
      }
      if(error.status==500)
        this.snack.open("Payment service not working",'', { duration: 3000 });
      
    })

  }
  
  ngOnInit(): void {
      
  }
  
}
