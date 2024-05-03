import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from 'src/app/services/auth.service';
import { ApiResponseI } from 'src/app/services/interfaces/shared.interface';
import { UserI } from 'src/app/services/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService,
    private router: Router,
    private _userService: UserService,
    private _localStorageService: LocalStorageService,
    private formBuilder: FormBuilder
  ) { }

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      userPassword: ['', Validators.required]
    });
  }

  public login(): void {
    /** spinner starts on init */
    this.spinner.show();
    this._userService.login(this.loginForm.value).subscribe(
      {
        next: (rs:ApiResponseI<UserI>) => {
          this._localStorageService.saveData("user", rs.data);
          this.spinner.hide();
          this.router.navigateByUrl("/");
        },
        error: (error: HttpErrorResponse) => {
          this.spinner.hide();
        },
        complete: () => {
          alert("complete");
        },
      }
    );
  }
}
