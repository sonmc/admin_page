import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './content.component.html',
})
export class ContentComponent {
  avartar: string = '';
  imagePath: any;
  constructor(
    private authService: AuthService,
    public router: Router,
    private _sanitizer: DomSanitizer
  ) {
    let user = authService.getLocal();
    this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl(
      'data:image/jpg;base64,' + user.avatar
    );
    console.log(this.imagePath);
  }
  logout = () => {
    this.authService.logout();
    this.router.navigate(['/login']);
  };
}
