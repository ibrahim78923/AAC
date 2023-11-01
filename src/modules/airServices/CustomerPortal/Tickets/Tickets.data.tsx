import { RHFEditor, RHFTextField } from '@/components/ReactHookForm';
import { AdobePhotoshop, AdobeXD } from '@/assets/icons';
import * as Yup from 'yup';

//TODO: Ticket Card Data
export const ticketsDataArray = [
  {
    heading: 'Request for John Doe:',
    subHeading: 'Adobe Illustrator',
    created: '12/08/23',
    status: 'Processing',
    icon: <AdobePhotoshop />,
  },
  {
    heading: 'Request for John Doe:',
    subHeading: 'Adobe XD',
    created: '12/08/23',
    status: 'Processing',
    icon: <AdobeXD />,
  },
  {
    heading: 'Request for John Doe:',
    subHeading: 'Adobe PhotoShop',
    created: '12/08/23',
    status: 'Processing',
    icon: <AdobePhotoshop />,
  },
  {
    heading: 'Request for John Doe:',
    subHeading: 'Adobe Illustrator',
    created: '12/08/23',
    status: 'Processing',
    icon: <AdobeXD />,
  },
  {
    heading: 'Request for John Doe:',
    subHeading: 'Adobe XD',
    created: '12/08/23',
    status: 'Processing',
    icon: <AdobeXD />,
  },
  {
    heading: 'Request for John Doe:',
    subHeading: 'Adobe PhotoShop',
    created: '12/08/23',
    status: 'Processing',
    icon: <AdobePhotoshop />,
  },
];

//TODO: Single Ticket Data
export const singleTicketFormValidationSchema = Yup.object().shape({
  assets: Yup.string().required('Field is Required'),
  yourReply: Yup.string().required('Field is Required'),
});

export const singleTicketFormDefaultValues = {
  assets: '',
  yourReply: '',
};

export const singleTicketFormDataArray = [
  {
    componentProps: {
      name: 'assets',
      label: 'Assets(0)',
      type: 'text',
      fullWidth: true,
      required: false,
      multiline: true,
      minRows: 6,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'yourReply',
      label: 'Your Reply',
      type: 'text',
      fullWidth: true,
      required: false,
      multiline: true,
      minRows: 4,
    },
    component: RHFEditor,
    md: 12,
  },
];

export const singleTicketDetailData = {
  heading: 'Request for Jhon : Adobe Photoshop CS6',
  createdOn: 'Mon, 17 Apr 2023 4:18 AM',
  description: `The industry-standard vector graphics software used worldwide by designers to 
  create digital graphics, illustrations, and typography for all kinds of media: print, 
  web, interactive, video, and mobile.20GB of cloud storage to keep your files organized 
  across multiple computers and share your work with colleagues and clients.`,
  features: [
    { feature: 'Touch Type Tool' },
    { feature: 'Images in brushes' },
    { feature: 'Font search' },
    { feature: 'Multiple-file place' },
    { feature: 'CSS extraction' },
    { feature: 'Sync Colors' },
    { feature: 'File Packaging' },
    {
      feature:
        'Platform :Windows 8, Windows 7, Mac OS X 10.7 Lion, Mac OS X 10.6 Snow Leopard',
    },
  ],
  windows: [
    { window: 'Pentium 4 or AMD Athlon 64 processor (2GHz or faster)' },
    { window: 'Microsoft Windows 7 with Service Pack 1 or Windows 8' },
    {
      window:
        '1GB of RAM (3GB recommended) for 32 bit; 2GB of RAM (8GB recommended) for 64 bit',
    },
    { window: '2GB of available hard-disk space for installation' },
  ],
  macOS: [
    { mac: 'Multicore Intel processor with 64-bit support' },
    { mac: 'Mac OS X v10.6.8, v10.7, or v10.8' },
    { mac: '2GB of RAM (8GB recommended)' },
    { mac: '2GB of available hard-disk space for installation' },
  ],
};
