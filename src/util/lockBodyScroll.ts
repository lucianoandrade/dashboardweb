export const lockBodyScroll = (): void => {
  document.body.style.position = 'fixed';
  document.body.style.top = `-${window.scrollY}px`;
  document.body.style.width = '100vw'; // Fix: Body diminuindo de tamanho no chat
};

export const unlockBodyScroll = (): void => {
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
};
