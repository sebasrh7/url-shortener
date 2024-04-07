export const copyToClipBoard = (text) => {
  navigator.clipboard.writeText(text);
  alert(`Copied to clipboard: ${text}`);
};
