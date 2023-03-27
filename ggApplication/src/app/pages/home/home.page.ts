import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import {
  GoogleMap,
  MapInfoWindow,
  MapGeocoder,
  MapGeocoderResponse,
} from '@angular/google-maps';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { EventService } from 'src/app/services/event.service';
import { PopoverPage } from '../popover/popover.page';
import { Storage } from '@ionic/storage-angular';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  @ViewChild('search')
  public searchElementRef!: ElementRef;
  @ViewChild('myGoogleMap', { static: false })
  map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false })
  info!: MapInfoWindow;
  address = '';
  latitude!: any;
  longitude!: any;
  zoom = 12;
  maxZoom = 15;
  minZoom = 8;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'roadmap',
    fullscreenControl: true,
  };
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;
  markers = [] as any;
  userRole: any;
  notificationList: any = [];
  constructor(
    private ngZone: NgZone,
    private geoCoder: MapGeocoder,
    private eventService: EventService,
    public popoverCtrl: PopoverController,
    private router: Router,
    private storage: Storage,
    private notifictionService: NotificationService
  ) { }

  ngAfterViewInit() {
    // Binding autocomplete to search input control
    let autocomplete = new google.maps.places.Autocomplete(
      this.searchElementRef.nativeElement
    );
    // Align search box to center
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
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

        // Set marker position
        this.setMarkerPosition(this.latitude, this.longitude);

        this.center = {
          lat: this.latitude,
          lng: this.longitude,
        };
      });
    });
  }

  ngOnInit() {
    this.getUserInformation();
    this.getNotifications();
    var options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };
    var successHandler = (position: any) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.setMarkerPosition(this.latitude, this.longitude);
    };

    var errorHandler = function (errorObj: any) {
      console.log(errorObj.code + ": " + errorObj.message);

    };
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, options);
    this.getEventLocation();
  }

  getNotifications() {
    this.notifictionService.getNotifications().subscribe({
      next: (res) => {
        this.notificationList = res.newNotifications;
      },
      error: (e) => {
        console.log(e.error)
      }
    })
  }

  getUserInformation() {
    this.storage.get('userInformation').then(res => {
      if (res) {
        let userInformation = JSON.parse(res);
        this.userRole = userInformation.role;
      }
    });
  }

  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event: event,
    });
    await popover.present();
  }

  openInfoWindow(eventId: string) {
    if (eventId) {
      this.router.navigate([`event-detail/${eventId}`]);
    }
  }
  getEventLocation() {
    var iconBase = 'http://maps.google.com/mapfiles/kml/pal2/';
    this.eventService.getEventLocations().subscribe((res) => {
      res.map((subres) => {
        this.markers.push({
          position: {
            lat: subres.latitude,
            lng: subres.longitude,
          },
          label: subres.name.toUpperCase(),
          eventId: subres._id,
          options: {
            animation: google.maps.Animation.DROP,
            icon: iconBase + 'icon49.png',
            draggable: true,
          },
        });
      });
    });
  }

  setMarkerPosition(latitude: any, longitude: any) {
    // Set marker position
    this.markers = [
      {
        position: {
          lat: latitude,
          lng: longitude,
        },
        label: "Me",
        options: {
          animation: google.maps.Animation.DROP,
          draggable: true,
        },
      },
    ];
  }

  eventHandler(event: any, name: string) {
    switch (name) {
      case 'mapDblclick': // Add marker on double click event
        break;

      case 'mapDragMarker':
        break;

      case 'mapDragend':
        if (event) {
          console.log(event.latLng.lat(), event.latLng.lng());
          this.getAddress(event.latLng.lat(), event.latLng.lng());
        }

        break;

      default:
        break;
    }
  }

  getAddress(latitude: any, longitude: any) {
    this.geoCoder
      .geocode({ location: { lat: latitude, lng: longitude } })
      .subscribe((addr: MapGeocoderResponse) => {
        if (addr.status === 'OK') {
          if (addr.results[0]) {
            this.zoom = 12;
            this.address = addr.results[0].formatted_address;
          } else {
            this.address = "";
            window.alert('No results found');
          }
        } else {
          this.address = "";
          window.alert('Geocoder failed due to: ' + addr.status);
        }
      });
  }

}
