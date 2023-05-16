import AcceptableUseBanner from './index.svelte';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

class CookieJar {
  constructor() {
    this.data = {};
  }

  getItem(key) {
    return this.data[key];
  }

  setItem(key, value) {
    this.data[key] = value;
  }
}

export default {
  title: 'Acceptable Use Banner',
  component: AcceptableUseBanner,
  argTypes: { confirm: { action: 'banner confirmed' } },
};

export const Default = {
  parameters: {
    viewport: {
      defaultViewport: 'bsLg',
    },
  },
  args: {
    cookieJar: new CookieJar()
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submitButton = await canvas.getByRole('button', {
      name: 'OK',
    });

    //sanity check
    expect(submitButton.innerHTML).toBe('OK');
    expect(submitButton.classList).toContain('btn-dark');
  },
};

let previouslyAcceptedJar = new CookieJar();
previouslyAcceptedJar.setItem('HT.x', JSON.stringify({ 'aup-notice': true }));
export const PreviouslyAccepted = {
  parameters: {
  viewport: {
      defaultViewport: 'bsLg',
    },
  },
  args: {
    cookieJar: previouslyAcceptedJar
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    //sanity check
    expect(canvasElement.querySelector('button')).toBeFalsy();
  }
}