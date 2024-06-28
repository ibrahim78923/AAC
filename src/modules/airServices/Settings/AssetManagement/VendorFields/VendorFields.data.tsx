import TextFormatIcon from '@mui/icons-material/TextFormat';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

export const fieldsList = [
  {
    id: '0',
    title: 'Text',
    match: 'text',
    icon: <TextFormatIcon sx={{ color: 'custom.main' }} />,
    description: 'Single Line Text Area',
  },
  {
    id: '1',
    title: 'Paragraph Text',
    match: 'paragraphText',
    icon: <FormatListBulletedIcon sx={{ color: 'custom.main' }} />,
    description: 'Multi Line Text Area',
  },
  {
    id: '2',
    title: 'Single Selection',
    match: 'singleSelection',
    icon: <RadioButtonCheckedIcon sx={{ color: 'custom.main' }} />,
    description: 'Only one item with a radio button',
  },
  {
    id: '3',
    title: 'Multiple Selection',
    match: 'multipleSelection',
    icon: <CheckBoxIcon sx={{ color: 'custom.main' }} />,
    description: 'Multiple options using a checkbox',
  },
  {
    id: '4',
    title: 'Date',
    match: 'date',
    icon: <CalendarMonthIcon sx={{ color: 'custom.main' }} />,
    description: 'Select Date From Date Picker',
  },
  {
    id: '5',
    title: 'Upload',
    match: 'upload',
    icon: <CloudUploadIcon sx={{ color: 'custom.main' }} />,
    description: 'Send files via Documents and Media ',
  },
  {
    id: '6',
    title: 'Dropdown',
    match: 'dropdown',
    icon: <ArrowDropDownCircleIcon sx={{ color: 'custom.main' }} />,
    description: 'Add Dropdown List',
  },
];

export const modalInitialState: any = {
  text: false,
  paragraphText: false,
  singleSelection: false,
  multipleSelection: false,
  date: false,
  upload: false,
  dropdown: false,
};

export const componentToMatchMap: any = {
  RHFDATEPICKER: 'date',
  RHFAUTOCOMPLETE: 'dropdown',
  RHFMULTICHECKBOX: 'multipleSelection',
  RHFTEXTFIELD: ['text', 'paragraphText'],
  RHFRADIOGROUP: 'singleSelection',
  RHFDROPZONE: 'upload',
};
