import ResultsToolbar from './index.svelte';
import MarginDecorator from '../MarginDecorator';

import { userEvent, within } from '@storybook/testing-library';
import { action } from '@storybook/addon-actions';

import { expect } from '@storybook/jest';

export default {
  title: 'Designs/Results Toolbar',
  component: ResultsToolbar,
  decorators: [() => MarginDecorator],
  excludeStories: /.*Data$/,
};

const parameters = {
  viewport: {
    defaultViewport: 'bsLg',
  },
};

export const Catalog = {
  parameters: parameters
};
export const FullText = {
  parameters: parameters,
  args: {
    target: 'ls'
  }
};
// export const LastPageOfMany = {
//   parameters: parameters,
//   args: {
//     value: 35
//   }
// };
