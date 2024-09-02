import { IPreviewProps } from '../CustomizePortal.interface';

export default function usePreview(props: IPreviewProps) {
  const { watch } = props;

  const isFileInstance = (value: any) => value instanceof File;
  const isStringUrl = (value: any) => typeof value === 'string';

  const {
    companyLogo,
    primaryButton,
    secondaryButton,
    sideMenu,
    sideMenuIconPrimary,
    sideMenuIconSecondary,
  } = watch();

  const hexToRgba = (hex: string, opacity: number) => {
    hex = hex?.replace('#', '');

    if (hex?.length === 3) {
      hex = hex
        ?.split('')
        ?.map((char: string) => char + char)
        ?.join('');
    }

    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const reducedOpacityBgColor = hexToRgba(sideMenuIconPrimary, 0.1);

  return {
    companyLogo,
    primaryButton,
    secondaryButton,
    sideMenu,
    sideMenuIconPrimary,
    sideMenuIconSecondary,
    isFileInstance,
    isStringUrl,
    reducedOpacityBgColor,
  };
}
