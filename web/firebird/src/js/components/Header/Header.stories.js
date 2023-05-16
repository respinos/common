import Header from './index.svelte';
import { userEvent, within } from '@storybook/testing-library';

export default {
  title: 'Header',
  component: Header,
};

export const MobileDefault = {
  args: {
    searchOpenToggle: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'bsXs',
    },
  },
};

export const DefaultDesktop = {
  args: {
    searchOpenToggle: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'bsXl',
    },
  },
};
