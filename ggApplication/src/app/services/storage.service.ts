import { Injectable, OnInit } from '@angular/core';
import { ToastController } from "@ionic/angular";
import { Storage } from "@ionic/storage-angular";

@Injectable({
  providedIn: 'root'
})
export class StorageService implements OnInit {

  constructor(
    private storage: Storage, 
    private toastContr: ToastController
  ) { }

  async ngOnInit() {
    await this.storage.create();
    this.storage.clear();
  }

  async storeData(key: string, value: string | boolean) {
    try {
      this.storage.set(key, value);
    } catch (err) {
      alert("Error storing data: " + err);
    }
  }

  async getStoredData(key: string) {
    try {
      return this.storage.get(key);
    } catch (err) {
      alert("Error getting stored data: " + err);
      return null;
    }
  }

  async presentToast(message: string) {
		const toast = await this.toastContr.create({
			message,
			position: "middle",
			duration: 2000,
		});
		toast.present();
	}
}
