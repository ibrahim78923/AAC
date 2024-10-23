import { toPng } from 'html-to-image';
import { errorSnackbar } from './snackbar';

export const makePngImage = async (wrapper: any) => {
  const pngImage = await toPng(wrapper, { cacheBust: true });
  return pngImage;
};

export const htmlToPngConvert = async (
  elementRef: any,
  color?: any,
  name = 'image',
  padding = 1.5,
) => {
  try {
    const originalElement = elementRef?.current;
    const wrapper = document?.createElement('div');
    wrapper.style.padding = `${padding}rem`;
    wrapper.style.background = color;

    const clonedElement = originalElement?.cloneNode?.(true);
    wrapper?.appendChild?.(clonedElement);

    document?.body?.appendChild?.(wrapper);

    const dataUrl = await makePngImage(wrapper);

    const link = document?.createElement?.('a');
    link.download = `${name}.png`;
    link.href = dataUrl;
    link?.click();
    document?.body?.removeChild?.(wrapper);
  } catch (err: any) {
    errorSnackbar(err?.message);
  }
};
