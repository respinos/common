import TwoColumnLayout from './index.svelte';

// import MarginDecorator from '../MarginDecorator';

import { userEvent, within } from '@storybook/testing-library';
import { action } from '@storybook/addon-actions';

import { expect } from '@storybook/jest';

export default {
  title: 'Designs/Two Column Layout',
  component: TwoColumnLayout,
  // decorators: [() => MarginDecorator],
  excludeStories: /.*Data$/,
};

const parameters = {
  viewport: {
    defaultViewport: 'bsLg',
  },
};

export const Desktop = {
  parameters: parameters,
  args: {
    enableBorder: false
  }
};

export const Narrow = {
  parameters: {
    viewport: {
      defaultViewport: 'bsXs'
    }
  },
  args: {
    enableBorder: false
  }
};
