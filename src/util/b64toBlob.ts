export const b64toBlob = (base64: string, type = 'image/png'): Promise<Blob> =>
  fetch(`data:${type};base64,${base64}`).then((res) => res.blob());
