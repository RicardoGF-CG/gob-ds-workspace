import type { Meta, StoryObj } from '@storybook/angular';
import { Component } from '@angular/core';

const colorGroups = [
  {
    name: 'Primarios',
    tokens: [
      { name: '--color-blue-50',  value: '#EFF6FF', textDark: true },
      { name: '--color-blue-100', value: '#DBEAFE', textDark: true },
      { name: '--color-blue-500', value: '#3B82F6' },
      { name: '--color-blue-600', value: '#2563EB' },
      { name: '--color-blue-700', value: '#1D4ED8' },
    ],
  },
  {
    name: 'Grises',
    tokens: [
      { name: '--color-gray-50',  value: '#F9FAFB', textDark: true },
      { name: '--color-gray-100', value: '#F3F4F6', textDark: true },
      { name: '--color-gray-200', value: '#E5E7EB', textDark: true },
      { name: '--color-gray-400', value: '#9CA3AF', textDark: true },
      { name: '--color-gray-600', value: '#4B5563' },
      { name: '--color-gray-800', value: '#1F2937' },
      { name: '--color-gray-900', value: '#111827' },
    ],
  },
  {
    name: 'Semánticos',
    tokens: [
      { name: '--color-danger',  value: '#EF4444' },
      { name: '--color-success', value: '#22C55E' },
      { name: '--color-warning', value: '#FACC15', textDark: true },
    ],
  },
];

@Component({
  standalone: true,
  selector: 'story-colors',
  template: `
    <div style="padding: 32px; font-family: sans-serif;">
      <h1 style="font-size: 28px; font-weight: 700; margin: 0 0 8px;">🎨 Color Tokens</h1>
      <p style="color: #6B7280; margin: 0 0 40px;">
        Usá siempre los tokens CSS en lugar de valores directos. Ejemplo: <code style="background:#F3F4F6; padding: 2px 6px; border-radius: 4px;">color: var(--color-primary)</code>
      </p>

      @for (group of colorGroups; track group.name) {
        <div style="margin-bottom: 40px;">
          <h2 style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #9CA3AF; margin: 0 0 16px;">
            {{ group.name }}
          </h2>
          <div style="display: flex; flex-wrap: wrap; gap: 12px;">
            @for (token of group.tokens; track token.name) {
              <div style="display: flex; flex-direction: column; width: 140px;">
                <div
                  [style.background]="token.value"
                  [style.color]="token.textDark ? '#111827' : '#ffffff'"
                  style="height: 80px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.07); display: flex; align-items: flex-end; padding: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
                  <span style="font-size: 11px; font-weight: 500; opacity: 0.8;">{{ token.value }}</span>
                </div>
                <span style="font-size: 12px; color: #374151; margin-top: 8px; word-break: break-all;">{{ token.name }}</span>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
})
class ColorsDocComponent {
  colorGroups = colorGroups;
}

const meta: Meta<ColorsDocComponent> = {
  title: 'Tokens/Colors',
  component: ColorsDocComponent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Paleta de colores del sistema de diseño.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ColorsDocComponent>;

export const Paleta: Story = {};