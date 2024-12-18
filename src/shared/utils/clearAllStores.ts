export const clearAllStores = (...storeResetters: Array<() => void>) => {
  localStorage.clear();
  storeResetters.forEach((reset) => reset());
};
