import type { Meta, StoryObj } from '@storybook/angular';
import { ArrowRight, Trash2, Plus, GitBranch } from 'lucide-angular';
import { ButtonComponent } from '../../lib/button/button.component';


const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Base action component of the design system.

| Prop | Type | Values |
|------|------|---------|
| \`variant\` | enum | \`primary\` \`secondary\` \`outline\` \`ghost\` \`destructive\` \`link\` |
| \`size\` | enum | \`sm\` \`md\` \`lg\` |
| \`disabled\` | boolean | — |
| \`loading\` | boolean | — |
| \`fullWidth\` | boolean | — |
| \`iconPosition\` | enum | \`left\` \`right\` \`only\` |
| \`asTag\` | element | \`button\` \`a\` |
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'destructive', 'link'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    iconPosition: {
      control: 'radio',
      options: [null, 'left', 'right', 'only'],
    },
    asTag: {
      control: 'radio',
      options: ['button', 'a'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

// ── Playground ─────────────────────────────────────────────────
export const Playground: Story = {
  args: { variant: 'primary', size: 'md', disabled: false, loading: false },
  render: (args) => ({
    props: args,
    template: `<ds-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading">Guardar cambios</ds-button>`,
  }),
};

// ── Variants ───────────────────────────────────────────────────
export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-wrap:wrap; align-items:center; gap:12px;">
        <ds-button variant="primary">Primary</ds-button>
        <ds-button variant="secondary">Secondary</ds-button>
        <ds-button variant="outline">Outline</ds-button>
        <ds-button variant="ghost">Ghost</ds-button>
        <ds-button variant="destructive">Destructive</ds-button>
        <ds-button variant="link">Link</ds-button>
      </div>
    `,
  }),
};

// ── Sizes ──────────────────────────────────────────────────────
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex; align-items:center; gap:12px;">
        <ds-button size="sm">Small</ds-button>
        <ds-button size="md">Default</ds-button>
        <ds-button size="lg">Large</ds-button>
      </div>
    `,
  }),
};

// ── With Icons ───────────────────────────────────────────────
export const WithIcons: Story = {
  render: () => ({
    props: { ArrowRight, Plus, Trash2, GitBranch },
    template: `
      <div style="display:flex; flex-wrap:wrap; align-items:center; gap:12px;">
        <ds-button variant="primary"      [icon]="Plus"      iconPosition="left">Nuevo</ds-button>
        <ds-button variant="outline"      [icon]="ArrowRight" iconPosition="right">Continuar</ds-button>
        <ds-button variant="destructive"  [icon]="Trash2"    iconPosition="left">Eliminar</ds-button>
        <ds-button variant="secondary"    [icon]="GitBranch" iconPosition="left">New Branch</ds-button>
      </div>
    `,
  }),
};

// ── Icon only ──────────────────────────────────────────────────
export const IconOnly: Story = {
  render: () => ({
    props: { Plus, Trash2, ArrowRight },
    template: `
      <div style="display:flex; align-items:center; gap:12px;">
        <ds-button variant="primary"     [icon]="Plus"      iconPosition="only" size="sm" />
        <ds-button variant="outline"     [icon]="ArrowRight" iconPosition="only" size="md" />
        <ds-button variant="destructive" [icon]="Trash2"    iconPosition="only" size="lg" />
      </div>
    `,
  }),
};

