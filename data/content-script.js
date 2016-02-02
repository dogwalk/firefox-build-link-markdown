self.port.on('buildLinkPlain', () => {
  const selected = window.getSelection().toString();
  const title = window.document.title;
  const url = window.location.href;
  const result = [];
  if (selected) {
    result.push(selected);
  } else {
    result.push(title);
  }
  result.push(url);
  self.port.emit('copyToSystem', result.join(' '));
});
