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
  { id: '1', label: 'Home' },
  { id: '2', label: 'Reports' },
];

const rightItems: NavbarMenuItem[] = [
  { id: '3', label: 'Notifications', icon: Bell },
  { id: '4', label: 'Configuration', icon: Settings },
  { id: '5', label: 'Help', icon: HelpCircle },
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
    leftMenuItems: [{ label: 'Home', icon: Home }],
    rightMenuItems: [{ label: 'Help', icon: HelpCircle }],
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
