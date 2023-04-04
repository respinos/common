import CollectionSearchForm from './index.svelte';
import MarginDecorator from '../MarginDecorator';

import { userEvent, within } from '@storybook/testing-library';
import { action } from '@storybook/addon-actions';

import { expect } from '@storybook/jest';

export default {
  title: 'Designs/Collection Search Form',
  component: CollectionSearchForm,
  decorators: [() => MarginDecorator],
  excludeStories: /.*Data$/,
};

const parameters = {
  viewport: {
    defaultViewport: 'bsLg',
  },
};

export const SeachForm = {
  parameters: parameters
};
