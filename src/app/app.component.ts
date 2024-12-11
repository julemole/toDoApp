import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { StorageService } from './services/storage.service';
import { FirebaseRemoteConfig } from '@capacitor-firebase/remote-config';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(private readonly storageService: StorageService) {
    this.initApp();
  }

  async ngOnInit() {
    await this.fetchAndActivateFirebaseConfig();
  }

  async initApp() {
    if(await this.storageService.isDbReady()){
      return;
    }
    await this.storageService.initilizPlugin();
  }

  private async fetchAndActivateFirebaseConfig() {
    try {
      await FirebaseRemoteConfig.fetchConfig({
        minimumFetchIntervalInSeconds: 3600,
      });

      await FirebaseRemoteConfig.activate();

      console.log('Remote Config fetched and activated');
    } catch (e: any) {
      console.error(e.message);
    }
  }

}
