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
    template: `<sf-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading">Guardar cambios</sf-button>`,
  }),
};

// ── Variants ───────────────────────────────────────────────────
export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-wrap:wrap; align-items:center; gap:12px;">
        <sf-button variant="primary">Primary</sf-button>
        <sf-button variant="secondary">Secondary</sf-button>
        <sf-button variant="outline">Outline</sf-button>
        <sf-button variant="ghost">Ghost</sf-button>
        <sf-button variant="destructive">Destructive</sf-button>
        <sf-button variant="link">Link</sf-button>
      </div>
    `,
  }),
};

// ── Sizes ──────────────────────────────────────────────────────
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex; align-items:center; gap:12px;">
        <sf-button size="sm">Small</sf-button>
        <sf-button size="md">Default</sf-button>
        <sf-button size="lg">Large</sf-button>
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
        <sf-button variant="primary"      [icon]="Plus"      iconPosition="left">Nuevo</sf-button>
        <sf-button variant="outline"      [icon]="ArrowRight" iconPosition="right">Continuar</sf-button>
        <sf-button variant="destructive"  [icon]="Trash2"    iconPosition="left">Eliminar</sf-button>
        <sf-button variant="secondary"    [icon]="GitBranch" iconPosition="left">New Branch</sf-button>
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
        <sf-button variant="primary"     [icon]="Plus"      iconPosition="only" size="sm" />
        <sf-button variant="outline"     [icon]="ArrowRight" iconPosition="only" size="md" />
        <sf-button variant="destructive" [icon]="Trash2"    iconPosition="only" size="lg" />
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
            <sf-button variant="primary">Default</sf-button>
            <sf-button variant="primary" [disabled]="true">Disabled</sf-button>
            <sf-button variant="primary" [loading]="true">Loading</sf-button>
            <sf-button variant="primary" [icon]="Plus" iconPosition="left">With icon</sf-button>
            <sf-button variant="primary" [icon]="Plus" iconPosition="left" [loading]="true">Loading + icon</sf-button>
          </div>
        </div>

        <!-- Outline / Ghost / Secondary disabled + loading -->
        <div>
          <div style="margin-bottom:8px; font-size:13px; color: var(--color-text-secondary); font-weight: 500;">
            Other variants states
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center;">
            <sf-button variant="secondary">Secondary</sf-button>
            <sf-button variant="secondary" [disabled]="true">Secondary disabled</sf-button>
            <sf-button variant="secondary" [loading]="true">Secondary loading</sf-button>

            <sf-button variant="outline">Outline</sf-button>
            <sf-button variant="outline" [disabled]="true">Outline disabled</sf-button>
            <sf-button variant="outline" [loading]="true">Outline loading</sf-button>

            <sf-button variant="ghost">Ghost</sf-button>
            <sf-button variant="ghost" [disabled]="true">Ghost disabled</sf-button>
            <sf-button variant="ghost" [loading]="true">Ghost loading</sf-button>
          </div>
        </div>

        <!-- Destructive -->
        <div>
          <div style="margin-bottom:8px; font-size:13px; color: var(--color-text-secondary); font-weight: 500;">
            Destructive states
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center;">
            <sf-button variant="destructive">Delete</sf-button>
            <sf-button variant="destructive" [disabled]="true">Disabled</sf-button>
            <sf-button variant="destructive" [loading]="true">Deleting...</sf-button>
            <sf-button variant="destructive" [icon]="Trash2" iconPosition="left">With icon</sf-button>
            <sf-button variant="destructive" [icon]="Trash2" iconPosition="left" [loading]="true">Loading + icon</sf-button>
          </div>
        </div>

        <!-- Link (special case) -->
        <div>
          <div style="margin-bottom:8px; font-size:13px; color: var(--color-text-secondary); font-weight: 500;">
            Link states (special)
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center;">
            <sf-button variant="link">Link</sf-button>
            <sf-button variant="link" [disabled]="true">Link disabled</sf-button>
            <sf-button variant="link" [loading]="true">Link loading</sf-button>
            <sf-button variant="link" [icon]="ArrowRight" iconPosition="right">Link + icon</sf-button>
          </div>
        </div>

        <!-- Icon-only edge cases -->
        <div>
          <div style="margin-bottom:8px; font-size:13px; color: var(--color-text-secondary); font-weight: 500;">
            Icon-only edge cases
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center;">
            <sf-button variant="primary" [icon]="Plus" iconPosition="only" size="sm" />
            <sf-button variant="primary" [icon]="Plus" iconPosition="only" size="sm" [disabled]="true" />
            <sf-button variant="primary" [icon]="Plus" iconPosition="only" size="sm" [loading]="true" />

            <sf-button variant="outline" [icon]="ArrowRight" iconPosition="only" size="md" />
            <sf-button variant="outline" [icon]="ArrowRight" iconPosition="only" size="md" [disabled]="true" />
            <sf-button variant="outline" [icon]="ArrowRight" iconPosition="only" size="md" [loading]="true" />
          </div>
        </div>

        <!-- Full width states -->
        <div style="max-width: 320px;">
          <div style="margin-bottom:8px; font-size:13px; color: var(--color-text-secondary); font-weight: 500;">
            Full width states
          </div>
          <div style="display:flex; flex-direction:column; gap:10px;">
            <sf-button variant="primary" [fullWidth]="true" size="lg">Continue</sf-button>
            <sf-button variant="primary" [fullWidth]="true" size="lg" [loading]="true">Continue</sf-button>
            <sf-button variant="outline" [fullWidth]="true" size="lg" [disabled]="true">Cancel</sf-button>
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
        <sf-button variant="primary"  [fullWidth]="true">Iniciar sesión</sf-button>
        <sf-button variant="outline"  [fullWidth]="true">Crear cuenta</sf-button>
      </div>
    `,
  }),
};

