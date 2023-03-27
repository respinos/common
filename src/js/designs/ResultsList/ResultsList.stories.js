import ResultsList from './index.svelte';
import { userEvent, within } from '@storybook/testing-library';
import { action } from '@storybook/addon-actions';

import { expect } from '@storybook/jest';

export default {
  title: 'Designs/Results List',
  component: ResultsList,
  excludeStories: /.*Data$/,
};

export const Default = {};
