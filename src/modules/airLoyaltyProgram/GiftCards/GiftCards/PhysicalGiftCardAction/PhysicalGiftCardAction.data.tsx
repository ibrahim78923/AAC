import { RHFAutocomplete } from '@/components/ReactHookForm';
import { GiftCongratsImage, GiftScanImage } from '@/assets/images';
import * as Yup from 'yup';
export const validationSchemaGiftCardDownloadType = Yup?.object()?.shape({
  type: Yup?.string(),
});

export const defaultValuesGiftCardDownloadType = {
  type: '',
};

export const giftCardDownloadTypes = ['PSD', 'SVG', 'JPG'];

export const giftCardDownloadData = [
  {
    id: 1,
    componentProps: {
      placeholder: 'Select',
      fullWidth: true,
      name: 'type',
      label: 'Download Type',
      select: true,
      options: giftCardDownloadTypes,
    },
    gridLength: 12,
    component: RHFAutocomplete,
  },
];

export const giftCardData = [
  {
    id: 1,
    titleCard: 'Front Side',
    cardImages: GiftCongratsImage,
    cardImageTwo: GiftScanImage,
    titleName: 'SHAREMYDINE',
    titleDescriptionName: 'GIFT CARD',
  },
  {
    id: 2,
    titleCard: 'Back Side',
    cardImages: GiftCongratsImage,
  },
];
