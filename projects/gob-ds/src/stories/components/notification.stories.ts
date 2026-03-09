import { Meta, StoryObj } from '@storybook/angular';
import { NotificationComponent } from '../../lib/notification/notification.component';

const meta: Meta<NotificationComponent> = {
    title: 'Components/Notification',
    component: NotificationComponent,
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: { type: 'select' },
            options: ['default', 'info', 'success', 'warning', 'error'],
            description: 'Tipo de notificación',
        },
        variant: {
            control: { type: 'select' },
            options: ['toast', 'banner'],
            description: 'Estilo: emergente o banner',
        },
        title: { control: 'text', description: 'Título' },
        message: { control: 'text', description: 'Descripción' },
        dismissible: { control: 'boolean', description: 'Muestra botón de cierre' },
        dismissed: { action: 'dismissed' },
    },
    args: {
        type: 'info',
        variant: 'toast',
        title: 'Notification bottomRight',
        message: 'Hello, Ant Design!',
        dismissible: true,
    },
};

export default meta;
type Story = StoryObj<NotificationComponent>;

export const Default: Story = {
    args: {
        type: 'info',
        title: 'Notification bottomRight',
        message: 'Hello, Ant Design!',
    },
};

export const InfoState: Story = {
    args: { type: 'info', title: 'Notification bottomRight', message: 'Hello, Ant Design!' },
};

export const SuccessState: Story = {
    args: { type: 'success', title: 'Notification bottomRight', message: 'Hello, Ant Design!' },
};

export const WarningState: Story = {
    args: { type: 'warning', title: 'Notification bottomRight', message: 'Hello, Ant Design!' },
};

export const ErrorState: Story = {
    args: { type: 'error', title: 'Notification bottomRight', message: 'Hello, Ant Design!' },
};

export const AllTypes: Story = {
    render: () => ({
        template: `
            <div style="display:flex; flex-direction:column; gap:10px; padding:24px;">
                <app-notification type="info"    title="Notification bottomRight" message="Hello, Ant Design!"></app-notification>
                <app-notification type="success" title="Notification bottomRight" message="Hello, Ant Design!"></app-notification>
                <app-notification type="warning" title="Notification bottomRight" message="Hello, Ant Design!"></app-notification>
                <app-notification type="error"   title="Notification bottomRight" message="Hello, Ant Design!"></app-notification>
            </div>
        `,
    }),
};

// ── Banner stories ────────────────────────────────────────────
export const BannerInfo: Story = {
    args: {
        variant: 'banner',
        type: 'info',
        title: 'Cookies',
        message: 'Usamos cookies para mejorar tu experiencia. Puedes cerrar este mensaje cuando quieras.',
    },
};

export const BannerSuccess: Story = {
    args: {
        variant: 'banner',
        type: 'success',
        title: 'Preferencias guardadas',
        message: 'Tus preferencias de cookies han sido guardadas.',
    },
};

export const BannerWarning: Story = {
    args: {
        variant: 'banner',
        type: 'warning',
        title: 'Advertencia',
        message: 'Este sitio usa cookies de terceros.',
    },
};

export const BannerError: Story = {
    args: {
        variant: 'banner',
        type: 'error',
        title: 'Error',
        message: 'No se pudieron cargar las preferencias de cookies.',
    },
};