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
} from '@/assets/icons';

export const dynamicallyFormValidationSchema = Yup.object().shape({
  email: Yup?.string(),
});

export const dynamicallyFormDefaultValues = {
  email: '',
};

export const dynamicallyFormArray = [];

export const sideBarMenuArray = [
  {
    name: 'Text',
    type: 'Text',
    icon: <EmailTextIcon />,
    drag: <EmailDragIcon />,
    paragraph: 'Single line multiline last area',
  },
  {
    name: 'Button',
    type: 'Button',
    icon: <EmailButtonIcon />,
    drag: <EmailDragIcon />,
    paragraph: 'Add Divider',
  },
  {
    name: 'Image',
    type: 'Image',
    icon: <EmailImageIcon />,
    drag: <EmailDragIcon />,
    paragraph: 'Add a paragraph',
  },
  {
    name: 'Input Field',
    type: 'Input',
    icon: <EmailButtonIcon />,
    drag: <EmailDragIcon />,
    paragraph: 'Select Date from DatePicker',
  },
  {
    name: 'Spacing',
    type: 'Spacing',
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
    paragraph: 'Attached your files',
  },
];

export const customersAttributesArray = [
  {
    name: '1',
    type: 'Input',
    icon: <InputIcon />,
    drag: <EmailDragIcon />,
  },
  {
    name: '2',
    type: 'Input',
    icon: <InputIcon />,
    drag: <EmailDragIcon />,
  },
  {
    name: '2',
    type: 'Input',
    icon: <InputIcon />,
    drag: <EmailDragIcon />,
  },
  {
    name: '1/3:2/3',
    type: 'DatePicker',
    icon: <InputIcon />,
    drag: <EmailDragIcon />,
  },
];
