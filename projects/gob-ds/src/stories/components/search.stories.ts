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
        component: 'Search input with prefix icon, clear button and `search` and `cleared` events.',
      },
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<SearchComponent>;

// ── Playground ─────────────────────────────────────────────────
export const Playground: Story = {
  args: {
    placeholder: 'Search by name or RFC...',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 340px;">
        <sf-search
          [placeholder]="placeholder"
          [disabled]="disabled"
        />
      </div>
    `,
  }),
};

// ── States ────────────────────────────────────────────────────
export const States: Story = {
  render: () => ({
    template: `
      <div style="width:320px; display:flex; flex-direction:column; gap:12px;">
        <sf-search placeholder="Without text (default)" />
        <sf-search placeholder="Disabled" [disabled]="true" />
      </div>
    `,
  }),
  parameters: { layout: 'padded' },
};

// ── Table toolbar ────────────────────────────
export const TableToolbar: Story = {
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
          <sf-search placeholder="Search by name or RFC..." />
        </div>
        <span style="font-size:13px; color:var(--color-text-tertiary);">
          52 results
        </span>
      </div>
    `,
  }),
};
