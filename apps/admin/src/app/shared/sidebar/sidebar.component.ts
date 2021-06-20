import { Component } from '@angular/core';
import { AuthService } from '@maa/users';

@Component({
  selector: 'hb-admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(private authService: AuthService) {
    // no statement
  }
  openMenu() {
    const x = document.getElementById('myTopnav');
    if (x.className === 'topnav') {
      x.className += ' responsive';
    } else {
      x.className = 'topnav';
    }
  }
  logoutUser() {
    this.authService.logout();
  }
}
