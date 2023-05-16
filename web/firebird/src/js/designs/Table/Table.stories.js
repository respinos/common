import Table from './index.svelte';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
  title: 'Designs/Table',
  component: Table,
};

export const Default = {
  parameters: {
    viewport: {
      defaultViewport: 'bsXl',
    },
  },
};
