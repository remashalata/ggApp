import { Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { AuthResponse } from 'src/app/models/auth-response';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {

  isSubmitted = false;
  latitude: any; //latitude
  longitude: any; //longitude
  signupForm!: FormGroup;
  hasError!: boolean;
  isLoading$!: Observable<boolean>;
  message = "";
  @ViewChild('search')
  public searchElementRef!: ElementRef;
  private unsubscribe: Subscription[] = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private authenticateService: AuthenticateService
  ) { }


  ngOnInit() {
    this.signupForm = this.fb.group(
      {
        firstname: new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
        location: new FormControl('', [Validators.required,]),
      }
    );
    this.getMyCurrentCoordinates();
  }

  getMyCurrentCoordinates() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    });
  }

  ngAfterViewInit() {
    // Binding autocomplete to search input control
    let autocomplete = new google.maps.places.Autocomplete(
      this.searchElementRef.nativeElement
    );

    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        
        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }
        
        //set latitude, longitude and zoom
        this.latitude = place.geometry.location?.lat();
        this.longitude = place.geometry.location?.lng();
      });
    });
  }

  handleForm() {
    this.isSubmitted = true;
    this.hasError = false;
    this.message = "";
    if (this.signupForm.valid) {

      this.signupForm.addControl('latitude', new FormControl('', Validators.required));
      this.signupForm.addControl('longitude', new FormControl('', Validators.required));
      this.signupForm.patchValue({
        latitude: this.latitude,
        longitude: this.longitude,
      });
      const signupSubscr = this.authenticateService.register(this.signupForm.value).subscribe({
        next: (user: AuthResponse) => {
          if (user) {
            this.router.navigate(['thankyou']);
          }
        },
        error: (e) => {
          this.hasError = true;
          this.message = e.error;
        }
      });
      this.unsubscribe.push(signupSubscr);
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
