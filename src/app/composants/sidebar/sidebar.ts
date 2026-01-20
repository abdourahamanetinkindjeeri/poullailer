import { Component, Input } from '@angular/core';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { Router } from '@angular/router';

export interface Menu {
  id: string;
  titre: string;
  icon: string;
  url?: string;
  active?: boolean;
  open?: boolean;
  sousMenu?: Menu[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIf, NgFor, NgClass],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar {
  @Input() collapsed = false;
  isMobileOpen = false;

  menuList: Menu[] = [
    { id: '1', titre: 'Dashboard', icon: 'fas fa-home', url: 'dashboard', active: true },
    {
      id: '2',
      titre: 'Enclos',
      icon: 'fas fa-box',
      open: false,
      sousMenu: [
        { id: '2-1', titre: 'Ajouter enclos', icon: 'fas fa-plus', url: 'enclos/add-enclos' },
        { id: '2-2', titre: 'Liste produits', icon: 'fas fa-list', url: 'enclos' }
      ]
    },
    {
      id: '3',
      titre: 'Stock',
      icon: 'fas fa-warehouse',
      open: false,
      sousMenu: [
        { id: '3-1', titre: 'Ajouter stock', icon: 'fas fa-plus', url: 'stock/add-stock' },
        { id: '3-2', titre: 'Liste stock', icon: 'fas fa-list', url: 'stock' }
      ]
    },
    { id: '4', titre: 'Commandes', icon: 'fas fa-shopping-cart', url: '/commandes' },
    { id: '5', titre: 'Ventes', icon: 'fas fa-shopping-cart', url: '/ventes' }
  ];

  private lastSelectedMenu: Menu | undefined;

  constructor(private router: Router) {}

  toggleMenu(menu: Menu) {
    menu.open = !menu.open;
  }

  toggleSidebarMobile() {
    this.isMobileOpen = !this.isMobileOpen;
  }

  navigate(menu: Menu): void {
    if (this.lastSelectedMenu) {
      this.lastSelectedMenu.active = false;
    }
    menu.active = true;
    this.lastSelectedMenu = menu;
    if (menu.url) {
      this.router.navigate([menu.url]);
    }
    this.isMobileOpen = false;
  }
}
