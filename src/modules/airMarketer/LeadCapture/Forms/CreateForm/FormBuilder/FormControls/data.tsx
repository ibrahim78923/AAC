import {
  ImageIcon,
  SpaceIcon,
  TextIcon,
  DividerIcon,
  InputIcon,
} from '@/assets/icons';
import { fieldTypes } from '@/utils/form-builder';

export const controlsList = [
  {
    name: 'Input Text',
    type: fieldTypes?.text,
    icon: <TextIcon />,
  },
  {
    name: 'Textarea',
    type: fieldTypes?.textarea,
    icon: <InputIcon />,
  },
  {
    name: 'Select',
    type: fieldTypes?.select,
    icon: <InputIcon />,
  },
  {
    name: 'Upload File',
    type: fieldTypes?.file,
    icon: <ImageIcon />,
  },
  {
    name: 'Spacing',
    type: fieldTypes?.space,
    icon: <SpaceIcon />,
  },
  {
    name: 'Divider',
    type: fieldTypes?.divider,
    icon: <DividerIcon />,
  },
  {
    name: 'Button',
    type: fieldTypes?.button,
    icon: <InputIcon />,
  },
];
