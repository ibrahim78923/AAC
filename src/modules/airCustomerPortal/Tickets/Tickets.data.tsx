import { RHFEditor, RHFTextField } from '@/components/ReactHookForm';
import {
  PhotoShopIcon,
  XdIcon,
  IllustratorIcon,
  IncTicketIcon,
} from '@/assets/icons';
import * as Yup from 'yup';

export const ticketsDataArray = [
  {
    id: 1565,
    heading: 'Request for John Doe:',
    subHeading: 'Adobe Illustrator #SR -2',
    created: 'Mon,24 Oct 2023 , 11:28 PM',
    status: 'Processing',
    icon: <IllustratorIcon />,
  },
  {
    id: 2564,
    heading: 'Request for John Doe:',
    subHeading: 'Adobe XD #SR -4',
    created: 'Mon,24 Oct 2023 , 11:28 PM',
    status: 'Processing',
    icon: <XdIcon />,
  },
  {
    id: 3576,
    heading: 'Request for John Doe:',
    subHeading: 'Adobe PhotoShop #SR -6',
    created: 'Mon,24 Oct 2023 , 11:28 PM',
    status: 'Processing',
    icon: <PhotoShopIcon />,
  },
  {
    id: 4645,
    heading: 'What’s wrong with my email?',
    subHeading: '#INC -6',
    created: 'Mon,24 Oct 2023 , 11:28 PM',
    status: 'Processing',
    icon: <IncTicketIcon />,
  },
  {
    id: 5654,
    heading: 'Request for John Doe:',
    subHeading: 'Adobe XD  #SR -4',
    created: 'Mon,24 Oct 2023 , 11:28 PM',
    status: 'Processing',
    icon: <XdIcon />,
  },
  {
    id: 6654,
    heading: 'What’s wrong with my email?',
    subHeading: '#INC -6',
    created: 'Mon,24 Oct 2023 , 11:28 PM',
    status: 'Processing',
    icon: <IncTicketIcon />,
  },
];

export const singleTicketFormValidationSchema = Yup?.object()?.shape({
  assets: Yup?.string()?.required('Field is Required'),
  yourReply: Yup?.string()?.required('Field is Required'),
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
      style: { height: 150 },
    },
    component: RHFEditor,
    md: 12,
  },
];

export const singleTicketDetailContent = `<h4>Request for Jhon : Adobe Photoshop CS6</h4>
<p><br></p><p>Created on&nbsp;Mon, 17 Apr 2023 4:18 AM&nbsp;-Via Portal</p><p><br></p>
<p>Description:</p>
<p>The industry-standard vector graphics software used worldwide by designers to create digital 
graphics, illustrations, and typography for all kinds of media: print, web, interactive, 
video, and mobile.20GB of cloud storage to keep your files organized across multiple 
computers and share your work with colleagues and clients.</p><p><br></p>
<p>Features :</p>
<p>Touch Type Tool</p>
<p>Images in brushes</p>
<p>Font search</p>
<p>Multiple-file place</p>
<p>CSS extraction</p>
<p>Sync Colors</p><p>File Packaging</p>
<p>Platform :Windows 8, Windows 7, Mac OS X 10.7 Lion, Mac OS X 10.6 Snow Leopard</p><p><br></p>
<p>System Requirements</p>

<p>Windows :</p>
<ul>
<li>Pentium 4 or AMD Athlon 64 processor (2GHz or faster)</li>
<li>Microsoft Windows 7 with Service Pack 1 or Windows 8</li>
<li>1GB of RAM (3GB recommended) for 32 bit; 2GB of RAM (8GB recommended) for 64 bit</li>
<li>2GB of available hard-disk space for installation</li>
</ul>
<p><br></p>
<p>Mac OS :</p>
<ul>
<li>Multicore Intel processor with 64-bit support</li>
<li>Mac OS X v10.6.8, v10.7, or v10.8</li>
<li>2GB of RAM (8GB recommended)</li>
<li>2GB of available hard-disk space for installation</li>
</ul>
<p><br></p>`;

export const allTicketsDropdownFunction = [
  {
    title: 'All tickets',
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
  {
    title: 'Open or Pending',
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
  {
    title: 'Resolved or Closed',
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
  {
    title: 'Share with me',
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
];

export const newTicketsDropdownFunction = [
  {
    title: 'Report an issue',
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
  {
    title: 'request a Service',
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
];
