import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TabsPillItem {
  id: string | number;
  label: string;
  disabled?: boolean;
}

@Component({
  standalone: true,
  selector: 'ds-tabs-pill',
  imports: [CommonModule],
  templateUrl: './tabs-pill.component.html',
  styleUrl: './tabs-pill.component.scss',
})
export class TabsPillComponent {
  @Input() tabs: TabsPillItem[] = [];
  @Input() activeTabId: string | number | null = null;
  @Input() ariaLabel = 'Navegación por pestañas';

  @Output() tabChange = new EventEmitter<TabsPillItem>();

  selectTab(tab: TabsPillItem): void {
    if (tab.disabled || tab.id === this.activeTabId) return;
    this.activeTabId = tab.id;
    this.tabChange.emit(tab);
  }
}
