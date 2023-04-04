import ResultsPagination from './index.svelte';
import MarginDecorator from '../MarginDecorator';

import { userEvent, within } from '@storybook/testing-library';
import { action } from '@storybook/addon-actions';

import { expect } from '@storybook/jest';

export default {
  title: 'Designs/Results Pagination',
  component: ResultsPagination,
  decorators: [() => MarginDecorator],
  excludeStories: /.*Data$/,
};

const parameters = {
  viewport: {
    defaultViewport: 'bsLg',
  },
};

export const FirstPageOfMany = {
  parameters: parameters,
  args: {
    stickyBottom: false,
  }
};
export const InsidePageOfMany = {
  parameters: parameters,
  args: {
    stickyBottom: false,
    value: 5
  }
};
export const LastPageOfMany = {
  parameters: parameters,
  args: {
    stickyBottom: false,
    value: 35
  }
};
