import Navbar from "./Navbar.svelte";

export default {
  title: "Navbar",
  component: Navbar,
};

export const Default = {};
export const Mobile = {
  parameters: {
    viewport: {
      defaultViewport: "mobile2",
    },
  },
};
export const MobileLoggedIn = {
  parameters: { ...Mobile.parameters },
  args: {
    loggedIn: true,
  },
};
export const MobileLoggedInWithNotifications = {
  parameters: { ...Mobile.parameters },
  args: {
    loggedIn: true,
    hasNotification: true,
  },
};
