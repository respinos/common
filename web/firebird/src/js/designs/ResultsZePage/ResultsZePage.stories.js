import ResultsZePage from './index.svelte';

import { userEvent, within } from '@storybook/testing-library';
import { action } from '@storybook/addon-actions';

import { expect } from '@storybook/jest';

export default {
  title: 'Designs/Results Page',
  component: ResultsZePage,
  excludeStories: /.*Data$/,
};

const parameters = {
  viewport: {
    defaultViewport: 'bsLg',
  },
};

export const FullText = {
  parameters: parameters
};
// export const FullText = {
//   parameters: parameters,
//   args: {
//     target: 'ls'
//   }
// };
