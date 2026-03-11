import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ProfileMenuComponent } from '../../lib/profile-menu/profile-menu.component';

const meta: Meta<ProfileMenuComponent> = {
    title: 'Components/ProfileMenu',
    component: ProfileMenuComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({ imports: [ProfileMenuComponent] }),
    ],
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        name: { control: 'text', description: 'User full name' },
        role: { control: 'text', description: 'User role' },
        logout: { action: 'logout' },
    },
    args: {
        name: 'Ricardo Gonzalez',
        role: 'Administrator',
    },
};

export default meta;
type Story = StoryObj<ProfileMenuComponent>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <div style="display: flex; justify-content: flex-end; padding: 16px 24px; background: #FFFFFF; min-height: 60px; align-items: center;">
                <app-profile-menu [name]="name" [role]="role" (logout)="logout($event)"></app-profile-menu>
            </div>
            <div style="padding: 200px 24px 24px; background: #F5F7F9; min-height: 300px;"></div>
        `,
    }),
};

export const LongName: Story = {
    render: (args) => ({
        props: { ...args, name: 'María Fernanda López', role: 'Coordinator of Projects' },
        template: `
            <div style="display: flex; justify-content: flex-end; padding: 16px 24px; background: #FFFFFF; min-height: 60px; align-items: center;">
                <app-profile-menu [name]="name" [role]="role" (logout)="logout($event)"></app-profile-menu>
            </div>
            <div style="padding: 200px 24px 24px; background: #F5F7F9; min-height: 300px;"></div>
        `,
    }),
};