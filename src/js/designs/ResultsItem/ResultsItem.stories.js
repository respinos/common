import ResultsItem from './index.svelte';
import { userEvent, within } from '@storybook/testing-library';
import { action } from '@storybook/addon-actions';

import { expect } from '@storybook/jest';

export default {
  title: 'Designs/Results Item',
  component: ResultsItem,
  excludeStories: /.*Data$/,
};

export const FullView = {};
export const MultipleItems = {
  args: {
    htid: 'MULTIPLE'
  }
};
export const SearchOnly = {
  args: {
    access: 'limited-search-only'
  }
};
export const AccessPermitted = {
  args: {
    access: 'limited-access-permitted'
  }
};