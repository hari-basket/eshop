import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'maa-users-login',
  templateUrl: './login.component.html',
  styles: [
    `
      .login-register {
        background-image: linear-gradient(235deg, #565867, #191a25);
        height: 100vh;
      }
      .login-register-panel {
        width: 650px;
        height: 525px;
        background-color: var(--surface-a);
        position: absolute;
        left: calc(50% - 325px);
        top: calc(50% - 260px);
      }
      .login-register-panel .full-btn {
        width: 100%;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or Password are wrong';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private localstorageService: LocalstorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.loginFormGroup.invalid) return;

    this.auth
      .login(this.loginForm.email.value, this.loginForm.password.value)
      .subscribe(
        (user) => {
          this.authError = false;
          this.localstorageService.setToken(user.token);
          this.router.navigate(['/']);
        },
        (error: HttpErrorResponse) => {
          this.authError = true;
          if (error.status !== 400) {
            this.authMessage = 'Error in the Server, please try again later!';
          }
        }
      );
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }
}