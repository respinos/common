import SearchBar from './index.svelte';
import { userEvent, within } from '@storybook/testing-library';

export default {
  title: 'Search Bar',
  component: SearchBar,
};

export const Mobile = {
  parameters: {
    viewport: {
      defaultViewport: 'bsXs',
    },
  },
};
export const Desktop = {
  parameters: {
    viewport: {
      defaultViewport: 'bsXl',
    },
  },
  args: {
    modalOpen: false,
  },
};
