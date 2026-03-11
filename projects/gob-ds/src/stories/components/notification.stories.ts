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
            description: 'Notification type',
        },
        variant: {
            control: { type: 'select' },
            options: ['toast', 'banner'],
            description: 'Style: toast or banner',
        },
        title: { control: 'text', description: 'Title' },
        message: { control: 'text', description: 'Description' },
        dismissible: { control: 'boolean', description: 'Show close button' },
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
        message: 'We use cookies to improve your experience. You can close this message when you want.',
    },
};

export const BannerSuccess: Story = {
    args: {
        variant: 'banner',
        type: 'success',
        title: 'Preferences saved',
        message: 'Your cookie preferences have been saved.',
    },
};

export const BannerWarning: Story = {
    args: {
        variant: 'banner',
        type: 'warning',
        title: 'Warning',
        message: 'This site uses third-party cookies.',
    },
};

export const BannerError: Story = {
    args: {
        variant: 'banner',
        type: 'error',
        title: 'Error',
        message: 'Could not load cookie preferences.',
    },
};