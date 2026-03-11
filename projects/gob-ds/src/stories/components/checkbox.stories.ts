import type { Meta, StoryObj } from '@storybook/angular';
import { CheckboxComponent } from '../../lib/checkbox/checkbox.component';

const meta: Meta<CheckboxComponent> = {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Checkbox accesible with support for indeterminate state and ReactiveForms.',
      },
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    label: { control: 'text' },
    hint: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

// ── Playground ─────────────────────────────────────────────────
export const Playground: Story = {
  args: { label: 'Mantener sesión iniciada' },
  render: (args) => ({
    props: args,
    template: `
      <sf-checkbox
        [label]="label"
        [hint]="hint"
        [disabled]="disabled"
        [indeterminate]="indeterminate"
      />
    `,
  }),
};

// ── States ────────────────────────────────────────────────────
export const States: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:16px;">
        <sf-checkbox label="Sin marcar" />
        <sf-checkbox label="Marcado" [checked]="true" />
        <sf-checkbox label="Indeterminado" [indeterminate]="true" />
        <sf-checkbox label="Deshabilitado sin marcar" [disabled]="true" />
        <sf-checkbox label="Deshabilitado marcado"    [disabled]="true" [checked]="true" />
      </div>
    `,
  }),
};

// ── With hint ───────────────────────────────────────────────────
export const WithHint: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:16px; max-width:280px;">
        <sf-checkbox
          label="Mantener sesión iniciada"
          hint="Tu sesión no cerrará al salir del navegador."
        />
        <sf-checkbox
          label="Recibir notificaciones"
          hint="Te avisaremos sobre cambios importantes en tu cuenta."
          [checked]="true"
        />
      </div>
    `,
  }),
};

// ── Group (list of options) ──────────────────────────────────
export const Group: Story = {
  parameters: { layout: 'padded' },
  render: () => ({
    template: `
      <fieldset style="border:1px solid var(--color-border); border-radius:8px; padding:20px; display:flex; flex-direction:column; gap:14px; min-width:280px;">
        <legend style="font-size:13px; font-weight:600; color:var(--color-text-secondary); padding:0 6px;">
          Permisos de acceso
        </legend>
        <sf-checkbox label="Ver reportes"         hint="Acceso de solo lectura a todos los reportes." [checked]="true" />
        <sf-checkbox label="Editar registros"     hint="Puede modificar datos existentes." />
        <sf-checkbox label="Eliminar registros"   hint="Acción irreversible." [disabled]="true" />
        <sf-checkbox label="Administrar usuarios" hint="Requiere aprobación del administrador." [indeterminate]="true" />
      </fieldset>
    `,
  }),
};

// ── In context (like in your login image) ───────────────────
export const InContext: Story = {
  render: () => ({
    template: `
      <sf-checkbox label="Mantener sesión iniciada" [checked]="true" />
    `,
  }),
};
