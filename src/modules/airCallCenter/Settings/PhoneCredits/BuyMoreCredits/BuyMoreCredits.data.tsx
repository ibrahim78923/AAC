import Image from 'next/image';
import RHFDesignedRadioButton from './RHFDesignedRadioButton';
import { MasterCardLogoImage } from '@/assets/images';
import { VisaCardIcon } from '@/assets/icons';
import { RHFSwitch, RHFTextField } from '@/components/ReactHookForm';
export const buyMoreCreditsFormDefaultValues: any = (addNewCard: any) =>
  !addNewCard
    ? {
        buyMoreCredits: '',
      }
    : {
        cardNumber: '',
        expirationDate: '',
        name: '',
        cvv: '',
        secureTransaction: false,
      };

const buyMoreCreditsRadioGroupOptions = [
  {
    value: 'masterCard',
    labelOne: 'Pablo the Cat',
    labelTwo: 'XXXX-XXXX-XXXX - 1111',
    icon: <Image src={MasterCardLogoImage} alt="Master Card" />,
  },
  {
    value: 'visaCard',
    labelOne: 'Pablo the Cat',
    labelTwo: 'XXXX-XXXX-XXXX - 1111',
    icon: <VisaCardIcon />,
  },
];

export const buyMoreCreditsFormFieldsDynamic: any = (addNewCard: any) =>
  !addNewCard
    ? [
        {
          id: 13,
          componentProps: {
            fullWidth: true,
            name: 'buyMoreCredits',
            options: buyMoreCreditsRadioGroupOptions,
          },
          component: RHFDesignedRadioButton,
        },
      ]
    : [
        {
          id: 13,
          componentProps: {
            name: 'cardNumber',
            label: 'Card Number',
            type: 'number',
            fullWidth: true,
            placeholder: 'Enter Card Number',
            required: true,
          },
          component: RHFTextField,
        },
        {
          id: 12,
          componentProps: {
            name: 'expirationDate',
            label: 'Expiration Date',
            fullWidth: true,
            placeholder: 'MM/YY',
            required: true,
          },
          component: RHFTextField,
        },
        {
          id: 11,
          componentProps: {
            name: 'name',
            label: 'Name on card',
            fullWidth: true,
            placeholder: 'Enter Name on card',
            required: true,
          },
          component: RHFTextField,
        },
        {
          id: 13,
          componentProps: {
            name: 'cvv',
            label: 'Enter CVV code',
            type: 'number',
            fullWidth: true,
            placeholder: '3 Digits',
            required: true,
          },
          component: RHFTextField,
        },
        {
          id: 13,
          componentProps: {
            name: 'secureTransaction',
            label: 'Enable Secure Transaction',
            fullWidth: true,
          },
          component: RHFSwitch,
        },
      ];
