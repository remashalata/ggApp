import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PopoverController, ToastController } from '@ionic/angular';
import { PopoverPage } from '../popover/popover.page';
import { Storage } from '@ionic/storage-angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileForm!: FormGroup;
  isSubmitted = false;
  hasError!: boolean;
  message = "";
  profile: any;
  constructor(
    private fb: FormBuilder,
    public popoverCtrl: PopoverController,
    private storage: Storage,
    public toastController: ToastController,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.profileForm = this.fb.group(
      {
        firstname: new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
      }
    );
    this.getProfile();
  }
  getProfile() {
    this.storage.get('userInformation').then(res => {
      if (res) {
        this.profile = JSON.parse(res);
        this.profileForm.patchValue(this.profile)
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

  handleForm() {
    this.isSubmitted = true;
    this.hasError = false;
    this.message = "";
    if (this.profileForm.valid) {
      this.profile = { ...this.profile, ...this.profileForm.value };
      this.userService.updateProfile(this.profile).subscribe({
        next: async (res: any) => {
          let userName = res.firstname.toUpperCase();
          await this.storage.set("userInformation", JSON.stringify(res));
          this.displayMessageToast(userName);
        },
        error: (e) => {
          this.hasError = true;
          this.message = e.error;
        }
      }

      )

    }
  }

  displayMessageToast(userName: string) {
    this.toastController.create({
      header: 'Profile',
      message: userName + ' Updated Successfully!',
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
}
