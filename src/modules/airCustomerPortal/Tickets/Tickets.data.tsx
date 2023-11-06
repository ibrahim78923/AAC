import { RHFEditor, RHFTextField } from '@/components/ReactHookForm';
import { PhotoShopIcon, XdIcon, IllustratratorIcon } from '@/assets/icons';
import * as Yup from 'yup';

export const ticketsDataArray = [
  {
    id: 1,
    heading: 'Request for John Doe:',
    subHeading: 'Adobe Illustrator',
    created: '12/08/23',
    status: 'Processing',
    icon: <IllustratratorIcon />,
  },
  {
    id: 2,
    heading: 'Request for John Doe:',
    subHeading: 'Adobe XD',
    created: '12/08/23',
    status: 'Processing',
    icon: <XdIcon />,
  },
  {
    id: 3,
    heading: 'Request for John Doe:',
    subHeading: 'Adobe PhotoShop',
    created: '12/08/23',
    status: 'Processing',
    icon: <PhotoShopIcon />,
  },
  {
    id: 4,
    heading: 'Request for John Doe:',
    subHeading: 'Adobe Illustrator',
    created: '12/08/23',
    status: 'Processing',
    icon: <IllustratratorIcon />,
  },
  {
    id: 5,
    heading: 'Request for John Doe:',
    subHeading: 'Adobe XD',
    created: '12/08/23',
    status: 'Processing',
    icon: <XdIcon />,
  },
  {
    id: 6,
    heading: 'Request for John Doe:',
    subHeading: 'Adobe PhotoShop',
    created: '12/08/23',
    status: 'Processing',
    icon: <PhotoShopIcon />,
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
    },
    component: RHFEditor,
    md: 12,
  },
];

export const singleTicketDetailContent = `<h4>Request for Jhon : Adobe Photoshop CS6</h4><p><br></p><p>Created on&nbsp;Mon, 17 Apr 2023 4:18 AM&nbsp;-Via Portal</p><p><br></p><p>Description:</p><p>The industry-standard vector graphics software used worldwide by designers to create digital graphics, illustrations, and typography for all kinds of media: print, web, interactive, video, and mobile.20GB of cloud storage to keep your files organized across multiple computers and share your work with colleagues and clients.</p><p><br></p><p>Features :</p><p>Touch Type Tool</p><p>Images in brushes</p><p>Font search</p><p>Multiple-file place</p><p>CSS extraction</p><p>Sync Colors</p><p>File Packaging</p><p>Platform :Windows 8, Windows 7, Mac OS X 10.7 Lion, Mac OS X 10.6 Snow Leopard</p><p><br></p><p>System Requirements</p><p>Windows :</p><ul><li>Pentium 4 or AMD Athlon 64 processor (2GHz or faster)</li><li>Microsoft Windows 7 with Service Pack 1 or Windows 8</li><li>1GB of RAM (3GB recommended) for 32 bit; 2GB of RAM (8GB recommended) for 64 bit</li><li>2GB of available hard-disk space for installation</li></ul><p><br></p><p>Mac OS :</p><ul><li>Multicore Intel processor with 64-bit support</li><li>Mac OS X v10.6.8, v10.7, or v10.8</li><li>2GB of RAM (8GB recommended)</li><li>2GB of available hard-disk space for installation</li></ul><p><br></p>`;
