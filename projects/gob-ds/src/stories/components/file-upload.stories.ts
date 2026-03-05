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
          'Componente de carga de archivos con soporte para drag & drop, seleccion de archivos, botones de descarga opcionales y lista de archivos cargados.',
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
    label: 'Subir archivos',
    multiple: true,
  },
  render: (args) => ({
    props: {
      ...args,
      onFilesChange: (files: any[]) => console.log('Files changed:', files),
    },
    template: `
      <div style="width: 500px;">
        <ds-file-upload
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
    label: 'Subir archivos',
    downloadButtons: [
      { label: 'Descargar plantilla de imagenes' },
    ],
  },
  render: (args) => ({
    props: {
      ...args,
      onDownload: (btn: any) => console.log('Download clicked:', btn),
    },
    template: `
      <div style="width: 500px;">
        <ds-file-upload
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
    label: 'Subir documento PDF',
    accept: '.pdf',
    multiple: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 500px;">
        <ds-file-upload
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
        <ds-file-upload [label]="label" [required]="required" />
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
        <ds-file-upload [label]="label" [allowedExtensions]="allowedExtensions" />
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
        <ds-file-upload />
      </div>
    `,
  }),
};
