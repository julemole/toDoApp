import { Injectable } from '@angular/core';
import { FirebaseRemoteConfig } from '@capacitor-firebase/remote-config';

@Injectable({
  providedIn: 'root',
})
export class RemoteConfigService {

  private readonly feature_flag = false;

  constructor() {}

  async getFeatureFlag(flagName: string): Promise<boolean> {
    try {
      // Sincroniza y activa los valores remotos
      await FirebaseRemoteConfig.fetchAndActivate();

      // Obtiene el valor como booleano
      const result = await FirebaseRemoteConfig.getBoolean({ key: flagName });
      return result.value; // Devuelve el valor como un booleano
    } catch (error) {
      console.error('Error fetching Remote Config:', error);
      return false; // Valor predeterminado en caso de error
    }
  }

  async getFirebaseFlag(): Promise<boolean> {
    try {
      const flag = await FirebaseRemoteConfig.getBoolean({ key: 'feature_flag' });
      console.log('Flag value:', flag.value);
      return flag.value ? flag.value : this.feature_flag
    } catch (e: any) {
      console.error(e.message);
      return this.feature_flag;
    }
  }
}
