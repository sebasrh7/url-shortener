export const getFaviconIcon = (url) => {
  if (!url) return "";
  const favicon = `https://www.google.com/s2/favicons?sz=64&domain=${url}`;
  return favicon;
};
