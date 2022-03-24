import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';



@Component({
selector:'app-buy',
templateUrl:'./form.component.html',
styleUrls:['./form.component.css']
})

export class FormComponent implements OnInit,OnDestroy{
    isLoading=false;
 


   ngOnInit(){
 
  
   
   }

   onLogin(form:NgForm){
   if(form.invalid){ return;}
   this.isLoading=true;
    // this.authService.login(form.value.email,form.value.password);
    }
 ngOnDestroy(){
    //  this.authStatusSubs.unsubscribe();
 }


}