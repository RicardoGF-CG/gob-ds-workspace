import { Meta, StoryObj } from '@storybook/angular';
import { TextareaComponent } from '../../lib/textarea/textarea.component';

const meta: Meta<TextareaComponent> = {
    title: 'Components/Textarea',
    component: TextareaComponent,
    tags: ['autodocs'],
    argTypes: {
        label: {
            control: 'text',
            description: 'Etiqueta del campo',
        },
        placeholder: {
            control: 'text',
            description: 'Texto placeholder',
        },
        hint: {
            control: 'text',
            description: 'Texto de ayuda',
        },
        error: {
            control: 'text',
            description: 'Mensaje de error (reemplaza hint)',
        },
        rows: {
            control: { type: 'number', min: 2, max: 20 },
            description: 'Número de filas visibles',
            table: { defaultValue: { summary: '4' } },
        },
        maxlength: {
            control: { type: 'number', min: 0 },
            description: 'Límite de caracteres (0 = sin límite)',
            table: { defaultValue: { summary: '0' } },
        },
        showCount: {
            control: 'boolean',
            description: 'Muestra contador de caracteres',
            table: { defaultValue: { summary: 'false' } },
        },
        resize: {
            control: { type: 'select' },
            options: ['none', 'vertical', 'horizontal', 'both'],
            description: 'Control de redimensión',
            table: { defaultValue: { summary: 'vertical' } },
        },
        required: {
            control: 'boolean',
            description: 'Campo requerido',
        },
        disabled: {
            control: 'boolean',
            description: 'Campo deshabilitado',
        },
    },
    args: {
        label: 'Descripción',
        placeholder: 'Escribe aquí...',
        hint: '',
        error: '',
        rows: 4,
        maxlength: 0,
        showCount: false,
        resize: 'vertical',
        required: false,
        disabled: false,
    },
};

export default meta;
type Story = StoryObj<TextareaComponent>;

const wrapper = 'style="max-width:480px; padding:24px;"';

// ─── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
    args: {
        label: 'Descripción',
        placeholder: 'Escribe una descripción...',
    },
};

// ─── With Hint ────────────────────────────────────────────────────────────────
export const WithHint: Story = {
    args: {
        label: 'Comentarios',
        placeholder: 'Añade tus comentarios...',
        hint: 'Tu comentario será visible para el equipo.',
    },
};

// ─── Required ─────────────────────────────────────────────────────────────────
export const Required: Story = {
    args: {
        label: 'Descripción',
        placeholder: 'Este campo es obligatorio',
        required: true,
        hint: 'Este campo es obligatorio.',
    },
};

// ─── Error ────────────────────────────────────────────────────────────────────
export const ErrorState: Story = {
    args: {
        label: 'Descripción',
        placeholder: 'Escribe aquí...',
        error: 'Este campo no puede estar vacío.',
    },
};

// ─── Disabled ─────────────────────────────────────────────────────────────────
export const Disabled: Story = {
    args: {
        label: 'Descripción',
        placeholder: 'Campo deshabilitado',
        disabled: true,
        hint: 'No puedes editar este campo.',
    },
};

// ─── With Character Count ─────────────────────────────────────────────────────
export const WithCharCount: Story = {
    args: {
        label: 'Bio',
        placeholder: 'Cuéntanos sobre ti...',
        maxlength: 160,
        showCount: true,
        hint: 'Máximo 160 caracteres.',
    },
};

// ─── No Resize ────────────────────────────────────────────────────────────────
export const NoResize: Story = {
    args: {
        label: 'Notas',
        placeholder: 'Sin redimensión...',
        resize: 'none',
        hint: 'Este campo no se puede redimensionar.',
    },
};

// ─── Rows variants ────────────────────────────────────────────────────────────
export const AllRows: Story = {
    render: () => ({
        template: `
            <div style="display:flex; flex-direction:column; gap:24px; max-width:480px; padding:24px;">
                <ds-textarea label="2 filas"  placeholder="rows=2"  [rows]="2"></ds-textarea>
                <ds-textarea label="4 filas"  placeholder="rows=4"  [rows]="4"></ds-textarea>
                <ds-textarea label="8 filas"  placeholder="rows=8"  [rows]="8"></ds-textarea>
            </div>
        `,
    }),
};

// ─── All States ───────────────────────────────────────────────────────────────
export const AllStates: Story = {
    render: () => ({
        template: `
            <div style="display:flex; flex-direction:column; gap:24px; max-width:480px; padding:24px;">
                <ds-textarea label="Default"   placeholder="Estado normal"></ds-textarea>
                <ds-textarea label="Con hint"  placeholder="Con texto de ayuda" hint="Texto de ayuda visible aquí."></ds-textarea>
                <ds-textarea label="Error"     placeholder="Con error" error="Este campo es requerido."></ds-textarea>
                <ds-textarea label="Disabled"  placeholder="Deshabilitado" [disabled]="true" hint="Campo no disponible."></ds-textarea>
            </div>
        `,
    }),
};