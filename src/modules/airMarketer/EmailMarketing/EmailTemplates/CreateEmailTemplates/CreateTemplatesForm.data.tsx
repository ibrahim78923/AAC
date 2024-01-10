import * as Yup from 'yup';
import {
  InputIcon,
  EmailTextIcon,
  EmailDragIcon,
  EmailButtonIcon,
  EmailImageIcon,
  EmailSocialIcon,
  EmailLinkIcon,
  EmailDividerIcon,
  GiftCardIconIcon,
  LoyaltyTokenIcon,
  CreditsIcon,
  VoucherIcon,
} from '@/assets/icons';
import { RHFSelect, RHFSwitch, RHFTextField } from '@/components/ReactHookForm';

export const dynamicallyFormValidationSchema = Yup.object().shape({
  Editor: Yup?.string(),
});

export const dynamicallyFormDefaultValues = {
  Editor: '',
};

export const dynamicallyFormArray = [];

export const sideBarMenuArray = [
  {
    name: 'Editor',
    type: 'Editor',
    icon: <EmailTextIcon />,
    drag: <EmailDragIcon />,
    paragraph: 'Single line multiline last area',
  },
  {
    name: 'Button',
    type: 'Button',
    icon: <EmailButtonIcon />,
    drag: <EmailDragIcon />,
    paragraph: 'Select Date from DatePicker',
  },
  {
    name: 'Image',
    type: 'Image',
    icon: <EmailImageIcon />,
    drag: <EmailDragIcon />,
    paragraph: 'Add a paragraph',
  },
  {
    name: 'Social',
    type: 'Social',
    icon: <EmailSocialIcon />,
    drag: <EmailDragIcon />,
    paragraph: 'Add dropdown list',
  },
  {
    name: 'Url',
    type: 'Url',
    icon: <EmailLinkIcon />,
    drag: <EmailDragIcon />,
    paragraph: 'Attached your files',
  },
  {
    name: 'Divider',
    type: 'Divider',
    icon: <EmailDividerIcon />,
    drag: <EmailDragIcon />,
    paragraph: 'Add Divider',
  },
];

export const customersAttributesArray = [
  {
    name: '1',
    type: 'layout1',
    icon: <InputIcon />,
    drag: <EmailDragIcon />,
  },
  {
    name: '2',
    type: 'layout2',
    icon: <InputIcon />,
    drag: <EmailDragIcon />,
  },
  {
    name: '2',
    type: 'layout3',
    icon: <InputIcon />,
    drag: <EmailDragIcon />,
  },
  {
    name: '1/3:2/3',
    type: 'layout4',
    icon: <InputIcon />,
    drag: <EmailDragIcon />,
  },
];

export const headerArray = [
  {
    name: 'GiftCard',
    icon: <GiftCardIconIcon />,
  },
  {
    name: 'Loyalty Token',
    icon: <LoyaltyTokenIcon />,
  },
  {
    name: 'Credits',
    icon: <CreditsIcon />,
  },
  {
    name: 'Voucher',
    icon: <VoucherIcon />,
  },
];

export const SideBarValidationSchema = Yup.object().shape({
  buttonType: Yup?.string(),
  buttonText: Yup?.string(),
});

export const SideBarDefaultValues = {
  buttonType: '',
  buttonText: '',
};

export const SideBarArray = (headerValue: any) => {
  return [
    {
      componentProps: {
        name: 'buttonType',
        label: 'Button Type',
        fullWidth: true,
        select: true,
        value: headerValue,
      },
      options: [
        { value: headerValue, label: 'Gift Card' },
        { value: headerValue, label: 'Tokens' },
        { value: headerValue, label: 'Credits' },
        { value: headerValue, label: 'Vouchers' },
      ],
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'buttonText',
        label: 'Button Text',
        fullWidth: true,
        required: true,
        placeholder: 'Edit this button',
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'shop',
        label:
          headerValue === 'GiftCard' ||
          headerValue === 'Loyalty Token' ||
          headerValue === 'Credits'
            ? 'shop'
            : 'Voucher',
        fullWidth: true,
        select: true,
      },
      options: [{ value: 'Webshop', label: 'Webshop' }],
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'shop',
        label: 'Giftcard program',
        fullWidth: true,
        select: true,
      },
      options:
        headerValue === 'GiftCard'
          ? [
              { value: 'Gift Card', label: 'Gift Card' },
              { value: 'Tokens', label: 'Tokens' },
              { value: 'Credits', label: 'Credits' },
              { value: 'Vouchers', label: 'Vouchers' },
            ]
          : [],
      component: headerValue === 'GiftCard' ? RHFSelect : 'RHFSelect',
      md: 12,
    },
    {
      componentProps: {
        name: 'existingVoucher',
        label: 'Use an existing voucher',
        fullWidth: true,
        toggle: 'toggle',
      },
      component: headerValue === 'Voucher' ? RHFSwitch : 'none',
      md: 12,
    },
    {
      componentProps: {
        name: 'amount',
        label:
          headerValue === 'Loyalty Token' ||
          headerValue === 'Voucher' ||
          headerValue === 'Credits'
            ? 'Credits'
            : 'amount',
        fullWidth: true,
        type: 'number',
        placeholder: 'Enter here',
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'linkUrl',
        label: 'Link URL',
        fullWidth: true,
        placeholder: 'http://',
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'font',
        label: 'Font',
        fullWidth: true,
        select: true,
      },
      options: [
        { value: 'Arial', label: 'Arial' },
        { value: 'Calibri', label: 'Calibri' },
        { value: 'Poppins', label: 'Poppins' },
        { value: 'Time New Roman', label: 'Time New Roman' },
      ],
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'size',
        label: '',
        fullWidth: true,
        select: true,
      },
      options: [
        { value: 'small', label: 'small' },
        { value: 'medium,', label: 'medium,' },
        { value: 'large', label: 'large' },
      ],
      component: RHFSelect,
      md: 5,
    },
    {
      componentProps: {
        name: 'size',
        label: '',
        fullWidth: true,
        select: true,
      },
      options: [
        { value: '12', label: '12px' },
        { value: '14,', label: '14px,' },
        { value: '16', label: '16px' },
      ],
      component: RHFSelect,
      md: 5,
    },
    {
      componentProps: {
        name: 'color',
        label: 'color',
        fullWidth: true,
        color: 'color',
      },
      component: 'color',
      md: 2,
    },
    {
      componentProps: {
        name: 'style',
        label: 'Style',
        fullWidth: true,
        styleButton: 'style',
      },
      component: 'style',
      md: 12,
    },
    {
      componentProps: {
        name: 'alignment',
        label: 'Alignment',
        fullWidth: true,
        select: true,
      },
      options: [
        { value: 'Left', label: 'Left' },
        { value: 'Center,', label: 'Center,' },
        { value: 'Right', label: 'Right' },
      ],
      component: RHFSelect,
      md: 12,
    },
  ];
};
