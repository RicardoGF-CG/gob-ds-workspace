import type { Meta, StoryObj } from '@storybook/angular';
import { FileUploadComponent } from '../../lib/file-upload/file-upload.component';

const meta: Meta<FileUploadComponent> = {
  title: 'Components/FileUpload',
  component: FileUploadComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Component for file upload with support for drag & drop, file selection, optional download buttons and list of uploaded files.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    required: { control: 'boolean' },
    accept: { control: 'text' },
    allowedExtensions: { control: 'object' },
    multiple: { control: 'boolean' },
    maxSizeMb: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<FileUploadComponent>;

export const Default: Story = {
  args: {
    label: 'Upload files',
    multiple: true,
  },
  render: (args) => ({
    props: {
      ...args,
      onFilesChange: (files: any[]) => console.log('Files changed:', files),
    },
    template: `
      <div style="width: 500px;">
        <sf-file-upload
          [label]="label"
          [iconSrc]="iconSrc"
          [multiple]="multiple"
          (filesChange)="onFilesChange($event)"
        />
      </div>
    `,
  }),
};

export const WithDownloadButton: Story = {
  args: {
    label: 'Upload files',
    downloadButtons: [
      { label: 'Download image template' },
    ],
  },
  render: (args) => ({
    props: {
      ...args,
      onDownload: (btn: any) => console.log('Download clicked:', btn),
    },
    template: `
      <div style="width: 500px;">
        <sf-file-upload
          [label]="label"
          [iconSrc]="iconSrc"
          [downloadButtons]="downloadButtons"
          (downloadClick)="onDownload($event)"
        />
      </div>
    `,
  }),
};

export const WithAcceptFilter: Story = {
  args: {
    label: 'Upload PDF document',
    accept: '.pdf',
    multiple: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 500px;">
        <sf-file-upload
          [label]="label"
          [iconSrc]="iconSrc"
          [accept]="accept"
          [multiple]="multiple"
        />
      </div>
    `,
  }),
};

export const Required: Story = {
  args: {
    label: 'Required Upload',
    required: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 500px;">
        <sf-file-upload [label]="label" [required]="required" />
      </div>
    `,
  }),
};

export const AllowedExtensions: Story = {
  args: {
    label: 'Only Images allowed',
    allowedExtensions: ['jpg', 'png', 'gif'],
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 500px;">
        <sf-file-upload [label]="label" [allowedExtensions]="allowedExtensions" />
      </div>
    `,
  }),
};

export const NoLabel: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 500px;">
        <sf-file-upload />
      </div>
    `,
  }),
};
