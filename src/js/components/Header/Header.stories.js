import Header from './index.svelte';
import { userEvent, within } from '@storybook/testing-library';

export default {
  title: 'Header',
  component: Header,
};

export const MobileDefault = {
  parameters: {
    viewport: {
      defaultViewport: 'bsXs',
    },
  },
  args: {
    searchOpenToggle: true,
  },
};
export const MobileSearchClosed = {
  parameters: { ...MobileDefault.parameters },
  args: {
    searchOpenToggle: false,
  },
};
export const DefaultDesktop = {
  parameters: {
    viewport: {
      defaultViewport: 'bsXl',
    },
  },
  args: {
    searchOpen: true,
  },
};
