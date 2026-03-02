import type { Meta, StoryObj } from '@storybook/angular';
import { Component } from '@angular/core';

const spacingScale = [
  { token: '--space-1',  value: '0.25rem', px: 4 },
  { token: '--space-2',  value: '0.5rem',  px: 8 },
  { token: '--space-3',  value: '0.75rem', px: 12 },
  { token: '--space-4',  value: '1rem',    px: 16 },
  { token: '--space-5',  value: '1.25rem', px: 20 },
  { token: '--space-6',  value: '1.5rem',  px: 24 },
  { token: '--space-8',  value: '2rem',    px: 32 },
  { token: '--space-10', value: '2.5rem',  px: 40 },
  { token: '--space-12', value: '3rem',    px: 48 },
  { token: '--space-16', value: '4rem',    px: 64 },
];

@Component({
  standalone: true,
  selector: 'story-spacing',
  template: `
    <div style="padding: 32px; font-family: sans-serif;">
      <h1 style="font-size: 28px; font-weight: 700; margin: 0 0 8px;">📐 Spacing Tokens</h1>
      <p style="color: #6B7280; margin: 0 0 40px;">Sistema de espaciado basado en múltiplos de 4px.</p>

      <div style="display: flex; flex-direction: column; gap: 12px;">
        @for (item of spacingScale; track item.token) {
          <div style="display: flex; align-items: center; gap: 20px;">
            <div style="width: 180px; flex-shrink: 0;">
              <div style="font-size: 12px; font-weight: 500; color: #374151;">{{ item.token }}</div>
              <div style="font-size: 11px; color: #9CA3AF;">{{ item.value }} · {{ item.px }}px</div>
            </div>
            <div
              [style.width.px]="item.px"
              style="height: 24px; background: #3B82F6; border-radius: 4px; flex-shrink: 0;">
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
class SpacingDocComponent {
  spacingScale = spacingScale;
}

const meta: Meta<SpacingDocComponent> = {
  title: 'Tokens/Spacing',
  component: SpacingDocComponent,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<SpacingDocComponent>;

export const Escala: Story = {};
