import type { Meta, StoryObj } from '@storybook/angular';
import { Component } from '@angular/core';

const radiusScale = [
  { token: '--radius-none', value: '0',       px: '0px',     label: 'None',  usage: 'Tablas, layouts' },
  { token: '--radius-sm',   value: '0.125rem', px: '2px',    label: 'SM',    usage: 'Badges, tags pequeños' },
  { token: '--radius-md',   value: '0.375rem', px: '6px',    label: 'MD',    usage: 'Inputs, botones' },
  { token: '--radius-lg',   value: '0.5rem',   px: '8px',    label: 'LG',    usage: 'Cards, panels' },
  { token: '--radius-xl',   value: '0.75rem',  px: '12px',   label: 'XL',    usage: 'Modals, drawers' },
  { token: '--radius-2xl',  value: '1rem',     px: '16px',   label: '2XL',   usage: 'Contenedores grandes' },
  { token: '--radius-full', value: '9999px',   px: '9999px', label: 'Full',  usage: 'Pills, avatares, toggles' },
];

const borderWidths = [
  { token: '--border-width-thin',   value: '1px', label: 'Thin',   usage: 'Bordes por defecto, dividers' },
  { token: '--border-width-medium', value: '2px', label: 'Medium', usage: 'Focus rings, selected states' },
  { token: '--border-width-thick',  value: '4px', label: 'Thick',  usage: 'Acentos, indicadores activos' },
];

const borderColors = [
  { token: '--color-border',         value: '#E5E7EB', label: 'Default',  textDark: true },
  { token: '--color-border-focused', value: '#3B82F6', label: 'Focused' },
  { token: '--color-danger',         value: '#EF4444', label: 'Danger' },
  { token: '--color-success',        value: '#22C55E', label: 'Success' },
];

@Component({
  standalone: true,
  selector: 'story-borders',
  template: `
    <div style="padding: 32px; font-family: sans-serif; min-height: 100vh;">
      <h1 style="font-size: 28px; font-weight: 700; margin: 0 0 8px; color: #111827;">⬜ Border Tokens</h1>
      <p style="color: #6B7280; margin: 0 0 48px;">
        Radios, grosores y colores de borde del sistema.
      </p>

      <!-- Border Radius -->
      <h2 style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #9CA3AF; margin: 0 0 24px;">
        Border Radius
      </h2>
      <div style="display: flex; flex-wrap: wrap; gap: 24px; margin-bottom: 56px; align-items: flex-end;">
        @for (item of radiusScale; track item.token) {
          <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
            <div
              [style.border-radius]="item.value"
              style="width: 80px; height: 80px; background: #3B82F6; opacity: 0.15; border: 2px solid #3B82F6;">
            </div>
            <div style="text-align: center;">
              <div style="font-size: 12px; font-weight: 600; color: #374151;">{{ item.label }}</div>
              <div style="font-size: 11px; color: #9CA3AF;">{{ item.px }}</div>
              <div style="font-size: 10px; color: #D1D5DB; margin-top: 2px; max-width: 90px;">{{ item.usage }}</div>
            </div>
          </div>
        }
      </div>

      <!-- Border Widths -->
      <h2 style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #9CA3AF; margin: 0 0 24px;">
        Border Width
      </h2>
      <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 56px;">
        @for (item of borderWidths; track item.token) {
          <div style="display: flex; align-items: center; gap: 24px; padding-bottom: 16px; border-bottom: 1px solid #F3F4F6;">
            <div style="width: 200px; flex-shrink: 0;">
              <div style="font-size: 12px; font-weight: 500; color: #374151;">{{ item.token }}</div>
              <div style="font-size: 11px; color: #9CA3AF; margin-top: 2px;">{{ item.value }} · {{ item.usage }}</div>
            </div>
            <div
              style="flex: 1; max-width: 320px; height: 40px; border-radius: 8px; background: #F9FAFB;"
              [style.border]="item.value + ' solid #3B82F6'">
            </div>
          </div>
        }
      </div>

      <!-- Border Colors -->
      <h2 style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #9CA3AF; margin: 0 0 24px;">
        Border Colors
      </h2>
      <div style="display: flex; flex-wrap: wrap; gap: 16px;">
        @for (item of borderColors; track item.token) {
          <div style="display: flex; flex-direction: column; gap: 10px; width: 160px;">
            <div
              style="height: 64px; border-radius: 8px; background: #F9FAFB; border: 2px solid;"
              [style.border-color]="item.value">
            </div>
            <div>
              <div style="font-size: 12px; font-weight: 600; color: #374151;">{{ item.label }}</div>
              <div style="font-size: 11px; color: #9CA3AF;">{{ item.token }}</div>
              <div
                style="display: inline-block; font-size: 10px; padding: 2px 6px; border-radius: 4px; margin-top: 4px; font-weight: 500;"
                [style.background]="item.value"
                [style.color]="item.textDark ? '#111827' : '#ffffff'">
                {{ item.value }}
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
class BordersDocComponent {
  radiusScale = radiusScale;
  borderWidths = borderWidths;
  borderColors = borderColors;
}

const meta: Meta<BordersDocComponent> = {
  title: 'Tokens/Borders',
  component: BordersDocComponent,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<BordersDocComponent>;

export const Estilos: Story = {};
