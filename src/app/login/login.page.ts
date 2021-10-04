import { Router } from '@angular/router';
import { FacebookService } from './../services/facebook.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private fbService: FacebookService, private router: Router) {
    // Navigate to main page if user logged
    this.fbService.getCurrentToken().then(res => {
      if (res) {
        this.router.navigateByUrl('/landing')
      }
    })
  }

  ngOnInit() { }

  onFacebookLogin() {
    this.fbService.loginWithFacebook().then(res => {
      console.log(res)
      this.router.navigate(['/landing'])
    })
  }

}
