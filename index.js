'use strict';

const isFirefoxAndroid = require('is-firefox-android')();
const handleClick = require('./lib/handle-click');

if (isFirefoxAndroid) {
  const getWindow = require('get-firefox-browser-window');
  let menuId = 0;
  exports.main = (options, callback) => {// eslint-disable-line no-unused-vars
    menuId = getWindow().NativeWindow.menu.add({
      name: 'Build Link Plain',
      callback: handleClick,
    });
  };
  exports.onUnload = (reason) => {// eslint-disable-line no-unused-vars
    getWindow().NativeWindow.menu.remove(menuId);
  };
} else {
  const { ActionButton } = require('sdk/ui/button/action');
  ActionButton({// eslint-disable-line new-cap
    id: 'build-link-plain',
    label: 'Plain',
    icon: {
      16: './filter3-16.png',
      32: './filter3-32.png',
      64: './filter3-64.png',
    },
    onClick: handleClick,
  });
}
