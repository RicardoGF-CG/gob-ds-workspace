import type { Meta, StoryObj } from '@storybook/angular';
import { Component } from '@angular/core';

const shadowScale = [
  {
    token: '--shadow-xs',
    value: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    label: 'XS',
    usage: 'Tooltips, badges',
  },
  {
    token: '--shadow-sm',
    value: '0 1px 3px 0 rgb(0 0 0 / 0.10), 0 1px 2px -1px rgb(0 0 0 / 0.10)',
    label: 'SM',
    usage: 'Botones, inputs',
  },
  {
    token: '--shadow-md',
    value: '0 4px 6px -1px rgb(0 0 0 / 0.10), 0 2px 4px -2px rgb(0 0 0 / 0.10)',
    label: 'MD',
    usage: 'Cards, dropdowns',
  },
  {
    token: '--shadow-lg',
    value: '0 10px 15px -3px rgb(0 0 0 / 0.10), 0 4px 6px -4px rgb(0 0 0 / 0.10)',
    label: 'LG',
    usage: 'Modals, popovers',
  },
  {
    token: '--shadow-xl',
    value: '0 20px 25px -5px rgb(0 0 0 / 0.10), 0 8px 10px -6px rgb(0 0 0 / 0.10)',
    label: 'XL',
    usage: 'Drawers, sidebars',
  },
  {
    token: '--shadow-inner',
    value: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    label: 'Inner',
    usage: 'Inputs activos, wells',
  },
  {
    token: '--shadow-none',
    value: '0 0 #0000',
    label: 'None',
    usage: 'Reset explícito',
  },
];

@Component({
  standalone: true,
  selector: 'story-shadows',
  template: `
    <div style="padding: 32px; font-family: sans-serif; background: #F9FAFB; min-height: 100vh;">
      <h1 style="font-size: 28px; font-weight: 700; margin: 0 0 8px; color: #111827;">🌑 Shadow Tokens</h1>
      <p style="color: #6B7280; margin: 0 0 40px;">
        Elevación y profundidad. Usá sombras más grandes para elementos que flotan sobre el contenido.
      </p>

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 32px;">
        @for (item of shadowScale; track item.token) {
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div
              [style.box-shadow]="item.value"
              style="background: #ffffff; border-radius: 12px; height: 100px; display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 18px; font-weight: 700; color: #D1D5DB;">{{ item.label }}</span>
            </div>
            <div>
              <div style="font-size: 12px; font-weight: 600; color: #374151;">{{ item.token }}</div>
              <div style="font-size: 11px; color: #9CA3AF; margin-top: 2px;">{{ item.usage }}</div>
              <code style="font-size: 10px; color: #6B7280; margin-top: 6px; display: block; word-break: break-all; line-height: 1.5;">
                {{ item.value }}
              </code>
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
class ShadowsDocComponent {
  shadowScale = shadowScale;
}

const meta: Meta<ShadowsDocComponent> = {
  title: 'Tokens/Shadows',
  component: ShadowsDocComponent,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<ShadowsDocComponent>;

export const Elevacion: Story = {};