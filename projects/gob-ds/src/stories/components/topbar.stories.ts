import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { TopbarComponent } from '../../lib/topbar/topbar.component';
import { LucideAngularModule, Shield, Bell, Info, HelpCircle } from 'lucide-angular';

const meta: Meta<TopbarComponent> = {
    title: 'Components/Topbar',
    component: TopbarComponent,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    decorators: [
        moduleMetadata({
            imports: [
                TopbarComponent,
                LucideAngularModule.pick({ Shield, Bell, Info, HelpCircle }),
            ],
        }),
    ],
    argTypes: {
        title: {
            control: 'text',
            description: 'Centered title (only property of the component)',
        },
    },
    args: {
        title: 'Evaluation System',
    },
};

export default meta;
type Story = StoryObj<TopbarComponent>;

// Solo título
export const Default: Story = {};

// Texto simple
export const WithText: Story = {
    render: (args) => ({
        props: args,
        template: `
            <app-topbar title="${args['title']}">
                <span topbar-left>v2.1.0</span>
                <span topbar-right>© 2026</span>
            </app-topbar>
        `,
    }),
};

// Links
export const WithLinks: Story = {
    render: (args) => ({
        props: args,
        template: `
            <app-topbar title="${args['title']}">
                <a topbar-left href="/">Home</a>
                <a topbar-right href="/privacy">Privacy policy</a>
            </app-topbar>
        `,
    }),
};

// Imagen (logo)
export const WithImage: Story = {
    render: (args) => ({
        props: args,
        template: `
            <app-topbar title="${args['title']}">
                <img topbar-left src="https://placehold.co/80x24/ffffff/003F6E?text=LOGO" alt="Logo" />
                <span topbar-right>© 2026</span>
            </app-topbar>
        `,
    }),
};

// Badge + link
export const WithBadgeAndLink: Story = {
    render: (args) => ({
        props: args,
        template: `
            <app-topbar title="${args['title']}">
                <span topbar-left class="badge">Beta</span>
                <span topbar-left>State of Guanajuato</span>
                <a topbar-right href="/help">Help</a>
                <a topbar-right href="/logout">Logout</a>
            </app-topbar>
        `,
    }),
};

// Combinación libre
export const Mixed: Story = {
    render: (args) => ({
        props: args,
        template: `
            <app-topbar title="${args['title']}">
                <img topbar-left src="https://placehold.co/80x24/ffffff/003F6E?text=LOGO" alt="Logo" />
                <span topbar-left>State of Guanajuato</span>
                <span topbar-right class="badge">Admin</span>
                <button topbar-right>Notifications</button>
                <a topbar-right href="/logout">Logout</a>
            </app-topbar>
        `,
    }),
};

// Íconos lucide
export const WithIcons: Story = {
    render: (args) => ({
        props: {
            ...args,
            ShieldIcon: Shield,
            BellIcon: Bell,
        },
        template: `
            <app-topbar title="${args['title']}">
                <lucide-icon topbar-left [img]="ShieldIcon" [size]="16"></lucide-icon>
                <span topbar-left>State of Guanajuato</span>
                <lucide-icon topbar-right [img]="BellIcon" [size]="16"></lucide-icon>
                <a topbar-right href="/notifications">Notifications</a>
            </app-topbar>
        `,
    }),
};