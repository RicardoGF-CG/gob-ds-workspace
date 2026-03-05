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
                component: 'Campo de texto base del design system. Compatible con ReactiveForms y ngModel.',
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
        <ds-input
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
        <ds-input label="RFC"        placeholder="VECJ880326XXX" />
        <ds-input label="Contraseña" type="password" placeholder="" />
      </div>
    `,
    }),
    parameters: { layout: 'centered' },
};

// ── Estados ────────────────────────────────────────────────────
export const Estados: Story = {
    render: () => ({
        template: `
      <div style="width: 320px; display: flex; flex-direction: column; gap: 16px;">
        <ds-input label="Default"   placeholder="Escribe algo..." />
        <ds-input label="Con hint"  placeholder="usuario@empresa.com"
                  hint="Usaremos este correo para notificaciones." />
        <ds-input label="Con error" placeholder="RFC"
                  error="El RFC ingresado no es válido." />
        <ds-input label="Disabled"  placeholder="No editable" [disabled]="true" />
      </div>
    `,
    }),
    parameters: { layout: 'padded' },
};

// ── Con íconos ─────────────────────────────────────────────────
export const ConIconos: Story = {
    render: () => ({
        props: { Search, Mail },
        template: `
      <div style="width: 320px; display: flex; flex-direction: column; gap: 16px;">
        <ds-input label="Buscar"  placeholder="Buscar..." [prefixIcon]="Search" />
        <ds-input label="Correo"  placeholder="usuario@empresa.com" [prefixIcon]="Mail" />
        <ds-input label="Contraseña" type="password" />
      </div>
    `,
    }),
    parameters: { layout: 'padded' },
};

