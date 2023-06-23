import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { personService } from '../services/personService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page-guest',
  templateUrl: './login-page-guest.component.html',
  styleUrls: ['./login-page-guest.component.css']
})
export class LoginPageGuestComponent {
  public loginForm!: FormGroup;

  constructor(private personService: personService, private router: Router, private formBuilder:FormBuilder){
    this.loginForm = formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login(){
    if(!this.loginForm.valid){
      alert("Both username and password are mandatory!");
      return;
    }else{
      var username= this.loginForm.get('username')!.value;
      var password = this.loginForm.get('password')!.value;

      this.personService.login(username, password).subscribe((res)=>{
        console.log(res);
        if(res.message!='Wrong username or password!'){
          alert(res.message);
          this.personService.setSessionData(res);
          this.router.navigate(['/pets']);
        }else{
          alert("Wrong username or password!");
          return;
        }
      })
    }
  }
}
