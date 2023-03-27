import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-place-events-add',
  templateUrl: './place-events-add.page.html',
  styleUrls: ['./place-events-add.page.scss'],
})
export class PlaceEventsAddPage {
  placeForm!: FormGroup;
  isSubmitted = false;
  hasError!: boolean;
  message = "";
  latitude!: any;
  longitude!: any;
  locationString!: any;
  type!: string;
  startDate = new Date().toISOString();
  endDate = new Date().toISOString();
  @ViewChild('search')
  public searchElementRef!: ElementRef;
  constructor(
    private fb: FormBuilder,
    private ngZone: NgZone, 
    private eventService: EventService,
    public toastController: ToastController,
    private route: ActivatedRoute,
  ) { }

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
        this.locationString = place.formatted_address;
      });
    });
  }

  ngOnInit() {
    this.route.params.subscribe(async () => {
      this.placeForm = this.fb.group(
        {
          name: new FormControl('', [Validators.required]),
          type: new FormControl('', [Validators.required]),
          startDate: new FormControl(this.startDate, [Validators.required]),
          endDate: new FormControl(this.endDate, [Validators.required]),
          description: new FormControl('', [Validators.required]),
          location: new FormControl('', [Validators.required,]),
        }
      );
    })
    
  }
  handleStartDateChange(event: any) {
    this.startDate = new Date(event.target.value).toISOString()
  }

  handleEndDateChange(event: any) {
    this.endDate = new Date(event.target.value).toISOString()
  }

  typeChange(event:any) {
    this.type = event.target.value;
  }

  handleForm() {
    this.isSubmitted = true;
    this.hasError = false;
    this.message = "";
    this.placeForm.addControl('latitude', new FormControl('', Validators.required));
    this.placeForm.addControl('longitude', new FormControl('', Validators.required));
    this.placeForm.patchValue({
      latitude: this.latitude,
      longitude: this.longitude,
      location: this.locationString
    });
    if (this.placeForm.valid){
      if (this.startDate >= this.endDate) {
        let message = "Start Date is greater than End Date!"
        this.displayErrorMessageToast(message)
        return;
      } 
      this.eventService.addPlace(this.placeForm.value).subscribe({
        next: async (res: any) => {
          if(res) {
            this.displayMessageToast();
          }
        },
        error: (e) => {
          this.hasError = true;
          this.message = e.error;
          this.displayErrorMessageToast(this.message);
        }
      })
    }
  }

  displayMessageToast() {
    this.toastController.create({
      header: 'Place',
      message: 'Created Place Successfully!',
      position: 'top',
      cssClass: 'toast-custom-class',
      buttons: [
        {
          side: 'end',
          text: 'Close',
          role: 'cancel',
          handler: () => {
            console.log('');
          }
        }
      ]
    }).then((toast) => {
      toast.present();
    });
  }

  displayErrorMessageToast(message: string) {
    this.toastController.create({
      header: 'Place',
      message: message,
      position: 'top',
      cssClass: 'toast-error-class',
      buttons: [
        {
          side: 'end',
          text: 'Close',
          role: 'cancel',
          handler: () => {
            console.log('');
          }
        }
      ]
    }).then((toast) => {
      toast.present();
    });
  }
}
