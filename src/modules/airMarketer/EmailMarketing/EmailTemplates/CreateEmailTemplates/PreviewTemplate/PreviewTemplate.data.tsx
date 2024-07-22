import {
  LaptopIcon,
  LaptopWhiteIcon,
  MobileTabIcon,
  MobileWhiteIcon,
} from '@/assets/icons';

export const deviceTypes = (value: any) => {
  return [
    {
      type: 'laptop',
      icon: value === 'laptop' ? <LaptopWhiteIcon /> : <LaptopIcon />,
    },
    {
      type: 'mobile',
      icon: value === 'mobile' ? <MobileWhiteIcon /> : <MobileTabIcon />,
    },
  ];
};

export const previewDataMockData = [
  {
    _id: '799b8f9d-5433-4f3c-9d2a-f5c6b2a1000f',
    type: 'textarea',
    name: 'field-1',
    label: 'Label textarea',
    value:
      '<p>this is new text </p><p>this in new line </p><p><strong>bold text</strong></p><p><em><u>List items</u></em></p><ol><li><strong>one </strong></li><li><strong>two</strong></li><li><strong>three</strong></li></ol>',
    required: false,
  },
  {
    _id: 'da34fd2b-9d8a-4065-9143-10ae870dbdd2',
    type: 'space',
    name: 'field-2',
    label: 'Label space',
    required: false,
    space: 20,
  },
  {
    _id: '482c2599-9e66-470b-bf2d-67a49e3d99fe',
    type: 'divider',
    name: 'field-3',
    label: 'Label divider',
    required: false,
    dividerWidth: 1,
    dividerColor: '#EAECF0',
  },
  {
    _id: '92c8d4ce-235b-4c61-99ed-3f62268cf599',
    type: 'button',
    name: 'field-4',
    label: 'Label button',
    required: false,
    buttonType: 'submit',
    buttonText: 'Submit',
  },
];
