import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { AuthResponse } from 'src/app/models/auth-response';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  isSubmitted = false;
  signinForm!: FormGroup;
  hasError!: boolean;
  message = "";
  private unsubscribe: Subscription[] = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticateService,
    private storage: Storage,
  ) { }

  ngOnInit() {
    this.signinForm = this.fb.group(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
      }
    );
  }

  get f() {
    return this.signinForm.controls;
  }
  
  handleForm() {
    this.isSubmitted = true;
    this.hasError = false;
    if (this.signinForm.valid) {
      
      const signinSubscr = this.authenticateService.login(this.f['email'].value, this.f['password'].value).subscribe({
        next: async (user: AuthResponse) => {
          if (user) {
            console.log(user, user.firstname)
            await this.storage.set("accessToken", user.accessToken);
            await this.storage.set("userInformation", JSON.stringify(user));
            this.router.navigate(['home']);
          }
        },
        error: (e) => {
          this.hasError = true;
          this.message = e.error;
        }
      });
      this.unsubscribe.push(signinSubscr);
    }
  }

}