export const Status: Story = {
  parameters: { layout: 'padded' },
  render: () => ({
    props: { Plus, ArrowRight, Trash2 },
    template: `
      <div style="display:grid; gap:18px; min-width: 760px;">
        
        <!-- Default / Disabled / Loading (Primary) -->
        <div>
          <div style="margin-bottom:8px; font-size:13px; color: var(--color-text-secondary); font-weight: 500;">
            Primary states
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center;">
            <ds-button variant="primary">Default</ds-button>
            <ds-button variant="primary" [disabled]="true">Disabled</ds-button>
            <ds-button variant="primary" [loading]="true">Loading</ds-button>
            <ds-button variant="primary" [icon]="Plus" iconPosition="left">With icon</ds-button>
            <ds-button variant="primary" [icon]="Plus" iconPosition="left" [loading]="true">Loading + icon</ds-button>
          </div>
        </div>

        <!-- Outline / Ghost / Secondary disabled + loading -->
        <div>
          <div style="margin-bottom:8px; font-size:13px; color: var(--color-text-secondary); font-weight: 500;">
            Other variants states
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center;">
            <ds-button variant="secondary">Secondary</ds-button>
            <ds-button variant="secondary" [disabled]="true">Secondary disabled</ds-button>
            <ds-button variant="secondary" [loading]="true">Secondary loading</ds-button>

            <ds-button variant="outline">Outline</ds-button>
            <ds-button variant="outline" [disabled]="true">Outline disabled</ds-button>
            <ds-button variant="outline" [loading]="true">Outline loading</ds-button>

            <ds-button variant="ghost">Ghost</ds-button>
            <ds-button variant="ghost" [disabled]="true">Ghost disabled</ds-button>
            <ds-button variant="ghost" [loading]="true">Ghost loading</ds-button>
          </div>
        </div>

        <!-- Destructive -->
        <div>
          <div style="margin-bottom:8px; font-size:13px; color: var(--color-text-secondary); font-weight: 500;">
            Destructive states
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center;">
            <ds-button variant="destructive">Delete</ds-button>
            <ds-button variant="destructive" [disabled]="true">Disabled</ds-button>
            <ds-button variant="destructive" [loading]="true">Deleting...</ds-button>
            <ds-button variant="destructive" [icon]="Trash2" iconPosition="left">With icon</ds-button>
            <ds-button variant="destructive" [icon]="Trash2" iconPosition="left" [loading]="true">Loading + icon</ds-button>
          </div>
        </div>

        <!-- Link (special case) -->
        <div>
          <div style="margin-bottom:8px; font-size:13px; color: var(--color-text-secondary); font-weight: 500;">
            Link states (special)
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center;">
            <ds-button variant="link">Link</ds-button>
            <ds-button variant="link" [disabled]="true">Link disabled</ds-button>
            <ds-button variant="link" [loading]="true">Link loading</ds-button>
            <ds-button variant="link" [icon]="ArrowRight" iconPosition="right">Link + icon</ds-button>
          </div>
        </div>

        <!-- Icon-only edge cases -->
        <div>
          <div style="margin-bottom:8px; font-size:13px; color: var(--color-text-secondary); font-weight: 500;">
            Icon-only edge cases
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center;">
            <ds-button variant="primary" [icon]="Plus" iconPosition="only" size="sm" />
            <ds-button variant="primary" [icon]="Plus" iconPosition="only" size="sm" [disabled]="true" />
            <ds-button variant="primary" [icon]="Plus" iconPosition="only" size="sm" [loading]="true" />

            <ds-button variant="outline" [icon]="ArrowRight" iconPosition="only" size="md" />
            <ds-button variant="outline" [icon]="ArrowRight" iconPosition="only" size="md" [disabled]="true" />
            <ds-button variant="outline" [icon]="ArrowRight" iconPosition="only" size="md" [loading]="true" />
          </div>
        </div>

        <!-- Full width states -->
        <div style="max-width: 320px;">
          <div style="margin-bottom:8px; font-size:13px; color: var(--color-text-secondary); font-weight: 500;">
            Full width states
          </div>
          <div style="display:flex; flex-direction:column; gap:10px;">
            <ds-button variant="primary" [fullWidth]="true" size="lg">Continue</ds-button>
            <ds-button variant="primary" [fullWidth]="true" size="lg" [loading]="true">Continue</ds-button>
            <ds-button variant="outline" [fullWidth]="true" size="lg" [disabled]="true">Cancel</ds-button>
          </div>
        </div>

      </div>
    `,
  }),
};

