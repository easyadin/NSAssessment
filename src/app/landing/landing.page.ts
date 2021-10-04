import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookService } from '../services/facebook.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(private fbService: FacebookService, private router: Router) { }

  profileImage = "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg"
  email
  name

  userDataSubscription

  async ngOnInit() {
    this.userDataSubscription = (await this.fbService.getUserData()).subscribe((res: any) => {
      console.log(res)
      this.name = res.name.split(' ')[0];
      this.profileImage = res.picture.data.url
    })
  }

  onFacebookLogout() {
    this.fbService.logout().then(res => {
      this.router.navigateByUrl('/login')
    })
  }
}
