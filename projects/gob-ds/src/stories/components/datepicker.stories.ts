import { Meta, StoryObj } from '@storybook/angular';
import { DatepickerComponent } from '../../lib/datepicker/datepicker.component';

const meta: Meta<DatepickerComponent> = {
    title: 'Components/Datepicker',
    component: DatepickerComponent,
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg'],
            description: 'Tamaño del input',
            table: { defaultValue: { summary: 'md' } },
        },
        state: {
            control: { type: 'select' },
            options: ['default', 'error', 'success', 'disabled'],
            description: 'Estado visual del datepicker',
            table: { defaultValue: { summary: 'default' } },
        },
        label: { control: 'text', description: 'Etiqueta del campo' },
        placeholder: { control: 'text', description: 'Placeholder' },
        required: { control: 'boolean', description: 'Campo requerido' },
        helperText: { control: 'text', description: 'Texto de ayuda' },
        minDate: { control: 'date', description: 'Fecha mínima' },
        maxDate: { control: 'date', description: 'Fecha máxima' },
        dateChange: { action: 'dateChange' },
    },
    args: {
        label: 'Fecha',
        placeholder: 'dd/mm/aaaa',
        size: 'md',
        state: 'default',
        required: false,
        helperText: '',
    },
};

export default meta;
type Story = StoryObj<DatepickerComponent>;

export const Default: Story = {
    args: { label: 'Fecha de nacimiento', placeholder: 'dd/mm/aaaa' },
};

export const WithHelperText: Story = {
    args: { label: 'Fecha de inicio', helperText: 'Selecciona la fecha en que comienza el proyecto' },
};

export const Required: Story = {
    args: { label: 'Fecha de nacimiento', required: true, helperText: 'Este campo es obligatorio' },
};

export const ErrorState: Story = {
    args: { label: 'Fecha de vencimiento', state: 'error', helperText: 'La fecha ingresada no es válida' },
};

export const SuccessState: Story = {
    args: { label: 'Fecha de confirmación', state: 'success', helperText: 'Fecha confirmada correctamente' },
};

export const Disabled: Story = {
    args: { label: 'Fecha bloqueada', state: 'disabled', helperText: 'Este campo no está disponible' },
};

export const Small: Story = {
    args: { label: 'Fecha', size: 'sm', placeholder: 'dd/mm/aaaa' },
};

export const Large: Story = {
    args: { label: 'Fecha', size: 'lg', placeholder: 'dd/mm/aaaa' },
};

export const WithMinMaxDate: Story = {
    args: {
        label: 'Fecha de reserva',
        helperText: 'Solo puedes reservar dentro de los próximos 30 días',
        minDate: new Date(),
        maxDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
};

export const AllSizes: Story = {
    render: () => ({
        template: `
            <div style="display:flex; flex-direction:column; gap:20px; padding:20px;">
                <app-datepicker size="sm" label="Small (sm)"  placeholder="dd/mm/aaaa"></app-datepicker>
                <app-datepicker size="md" label="Medium (md)" placeholder="dd/mm/aaaa"></app-datepicker>
                <app-datepicker size="lg" label="Large (lg)"  placeholder="dd/mm/aaaa"></app-datepicker>
            </div>
        `,
    }),
};

export const AllStates: Story = {
    render: () => ({
        template: `
            <div style="display:flex; flex-direction:column; gap:20px; padding:20px;">
                <app-datepicker state="default"  label="Default"  helperText="Estado normal"></app-datepicker>
                <app-datepicker state="error"    label="Error"    helperText="Fecha no válida"></app-datepicker>
                <app-datepicker state="success"  label="Success"  helperText="Fecha válida"></app-datepicker>
                <app-datepicker state="disabled" label="Disabled" helperText="Campo deshabilitado"></app-datepicker>
            </div>
        `,
    }),
};