// ── Full Width ─────────────────────────────────────────────────
export const FullWidth: Story = {
  parameters: { layout: 'padded' },
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:10px; width:320px;">
        <ds-button variant="primary"  [fullWidth]="true">Iniciar sesión</ds-button>
        <ds-button variant="outline"  [fullWidth]="true">Crear cuenta</ds-button>
      </div>
    `,
  }),
};

// ── Toolbar ────────────────────────────────────────────────────
export const Toolbar: Story = {
  render: () => ({
    template: `
      <div style="display:flex; gap:0;">
        <ds-button variant="outline" size="sm"
          style="border-radius: 6px 0 0 6px; border-right: none;">Archive</ds-button>
        <ds-button variant="outline" size="sm"
          style="border-radius: 0; border-right: none;">Report</ds-button>
        <ds-button variant="outline" size="sm"
          style="border-radius: 0; border-right: none;">Snooze</ds-button>
        <ds-button variant="outline" size="sm"
          style="border-radius: 0 6px 6px 0;">···</ds-button>
      </div>
    `,
  }),
};

export const StateMatrix: Story = {
  parameters: { layout: 'padded' },
  render: () => ({
    template: `
      <div style="display:grid; gap:12px;">
        <div style="display:grid; grid-template-columns: 140px repeat(5, 160px); gap:12px; align-items:center; font-size: 13px;">
          <div></div>
          <div style="color: var(--color-text-secondary); font-weight: 500;">Default</div>
          <div style="color: var(--color-text-secondary); font-weight: 500;">Hover</div>
          <div style="color: var(--color-text-secondary); font-weight: 500;">Active</div>
          <div style="color: var(--color-text-secondary); font-weight: 500;">Focus</div>
          <div style="color: var(--color-text-secondary); font-weight: 500;">Disabled</div>
        </div>

        ${['primary', 'secondary', 'outline', 'ghost', 'destructive', 'link'].map((variant) => `
          <div style="display:grid; grid-template-columns: 140px repeat(5, 160px); gap:12px; align-items:center;">
            <div style="color: var(--color-text-secondary); font-size: 13px;">${variant}</div>

            <ds-button variant="${variant}">Label</ds-button>
            <ds-button variant="${variant}" class="is-hover">Label</ds-button>
            <ds-button variant="${variant}" class="is-active">Label</ds-button>
            <ds-button variant="${variant}" class="is-focus">Label</ds-button>
            <ds-button variant="${variant}" disabled>Label</ds-button>
          </div>
        `).join('')}
      </div>
    `,
  }),
};

export const LoadingMatrix: Story = {
  parameters: { layout: 'padded' },
  render: () => ({
    template: `
      <div style="display:grid; gap:12px;">
        <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center;">
          <ds-button variant="primary" [loading]="true">Primary</ds-button>
          <ds-button variant="secondary" [loading]="true">Secondary</ds-button>
          <ds-button variant="outline" [loading]="true">Outline</ds-button>
          <ds-button variant="ghost" [loading]="true">Ghost</ds-button>
          <ds-button variant="destructive" [loading]="true">Destructive</ds-button>
          <ds-button variant="link" [loading]="true">Link</ds-button>
        </div>
      </div>
    `,
  }),
};

// ── Disabled ───────────────────────────────────────────────────
export const DisabledPerVariant: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-wrap:wrap; gap:12px;">
        <ds-button variant="primary" [disabled]="true">Primary</ds-button>
        <ds-button variant="secondary" [disabled]="true">Secondary</ds-button>
        <ds-button variant="outline" [disabled]="true">Outline</ds-button>
        <ds-button variant="ghost" [disabled]="true">Ghost</ds-button>
        <ds-button variant="destructive" [disabled]="true">Destructive</ds-button>
        <ds-button variant="link" [disabled]="true">Link</ds-button>
      </div>
    `,
  }),
};

// ── As Link ───────────────────────────────────────────────────
export const AsLink: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center;">
        <ds-button asTag="a" variant="primary">Anchor Primary</ds-button>
        <ds-button asTag="a" variant="outline">Anchor Outline</ds-button>
        <ds-button asTag="a" variant="link">Anchor Link</ds-button>
      </div>
    `,
  }),
};
