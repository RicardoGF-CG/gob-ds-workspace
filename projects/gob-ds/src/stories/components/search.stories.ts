import type { Meta, StoryObj } from '@storybook/angular';
import { SearchComponent } from '../../lib/search/search.component';

const meta: Meta<SearchComponent> = {
  title: 'Components/Search',
  component: SearchComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Input de búsqueda con ícono prefix, botón de limpiar y eventos `search` y `cleared`.',
      },
    },
  },
  argTypes: {
    disabled:    { control: 'boolean' },
    placeholder: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<SearchComponent>;

// ── Playground ─────────────────────────────────────────────────
export const Playground: Story = {
  args: {
    placeholder: 'Buscar por nombre o RFC...',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 340px;">
        <ds-search
          [placeholder]="placeholder"
          [disabled]="disabled"
        />
      </div>
    `,
  }),
};

// ── Estados ────────────────────────────────────────────────────
export const Estados: Story = {
  render: () => ({
    template: `
      <div style="width:320px; display:flex; flex-direction:column; gap:12px;">
        <ds-search placeholder="Sin texto (default)" />
        <ds-search placeholder="Disabled" [disabled]="true" />
      </div>
    `,
  }),
  parameters: { layout: 'padded' },
};

// ── En contexto (toolbar de tabla) ────────────────────────────
export const EnToolbar: Story = {
  parameters: { layout: 'padded' },
  render: () => ({
    template: `
      <div style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px;
        border: 1px solid var(--color-border);
        border-radius: 12px;
        background: var(--color-bg-default);
        gap: 12px;
        min-width: 560px;
      ">
        <div style="flex:1; max-width:320px;">
          <ds-search placeholder="Buscar por nombre o RFC..." />
        </div>
        <span style="font-size:13px; color:var(--color-text-tertiary);">
          52 resultados
        </span>
      </div>
    `,
  }),
};
