import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, CheckCircle2, AlertCircle } from 'lucide-angular';

export type TabStatus = 'default' | 'completed' | 'error';

export interface TabItem {
  id: string | number;
  label: string;
  disabled?: boolean;
  status?: TabStatus;
}

@Component({
  standalone: true,
  selector: 'sf-tabs',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class TabsComponent {
  @Input() tabs: TabItem[] = [];
  @Input() activeTabId: string | number | null = null;
  @Input() fullWidth = false;

  @Output() tabChange = new EventEmitter<TabItem>();

  readonly checkIcon = CheckCircle2;
  readonly errorIcon = AlertCircle;

  selectTab(tab: TabItem): void {
    if (tab.disabled) return;
    this.activeTabId = tab.id;
    this.tabChange.emit(tab);
  }

  getTabClasses(tab: TabItem): any {
    return {
      'tabs__item': true,
      'tabs__item--active': this.activeTabId === tab.id,
      'tabs__item--disabled': tab.disabled,
      'tabs__item--completed': tab.status === 'completed',
      'tabs__item--error': tab.status === 'error',
      'tabs__item--active-completed': this.activeTabId === tab.id && tab.status === 'completed',
      'tabs__item--active-error': this.activeTabId === tab.id && tab.status === 'error',
    };
  }
}
