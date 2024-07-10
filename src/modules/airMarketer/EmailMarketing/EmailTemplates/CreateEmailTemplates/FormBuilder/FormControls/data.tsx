import { ImageIcon, SpaceIcon, DividerIcon, InputIcon } from '@/assets/icons';
import { fieldTypes } from '@/constants/form-builder';

export const controlsList = [
  {
    name: 'Text',
    type: fieldTypes?.textarea,
    icon: <InputIcon />,
  },
  {
    name: 'Image',
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
