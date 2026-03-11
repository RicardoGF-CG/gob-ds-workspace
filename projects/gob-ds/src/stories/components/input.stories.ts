import type { Meta, StoryObj } from '@storybook/angular';
import { Search, Mail } from 'lucide-angular';
import { InputComponent } from '../../lib/input/input.component';

const meta: Meta<InputComponent> = {
    title: 'Components/Input',
    component: InputComponent,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Base text input component of the design system. Compatible with ReactiveForms and ngModel.',
            },
        },
    },
    argTypes: {
        type: { control: 'select', options: ['text', 'password', 'email', 'number'] },
        disabled: { control: 'boolean' },
        label: { control: 'text' },
        placeholder: { control: 'text' },
        hint: { control: 'text' },
        error: { control: 'text' },
        required: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<InputComponent>;

// ── Playground ─────────────────────────────────────────────────
export const Playground: Story = {
    args: {
        label: 'RFC',
        placeholder: 'VECJ880326XXX',
        required: true,
    },
    render: (args) => ({
        props: args,
        template: `
      <div style="width: 320px;">
        <sf-input
          [label]="label"
          [placeholder]="placeholder"
          [hint]="hint"
          [error]="error"
          [disabled]="disabled"
          [type]="type"
          [required]="required"
        />
      </div>
    `,
    }),
};

// ── Login form (como en la imagen) ────────────────────────────
export const LoginForm: Story = {
    render: () => ({
        template: `
      <div style="width: 360px; display: flex; flex-direction: column; gap: 16px;">
        <sf-input label="RFC"        placeholder="VECJ880326XXX" />
        <sf-input label="Contraseña" type="password" placeholder="" />
      </div>
    `,
    }),
    parameters: { layout: 'centered' },
};

// ── States ────────────────────────────────────────────────────
export const States: Story = {
    render: () => ({
        template: `
      <div style="width: 320px; display: flex; flex-direction: column; gap: 16px;">
        <sf-input label="Default"   placeholder="Escribe algo..." />
        <sf-input label="Con hint"  placeholder="usuario@empresa.com"
                  hint="Usaremos este correo para notificaciones." />
        <sf-input label="Con error" placeholder="RFC"
                  error="El RFC ingresado no es válido." />
        <sf-input label="Disabled"  placeholder="No editable" [disabled]="true" />
      </div>
    `,
    }),
    parameters: { layout: 'padded' },
};

// ── With icons ─────────────────────────────────────────────────
export const WithIcons: Story = {
    render: () => ({
        props: { Search, Mail },
        template: `
      <div style="width: 320px; display: flex; flex-direction: column; gap: 16px;">
        <sf-input label="Buscar"  placeholder="Buscar..." [prefixIcon]="Search" />
        <sf-input label="Correo"  placeholder="usuario@empresa.com" [prefixIcon]="Mail" />
        <sf-input label="Contraseña" type="password" />
      </div>
    `,
    }),
    parameters: { layout: 'padded' },
};

