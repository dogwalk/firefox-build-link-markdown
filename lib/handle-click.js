const isFirefoxAndroid = require('is-firefox-android')();
const tabs = require('sdk/tabs');
const data = require('sdk/self').data;

module.exports = () => {
  const worker = tabs.activeTab.attach({
    contentScriptFile: [
      data.url('../node_modules/browser-selected-text/build/browser-selected-text.js'),
      data.url('content-script.js'),
    ],
  });
  worker.port.on('copyToSystem', (request) => {
    if (isFirefoxAndroid) {
      const { Cc, Ci } = require('chrome');
      const prompts = Cc['@mozilla.org/embedcomp/prompt-service;1']
        .getService(Ci.nsIPromptService);
      prompts.prompt(
        null,
        'Build Link Markdown',
        'Built link',
        { value: request },
        null,
        { value: false }
      );
    } else {
      const clipboard = require('sdk/clipboard');
      const notifications = require('sdk/notifications');
      clipboard.set(request);
      notifications.notify({
        title: 'Build Link Markdown',
        text: 'Copied to clipboard.',
      });
    }
  });
  worker.port.emit('buildLinkMarkdown');
};
