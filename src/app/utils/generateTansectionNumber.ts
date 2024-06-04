export const generateTansectionNumber = () => {
  const timestamp = Date.now().toString();
  const randomString = Math.random().toString(36).substr(2, 6).toUpperCase();
  return `TnID-${timestamp}${randomString}`;
};
