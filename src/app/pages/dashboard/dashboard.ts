import { Component } from '@angular/core';
import {Sidebar} from '../../composants/sidebar/sidebar';
import {Content} from '../../composants/content/content';
import {Footer} from '../../composants/footer/footer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  imports: [
    Sidebar,
    Content,
    Footer
  ],
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  collapsed = false;
  isMobileOpen = false;
  theme: 'dark' | 'light' = 'dark';

  toggleSidebarMobile() {
    this.isMobileOpen = !this.isMobileOpen;
  }

  toggleSidebarDesktop() {
    this.collapsed = !this.collapsed;
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.theme);
  }
}
