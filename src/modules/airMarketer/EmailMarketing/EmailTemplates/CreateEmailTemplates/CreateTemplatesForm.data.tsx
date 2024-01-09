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
