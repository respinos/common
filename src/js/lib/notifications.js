export class CookieJar {
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

export class NotificationsManager {
  constructor({ notificationData = [], cookieJar = {}}) {
    this.notificationData = notificationData;
    this.cookieJar = cookieJar;
  }

  update(notificationData) {
    this.notificationData = [...notificationData];
  }

  hasNotifications() {
    return this.notificationData.length > 0;
  }

  count() {
    return this.notificationData.length;
  }

  hasNewNotifications() {
    return (this.timestamp() != this.effectiveOn());
  }

  effectiveOn() {
    if ( this.hasNotifications() ) {
      return this.notificationData[0].effective_on;
    }
    return "9999-99-99 23:59:59";
  }

  timestamp() {
    return this.cookieJar.getItem('HT.notice') || '';
  }

  updateTimestamp() {
    this.cookieJar.setItem('HT.notice', this.effectiveOn());
  }
}

export default NotificationsManager;