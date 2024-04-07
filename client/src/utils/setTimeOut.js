export const setTimeOut = (callback, time) => {
  const timeoutId = setTimeout(callback, time);

  return () => {
    clearTimeout(timeoutId);
  };
};
