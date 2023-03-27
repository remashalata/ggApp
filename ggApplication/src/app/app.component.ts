import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ThemeService } from './services/theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  userRole: any;
  darkMode!: boolean;
  public menuCtrl!: MenuController;
  constructor(
    public themeService: ThemeService,
    private storage: Storage,
    private router: Router,
  ) {}


  async ngOnInit() {
    await this.storage.create();
    this.getUserInformation();
    console.log(this.userRole);
    // this.storage.clear();
  }

  async closeMenu(event: any) {
    await this.menuCtrl.close();
  }

  getUserInformation() {
    this.storage.get('userInformation').then(res => {
      if (res) {
        let userInformation = JSON.parse(res);
        this.userRole = userInformation.role;
      }
    });
  }

  logout() {
    this.storage.clear();
    this.router.navigate(['signin']);
  }
}
