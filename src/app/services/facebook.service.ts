import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FacebookLogin, FacebookLoginResponse } from '@capacitor-community/facebook-login';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FacebookService {
  constructor(private plt: Platform, private http: HttpClient) { }





  async getUserProfile() {
    const profile = this.plt.is('hybrid') ? await FacebookLogin.getProfile<{ email: string }>({ fields: ['email'] }) : false
    return profile
  }

  async getCurrentToken() {
    const result = (await FacebookLogin.getCurrentAccessToken())

    console.log(result)

    if (result.accessToken) {
      return true
    }
    else {
      return false
    }
  }

  async getToken() {
    const result = await FacebookLogin.getCurrentAccessToken()
    return result
  }

  /**
   * Facebook login implemented for mobile only
   * @returns
   */
  async loginWithFacebook() {
    if (!this.plt.is('hybrid')) {
      alert('Oops! Use a mobile phone')
      return
    }
    else {
      // login on mobile
      const FACEBOOK_PERMISSIONS = ['email', 'user_birthday', 'user_photos', 'user_gender', 'public_profile'];
      const result = await <FacebookLoginResponse><unknown>FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS });

      if (result.accessToken) {
        return result
      }
    }
  }

  /**
   * Facebook logout
   */
  async logout() {
    return FacebookLogin.logout()
  }


  /**
   * User Data
   */

  async getUserData() {
    const token = await this.getToken()
    const accessToken = token.accessToken
    const url = `https://graph.facebook.com/${accessToken.userId}?fields=id,name,picture.width(720),birthday,email&access_token=${accessToken.token}`;
    return this.http.get(url)
  }
}
