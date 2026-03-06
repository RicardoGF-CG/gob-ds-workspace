import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { TopbarComponent } from '../../lib/topbar/topbar.component';

const meta: Meta<TopbarComponent> = {
    title: 'Components/Topbar',
    component: TopbarComponent,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    decorators: [
        moduleMetadata({ imports: [TopbarComponent] }),
    ],
    argTypes: {
        title: {
            control: 'text',
            description: 'Texto centrado en la barra superior',
        },
    },
    args: {
        title: 'Sistema de Evaluación Individual del Desempeño',
    },
};

export default meta;
type Story = StoryObj<TopbarComponent>;

export const Default: Story = {};

export const TituloPersonalizado: Story = {
    args: {
        title: 'Sistema de Administración Pública',
    },
};