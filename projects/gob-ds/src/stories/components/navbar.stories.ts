import type { Meta, StoryObj } from '@storybook/angular';
import { NavbarComponent, NavbarMenuItem } from '../../lib/navbar/navbar.component';
import { Home, Settings, HelpCircle, Bell } from 'lucide-angular';

const meta: Meta<NavbarComponent> = {
  title: 'Components/Navbar',
  component: NavbarComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    logoSrc: { control: 'text' },
    userName: { control: 'text' },
    userAvatar: { control: 'text' },
    systemName: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<NavbarComponent>;

const leftItems: NavbarMenuItem[] = [
  { id: '1', label: 'Inicio' },
  { id: '2', label: 'Reportes' },
];

const rightItems: NavbarMenuItem[] = [
  { id: '3', label: 'Notificaciones', icon: Bell },
  { id: '4', label: 'Configuración', icon: Settings },
  { id: '5', label: 'Ayuda', icon: HelpCircle },
];

const logoUrl = 'images/base-logo.png';

export const Default: Story = {
  args: {
    logoSrc: logoUrl,
    userName: 'Ricardo Garcia',
    systemName: 'Banco Integrado de Proyectos',
    leftMenuItems: leftItems,
    rightMenuItems: rightItems,
  },
};

export const Guest: Story = {
  args: {
    logoSrc: logoUrl,
    userName: 'Guest',
    leftMenuItems: [{ label: 'Inicio', icon: Home }],
    rightMenuItems: [{ label: 'Ayuda', icon: HelpCircle }],
  },
};

export const MobileView: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
