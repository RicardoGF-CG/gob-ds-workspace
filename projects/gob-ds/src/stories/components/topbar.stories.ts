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
            description: 'Título centrado (única propiedad del componente)',
        },
    },
    args: {
        title: 'Sistema de Evaluación Individual del Desempeño',
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
                <a topbar-left href="/">Inicio</a>
                <a topbar-right href="/privacidad">Aviso de privacidad</a>
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
                <span topbar-left>Guanajuato</span>
                <a topbar-right href="/ayuda">Ayuda</a>
                <a topbar-right href="/salir">Cerrar sesión</a>
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
                <span topbar-left>Secretaría de Finanzas</span>
                <span topbar-right class="badge">Admin</span>
                <button topbar-right>Notificaciones</button>
                <a topbar-right href="/salir">Salir</a>
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
                <span topbar-left>Administración</span>
                <lucide-icon topbar-right [img]="BellIcon" [size]="16"></lucide-icon>
                <a topbar-right href="/notificaciones">Notificaciones</a>
            </app-topbar>
        `,
    }),
};