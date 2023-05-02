import FeedbackFormContent from './index.svelte';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
  title: 'Feedback Form - Content Correction',
  component: FeedbackFormContent,
  argTypes: { onSubmit: { action: 'form submitted' } },
};

export const Default = {
  parameters: {
    viewport: {
      defaultViewport: 'bsXl',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submitButton = await canvas.getByRole('button', {
      name: 'Submit',
    });

    //sanity check
    expect(await canvas.getByRole('main')).toBeInTheDocument();
    expect(submitButton.innerHTML).toBe('Submit');
    expect(submitButton.classList).toContain('btn-primary');
  },
};

//check for cookie???
//or user agent?

export const DesktopFormFilled = {
  parameters: { ...Default.parameters },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const name = await canvas.getByRole('textbox', { name: 'Name (required)' });
    const email = await canvas.getByRole('textbox', {
      name: 'Email address (required)',
    });
    const summary = await canvas.getByRole('textbox', {
      name: 'Short summary (required)',
    });
    const bookDescription = await canvas.getByRole('textbox', {
      name: 'Description or URL of the book',
    });
    const description = await canvas.getByRole('textbox', {
      name: 'Full description of problem or question',
    });

    await userEvent.type(name, 'Caryl Wyatt');
    await userEvent.type(email, 'caryl@umich.edu');
    await userEvent.type(summary, 'Where was that book?');
    await userEvent.type(
      bookDescription,
      "I can't remember the name but the cover was blue."
    );
    await userEvent.type(
      description,
      "I was browsing the collection and found the most amazing book, but not I can't remember what it was called. It was blue?"
    );
  },
};
export const DesktopFormMissingRequiredFields = {
  parameters: { ...Default.parameters },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const bookDescription = await canvas.getByRole('textbox', {
      name: 'Description or URL of the book',
    });
    const description = await canvas.getByRole('textbox', {
      name: 'Full description of problem or question',
    });
    const submitButton = await canvas.getByRole('button', { name: 'Submit' });

    await userEvent.type(
      bookDescription,
      "I can't remember the name but the cover was blue."
    );
    await userEvent.type(
      description,
      "I was browsing the collection and found the most amazing book, but not I can't remember what it was called. It was blue?"
    );
    await userEvent.click(submitButton);
  },
};
export const DesktopLoadingOnSubmit = {
  parameters: { ...Default.parameters },
  args: {
    loading: true,
  },
  // play: async ({ canvasElement }) => {
  //   const canvas = within(canvasElement);
  //   const submitButton = await canvas.getByRole('button', { name: 'Submit' });

  //   // this is a dumb test
  //   // i want to test that the loading prop is working, but how?
  // },
};
export const DesktopSuccessMessage = {
  parameters: { ...Default.parameters },
  args: {
    hidden: true,
    submitted: true,
    postResponseStatusCode: 200,
  },
};
export const DesktopSubmissionLimitMessage = {
  parameters: { ...Default.parameters },
  args: {
    hidden: false,
    submitted: true,
    postResponseStatusCode: 429,
  },
};
export const DesktopFailureMessage = {
  parameters: { ...Default.parameters },
  args: {
    hidden: false,
    submitted: true,
    postResponseStatusCode: null,
  },
};

export const DefaultMobile = {
  parameters: {
    viewport: {
      defaultViewport: 'bsXs',
    },
  },
};
