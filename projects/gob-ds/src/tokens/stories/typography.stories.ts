import type { Meta, StoryObj } from '@storybook/angular';
import { Component } from '@angular/core';

const typeScale = [
  { token: '--font-size-xs',  size: '0.75rem',  px: '12px', label: 'XS - Caption' },
  { token: '--font-size-sm',  size: '0.875rem', px: '14px', label: 'SM - Body small' },
  { token: '--font-size-md',  size: '1rem',     px: '16px', label: 'MD - Body (base)' },
  { token: '--font-size-lg',  size: '1.125rem', px: '18px', label: 'LG - Body large' },
  { token: '--font-size-xl',  size: '1.25rem',  px: '20px', label: 'XL - Subtitle' },
  { token: '--font-size-2xl', size: '1.5rem',   px: '24px', label: '2XL - Heading S' },
  { token: '--font-size-3xl', size: '1.875rem', px: '30px', label: '3XL - Heading M' },
  { token: '--font-size-4xl', size: '2.25rem',  px: '36px', label: '4XL - Heading L' },
];

const weights = [
  { token: '--font-weight-regular',  value: '400', label: 'Regular' },
  { token: '--font-weight-medium',   value: '500', label: 'Medium' },
  { token: '--font-weight-semibold', value: '600', label: 'Semibold' },
  { token: '--font-weight-bold',     value: '700', label: 'Bold' },
];

@Component({
  standalone: true,
  selector: 'story-typography',
  template: `
    <div style="padding: 32px; font-family: sans-serif; max-width: 800px;">
      <h1 style="font-size: 28px; font-weight: 700; margin: 0 0 8px;">✍️ Typography Tokens</h1>
      <p style="color: #6B7280; margin: 0 0 40px;">Escala tipográfica y pesos del sistema.</p>

      <h2 style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #9CA3AF; margin: 0 0 20px;">Escala de tamaños</h2>
      <div style="display: flex; flex-direction: column; gap: 20px; margin-bottom: 48px;">
        @for (item of typeScale; track item.token) {
          <div style="display: flex; align-items: baseline; gap: 24px; padding-bottom: 20px; border-bottom: 1px solid #F3F4F6;">
            <div style="width: 220px; flex-shrink: 0;">
              <div style="font-size: 11px; color: #9CA3AF;">{{ item.token }}</div>
              <div style="font-size: 11px; color: #D1D5DB;">{{ item.size }} · {{ item.px }}</div>
            </div>
            <div [style.font-size]="item.size" style="color: #111827; line-height: 1.2;">
              {{ item.label }}
            </div>
          </div>
        }
      </div>

      <h2 style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #9CA3AF; margin: 0 0 20px;">Font Weights</h2>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        @for (w of weights; track w.token) {
          <div style="display: flex; align-items: center; gap: 24px; padding-bottom: 16px; border-bottom: 1px solid #F3F4F6;">
            <div style="width: 220px; flex-shrink: 0;">
              <div style="font-size: 11px; color: #9CA3AF;">{{ w.token }}</div>
              <div style="font-size: 11px; color: #D1D5DB;">{{ w.value }}</div>
            </div>
            <div [style.font-weight]="w.value" style="font-size: 20px; color: #111827;">
              {{ w.label }} — The quick brown fox
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
class TypographyDocComponent {
  typeScale = typeScale;
  weights = weights;
}

const meta: Meta<TypographyDocComponent> = {
  title: 'Tokens/Typography',
  component: TypographyDocComponent,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<TypographyDocComponent>;

export const Escala: Story = {};