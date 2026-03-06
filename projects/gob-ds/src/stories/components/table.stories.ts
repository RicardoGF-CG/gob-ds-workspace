import type { Meta, StoryObj } from '@storybook/angular';
import { TableComponent, TableColumn } from '../../lib/table/table.component';
import { LucideAngularModule, Ellipsis, Edit2, Trash2, Eye } from 'lucide-angular';
import { BadgeComponent } from '../../lib/badge/badge.component';

// ── Sample data ──────────────────────────────────────────────
interface ServerRow {
  owner: string;
  status: string;
  region: string;
  stability: number;
  costs: number;
  lastEdited: string;
}

const REGIONS = ['US-West 1', 'US-East 1', 'US-East 2', 'EU-West 1', 'EU-North 1', 'EU-Central 1', 'US-West 2'];

function generateData(count: number): ServerRow[] {
  const names = [
    'John Doe', 'Jane Smith', 'Alejandro Garcia', 'Maria Rossi',
    'Liam O\'Sullivan', 'Yuki Tanaka', 'Fatima Al-Farsi', 'Olga Ivanova',
    'Pierre Dubois', 'Sara Johansson', 'Ahmed Hassan', 'Carlos Sanchez',
    'Hannah Kim', 'Robert White', 'James Taylor', 'William Harris',
    'Alexander Young', 'Emily Brown', 'Michael Chen', 'Sofia Martinez',
    'Daniel Lee', 'Olivia Johnson', 'Lucas Mueller', 'Isabella Rossi',
    'Noah Wilson', 'Emma Davis', 'Ethan Clark', 'Mia Anderson',
    'Oliver Thomas', 'Charlotte Moore', 'Benjamin Jackson', 'Amelia Martin',
    'Jack Thompson', 'Harper White', 'Henry Garcia', 'Evelyn Martinez',
    'Sebastian Brown', 'Abigail Wilson', 'Aiden Taylor', 'Ella Thomas',
    'Matthew Anderson', 'Scarlett Jackson', 'Samuel Martin', 'Grace Lee',
    'David Harris', 'Chloe Clark', 'Joseph Young', 'Zoey King',
    'Leo Wright', 'Lily Scott', 'Ryan Green', 'Nora Adams',
  ];

  return Array.from({ length: count }, (_, i) => ({
    owner: names[i % names.length],
    status: 'Live',
    region: REGIONS[i % REGIONS.length],
    stability: Math.floor(Math.random() * 95) + 5,
    costs: Math.round((Math.random() * 6000 + 4000) * 100) / 100,
    lastEdited: new Date(2021 + Math.floor(Math.random() * 3), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
  }));
}

const sampleData = generateData(52);
const page1Data = sampleData.slice(0, 20);

const columns: TableColumn<ServerRow>[] = [
  { key: 'owner', label: 'Owner', sortable: true },
  { key: 'status', label: 'Status' },
  { key: 'region', label: 'Region' },
  { key: 'stability', label: 'Stability', sortable: true },
  { key: 'costs', label: 'Costs', sortable: true },
  { key: 'lastEdited', label: 'Last edited' },
];

// ── Meta ─────────────────────────────────────────────────────
const meta: Meta<TableComponent> = {
  title: 'Components/Table',
  component: TableComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A flexible data table component with sorting, row selection, pagination, and multiple states.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| columns | TableColumn[] | [] | Column definitions |
| data | T[] | [] | Row data |
| selectable | boolean | false | Enable row selection with checkboxes |
| loading | boolean | false | Show skeleton loading state |
| error | boolean | false | Show error state |
| paginated | boolean | false | Enable pagination |
| pageSize | number | 20 | Rows per page |
| totalItems | number | 0 | Total number of items |
| currentPage | number | 1 | Current page |
| sortKey | string | null | Currently sorted column key |
| sortDirection | 'asc'/'desc'/null | null | Sort direction |
        `,
      },
    },
  },
  argTypes: {
    selectable: {
      control: 'boolean',
      description: 'Enable row selection with checkboxes',
    },
    loading: {
      control: 'boolean',
      description: 'Show skeleton loading state',
    },
    error: {
      control: 'boolean',
      description: 'Show error state',
    },
    paginated: {
      control: 'boolean',
      description: 'Enable pagination',
    },
    pageSize: {
      control: { type: 'number', min: 5, max: 50, step: 5 },
      description: 'Rows per page',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
    },
    emptyMessage: {
      control: 'text',
      description: 'Empty state message',
    },
    skeletonRows: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Number of skeleton rows when loading',
    },
  },
};

export default meta;
type Story = StoryObj<TableComponent>;

// ── Default ──────────────────────────────────────────────────
export const Default: Story = {
  render: () => ({
    props: {
      columns,
      allData: sampleData,
      currentData: page1Data,
      currentPage: 1,
      totalItems: sampleData.length,
      onPageChange(event: any) {
        const start = (event.page - 1) * event.pageSize;
        this['currentData'] = this['allData'].slice(start, start + event.pageSize);
        this['currentPage'] = event.page;
        this['totalItems'] = this['allData'].length;
      },
    },
    template: `
      <ds-table
        [columns]="columns"
        [data]="currentData"
        [selectable]="true"
        [paginated]="true"
        [pageSize]="20"
        [currentPage]="currentPage"
        [totalItems]="totalItems"
        (pageChange)="onPageChange($event)"
      />
    `,
  }),
};

// ── Interactive Controls ─────────────────────────────────────
export const Playground: Story = {
  args: {
    selectable: false,
    loading: false,
    error: false,
    paginated: true,
    pageSize: 20,
    skeletonRows: 8,
    errorMessage: 'An error occurred while loading data.',
    emptyMessage: 'No data available.',
  },
  render: (args) => ({
    props: {
      ...args,
      columns,
      allData: sampleData,
      currentData: page1Data,
      currentPage: 1,
      totalItems: sampleData.length,
      onPageChange(event: any) {
        const start = (event.page - 1) * event.pageSize;
        this['currentData'] = this['allData'].slice(start, start + event.pageSize);
        this['currentPage'] = event.page;
        this['totalItems'] = this['allData'].length;
      },
    },
    template: `
      <ds-table
        [columns]="columns"
        [data]="currentData"
        [selectable]="selectable"
        [loading]="loading"
        [error]="error"
        [paginated]="paginated"
        [pageSize]="pageSize"
        [currentPage]="currentPage"
        [totalItems]="totalItems"
        [skeletonRows]="skeletonRows"
        [errorMessage]="errorMessage"
        [emptyMessage]="emptyMessage"
        (pageChange)="onPageChange($event)"
      />
    `,
  }),
};

// ── With Selection ───────────────────────────────────────────
export const WithSelection: Story = {
  render: () => ({
    props: {
      columns,
      data: page1Data,
    },
    template: `
      <ds-table
        [columns]="columns"
        [data]="data"
        [selectable]="true"
      />
    `,
  }),
};

// ── With Pagination ──────────────────────────────────────────
export const WithPagination: Story = {
  render: () => ({
    props: {
      columns,
      allData: sampleData,
      currentData: page1Data,
      currentPage: 1,
      totalItems: sampleData.length,
      onPageChange(event: any) {
        const start = (event.page - 1) * event.pageSize;
        this['currentData'] = this['allData'].slice(start, start + event.pageSize);
        this['currentPage'] = event.page;
        this['totalItems'] = this['allData'].length;
      },
    },
    template: `
      <ds-table
        [columns]="columns"
        [data]="currentData"
        [paginated]="true"
        [pageSize]="20"
        [currentPage]="currentPage"
        [totalItems]="totalItems"
        (pageChange)="onPageChange($event)"
      />
    `,
  }),
};

// ── With Selection + Pagination ──────────────────────────────
export const FullFeatured: Story = {
  render: () => ({
    props: {
      columns,
      allData: sampleData,
      currentData: page1Data,
      currentPage: 1,
      totalItems: sampleData.length,
      onPageChange(event: any) {
        const start = (event.page - 1) * event.pageSize;
        this['currentData'] = this['allData'].slice(start, start + event.pageSize);
        this['currentPage'] = event.page;
        this['totalItems'] = this['allData'].length;
      },
    },
    template: `
      <ds-table
        [columns]="columns"
        [data]="currentData"
        [selectable]="true"
        [paginated]="true"
        [pageSize]="20"
        [currentPage]="currentPage"
        [totalItems]="totalItems"
        (pageChange)="onPageChange($event)"
      />
    `,
  }),
};

// ── Loading (Skeleton) ───────────────────────────────────────
export const Loading: Story = {
  render: () => ({
    props: { columns },
    template: `
      <ds-table
        [columns]="columns"
        [data]="[]"
        [loading]="true"
        [skeletonRows]="8"
      />
    `,
  }),
};

// ── Empty State ──────────────────────────────────────────────
export const Empty: Story = {
  render: () => ({
    props: { columns },
    template: `
      <ds-table
        [columns]="columns"
        [data]="[]"
        emptyMessage="No items found."
      />
    `,
  }),
};

// ── Error State ──────────────────────────────────────────────
export const Error: Story = {
  render: () => ({
    props: { columns },
    template: `
      <ds-table
        [columns]="columns"
        [data]="[]"
        [error]="true"
        errorMessage="Failed to load server data. Please try again."
      />
    `,
  }),
};

// ── With Custom Cell Template (Actions) ──────────────────────
export const WithActions: Story = {
  render: () => ({
    props: {
      columns,
      data: page1Data,
      actions: [
        { label: 'View details', icon: Eye },
        { label: 'Edit server', icon: Edit2 },
        { divider: true },
        { label: 'Delete', icon: Trash2, danger: true },
      ],
      onAction(event: any) {
        console.log('Action clicked:', event.item.label, 'for row:', event.row.owner);
      },
    },
    moduleMetadata: {
      imports: [LucideAngularModule, BadgeComponent],
    },
    template: `
      <ds-table
        [columns]="columns"
        [data]="data"
        [rowActions]="actions"
        [selectable]="true"
        [paginated]="true"
        [pageSize]="20"
        [currentPage]="1"
        [totalItems]="52"
        (rowActionClick)="onAction($event)"
      />
    `,
  }),
};
