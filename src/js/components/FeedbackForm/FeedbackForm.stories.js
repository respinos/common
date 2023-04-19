import FeedbackForm from './index.svelte';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
  title: 'Feedback Form',
  component: FeedbackForm,
};

export const Default = {
  parameters: {
    viewport: {
      defaultViewport: 'bsXl',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    //sanity check
    expect(await canvas.getByRole('main')).toBeInTheDocument();
  },
};

//check for cookie???
//or user agent?

export const DesktopFormFilled = {
  parameters: { ...Default.parameters },
};
export const DesktopFormMissingRequiredFields = {
  parameters: { ...Default.parameters },
};
export const DesktopLoadingOnSubmit = {
  parameters: { ...Default.parameters },
};
export const DesktopSuccessMessage = {
  parameters: { ...Default.parameters },
};
export const DesktopFailureMessage = {
  parameters: { ...Default.parameters },
};

export const DefaultMobile = {
  parameters: {
    viewport: {
      defaultViewport: 'bsXs',
    },
  },
};
