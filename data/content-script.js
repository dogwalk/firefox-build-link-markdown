self.port.on('buildLinkMarkdown', () => {
  /* global browserSelectedText:false */
  // browser-selected-text https://www.npmjs.com/package/browser-selected-text
  const selected = browserSelectedText();
  const title = window.document.title;
  const url = window.location.href;
  const result = [];
  if (selected) {
    result.push(`[${selected}]`);
  } else {
    result.push(`[${title}]`);
  }
  result.push(`(${url})`);
  self.port.emit('copyToSystem', result.join(''));
});
