import NotificationsModal from './index.svelte';
import { userEvent, within } from '@storybook/testing-library';
import { action } from '@storybook/addon-actions';

import { expect } from '@storybook/jest';

export const actionsData = {
  show: action('show'),
  hide: action('hide'),
};

export default {
  title: 'Notifications Modal',
  component: NotificationsModal,
  excludeStories: /.*Data$/,
  argTypes: {
    show: { action: 'show' },
    hide: { action: 'hide' },
  }
};

export const UserIsNotAuthenticated = {
  args: {
    isOpen: true
  }
}

export const UserIsAuthenticated = {
  args: {
    isOpen: true,
    HT: {
      login_status: {
        logged_in: true,
        notificationData: [
          {
            message: "It really isn't too early to think about your season tickets to the Big House.",
            read_more_label: "Would you like to know more?",
            read_more_link: "https://mgoblue.com/sports/2021/1/29/football-season-tickets.aspx",
            title: "GO BLUE!"
          },
          {
            message: "<p>As a result of changes to Moosylvania State login, you may have lost access to personal collections you had built previously.</p>",
            read_more_label: "Would you like to know more?",
            read_more_link: "https://state.moosylvania/login",
            title: "Moosylvania State change in login"
          },
        ]
      }
    }
  }
}
