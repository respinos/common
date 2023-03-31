import Header from './index.svelte';
import { userEvent, within } from '@storybook/testing-library';

export default {
  title: 'Header',
  component: Header,
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
};
