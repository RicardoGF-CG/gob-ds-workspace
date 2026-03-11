import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Menu, X, Bell } from 'lucide-angular';
import { AvatarComponent } from '../avatar/avatar.component';

export interface NavbarMenuItem {
  label?: string;
  icon?: any;
  action?: () => void;
  id?: string;
}

@Component({
  standalone: true,
  selector: 'sf-navbar',
  imports: [CommonModule, LucideAngularModule, AvatarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.scss',
})
export class NavbarComponent {
  /** Logo source URL */
  @Input() logoSrc?: string;

  /** Menu items for the left section (Desktop) */
  @Input() leftMenuItems: NavbarMenuItem[] = [];

  /** Menu items for the right section (Desktop, left of avatar) */
  @Input() rightMenuItems: NavbarMenuItem[] = [];

  /** User name for the avatar */
  @Input() userName = '';

  /** User avatar source URL */
  @Input() userAvatar?: string;

  /** System Name */
  @Input() systemName: string = '';

  /** Event emitted when a menu item is clicked */
  @Output() menuItemClick = new EventEmitter<NavbarMenuItem>();

  isMobileMenuOpen = false;

  readonly Menu = Menu;
  readonly X = X;
  readonly Bell = Bell;

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  onItemClick(item: NavbarMenuItem): void {
    if (item.action) {
      item.action();
    }
    this.menuItemClick.emit(item);
    this.closeMobileMenu();
  }
}
