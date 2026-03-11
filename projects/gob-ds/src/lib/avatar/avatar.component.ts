import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  standalone: true,
  selector: 'sf-avatar',
  imports: [CommonModule],
  styleUrl: './avatar.scss',
  template: `
    <div [class]="avatarClasses" [attr.aria-label]="name">
      @if (src && !imgError) {
        <img
          class="avatar__image"
          [src]="src"
          [alt]="name"
          (error)="onImageError()"
        />
      } @else {
        <span class="avatar__initials">{{ initials }}</span>
      }
    </div>
  `,
})
export class AvatarComponent implements OnChanges {
  @Input() name = '';
  @Input() src?: string;
  @Input() size: AvatarSize = 'md';

  initials = '';
  imgError = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['name']) {
      this.initials = this.getInitials(this.name);
    }
    if (changes['src']) {
      this.imgError = false;
    }
  }

  onImageError(): void {
    this.imgError = true;
  }

  get avatarClasses(): string {
    return `avatar avatar--${this.size}`;
  }

  private getInitials(name: string): string {
    if (!name) return '';
    const words = name.trim().split(/\s+/);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return words[0].substring(0, 2).toUpperCase();
  }
}