// ── Toolbar ────────────────────────────────────────────────────
export const Toolbar: Story = {
  render: () => ({
    template: `
      <div style="display:flex; gap:0;">
        <sf-button variant="outline" size="sm"
          style="border-radius: 6px 0 0 6px; border-right: none;">Archive</sf-button>
        <sf-button variant="outline" size="sm"
          style="border-radius: 0; border-right: none;">Report</sf-button>
        <sf-button variant="outline" size="sm"
          style="border-radius: 0; border-right: none;">Snooze</sf-button>
        <sf-button variant="outline" size="sm"
          style="border-radius: 0 6px 6px 0;">···</sf-button>
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

            <sf-button variant="${variant}">Label</sf-button>
            <sf-button variant="${variant}" class="is-hover">Label</sf-button>
            <sf-button variant="${variant}" class="is-active">Label</sf-button>
            <sf-button variant="${variant}" class="is-focus">Label</sf-button>
            <sf-button variant="${variant}" disabled>Label</sf-button>
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
          <sf-button variant="primary" [loading]="true">Primary</sf-button>
          <sf-button variant="secondary" [loading]="true">Secondary</sf-button>
          <sf-button variant="outline" [loading]="true">Outline</sf-button>
          <sf-button variant="ghost" [loading]="true">Ghost</sf-button>
          <sf-button variant="destructive" [loading]="true">Destructive</sf-button>
          <sf-button variant="link" [loading]="true">Link</sf-button>
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
        <sf-button variant="primary" [disabled]="true">Primary</sf-button>
        <sf-button variant="secondary" [disabled]="true">Secondary</sf-button>
        <sf-button variant="outline" [disabled]="true">Outline</sf-button>
        <sf-button variant="ghost" [disabled]="true">Ghost</sf-button>
        <sf-button variant="destructive" [disabled]="true">Destructive</sf-button>
        <sf-button variant="link" [disabled]="true">Link</sf-button>
      </div>
    `,
  }),
};

// ── As Link ───────────────────────────────────────────────────
export const AsLink: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center;">
        <sf-button asTag="a" variant="primary">Anchor Primary</sf-button>
        <sf-button asTag="a" variant="outline">Anchor Outline</sf-button>
        <sf-button asTag="a" variant="link">Anchor Link</sf-button>
      </div>
    `,
  }),
};
