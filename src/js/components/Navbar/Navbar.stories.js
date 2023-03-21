import Navbar from './index.svelte';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
  title: 'Navbar',
  component: Navbar,
};

export const Default = {};
export const Mobile = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
};
export const MobileOpenMenu = {
  parameters: { ...Mobile.parameters },
  play: async ({ canvasElement }) => {
    await userEvent.type;
  },
};
export const MobileLoggedIn = {
  parameters: { ...Mobile.parameters },
  args: {
    loggedIn: true,
  },
};
export const MobileLoggedInWithNotifications = {
  parameters: { ...Mobile.parameters },
  args: {
    loggedIn: true,
    hasNotification: true,
  },
};
