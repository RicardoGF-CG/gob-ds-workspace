import { Meta, StoryObj, applicationConfig } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronDown } from 'lucide-angular';

import { FooterComponent, PolicyItem } from '../../lib/footer/footer.component';

const defaultPolicies: PolicyItem[] = [
    { label: 'Políticas de la Calidad y Gestión Ética', id: 'calidad' },
    {
        label: 'Política de Igualdad Laboral y No Discriminación para la Administración Pública del Estado de Guanajuato',
        id: 'igualdad',
    },
];

const meta: Meta<FooterComponent> = {
    title: 'Components/Footer',
    component: FooterComponent,
    decorators: [
        applicationConfig({
            providers: [
                importProvidersFrom(
                    CommonModule,
                    LucideAngularModule.pick({ ChevronDown })
                ),
            ],
        }),
    ],
    argTypes: {
        mode: {
            control: 'radio',
            options: ['login', 'app'],
            description: 'Define el modo de visualización del footer',
            table: {
                defaultValue: { summary: 'login' },
            },
        },
        policies: {
            control: 'object',
            description: 'Lista de políticas a mostrar',
        },
        policyClick: {
            action: 'policyClick',
            description: 'Emite el PolicyItem al hacer click en una política',
        },
    },
    args: {
        mode: 'login',
        policies: defaultPolicies,
    },
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `
El componente \`FooterComponent\` tiene dos modos:

- **\`login\`** — Muestra las políticas agrupadas en un dropdown (pantalla de inicio de sesión).
- **\`app\`** — Muestra las políticas como links inline separados (pantallas internas).

\`\`\`html
<!-- Login -->
<app-footer mode="login" />

<!-- App -->
<app-footer mode="app" />
\`\`\`
                `,
            },
        },
    },
};

export default meta;
type Story = StoryObj<FooterComponent>;

// ─── Login ────────────────────────────────────────────────────
export const Login: Story = {
    name: 'Login',
    args: {
        mode: 'login',
        policies: defaultPolicies,
    },
    parameters: {
        docs: {
            description: {
                story: 'Footer en la pantalla de login. Las políticas se muestran como un dropdown.',
            },
        },
    },
};

// ─── App ──────────────────────────────────────────────────────
export const App: Story = {
    name: 'App (pantallas internas)',
    args: {
        mode: 'app',
        policies: defaultPolicies,
    },
    parameters: {
        docs: {
            description: {
                story: 'Footer en pantallas internas. Las políticas se despliegan como links individuales.',
            },
        },
    },
};

// ─── Sin políticas ────────────────────────────────────────────
export const SinPoliticas: Story = {
    name: 'Sin políticas',
    args: {
        mode: 'login',
        policies: [],
    },
    parameters: {
        docs: {
            description: {
                story: 'Footer sin ninguna política configurada.',
            },
        },
    },
};

// ─── Playground ───────────────────────────────────────────────
export const Playground: Story = {
    name: 'Playground',
    args: {
        mode: 'login',
        policies: defaultPolicies,
    },
    parameters: {
        docs: {
            description: {
                story: 'Usa los controles del panel para alternar entre modos y editar las políticas.',
            },
        },
    },
};