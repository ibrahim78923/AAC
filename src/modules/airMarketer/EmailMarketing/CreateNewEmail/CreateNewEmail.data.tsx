import { RHFTextField } from '@/components/ReactHookForm';
import { Typography } from '@mui/material';
import * as Yup from 'yup';

export const CreateEmailData = [
  {
    item: 'Send',
    name: 'send',
  },
  {
    item: 'Schedule',
    name: 'schedule',
  },
  {
    item: 'Save as Draft',
    name: 'saveDraft',
  },
];

export const createNewEmailSchema = Yup?.object()?.shape({
  emailFrom: Yup?.string().required('Field is Required'),
  emailTo: Yup?.string().required('Field is Required'),
  subject: Yup?.string().required('Field is Required'),
});

export const defaultValues = {
  emailFrom: '',
  emailTo: '',
  subject: '',
};

export const createNewEmailData = [
  {
    componentProps: {
      name: 'emailFrom',
      label: 'From:',
      placeholder: 'Hycholic@gmail.com',
      fullWidth: true,
    },
    component: RHFTextField,
    isBCCField: ['both'],
    md: 6.1,
  },
  {
    componentProps: {
      name: 'emailTo',
      label: 'To:',
      placeholder: 'Enter Email',
      fullWidth: true,
    },
    component: RHFTextField,
    isBCCField: ['both'],
    md: 6.1,
  },
  {
    componentProps: {
      name: 'buttons',
    },
    component: Typography,
    isBCCField: ['both'],
    md: 5.9,
  },
  {
    componentProps: {
      name: 'bcc',
      label: 'BCC',
      placeholder: 'Enter Email',
      fullWidth: true,
    },
    component: RHFTextField,
    isBCCField: ['bcc'],
    md: 6.1,
  },
  {
    componentProps: {
      name: 'cc',
      label: 'CC',
      placeholder: 'Enter Email',
      fullWidth: true,
    },
    component: RHFTextField,
    isBCCField: ['cc'],
    md: 6.1,
  },
  {
    componentProps: {
      name: 'subject',
      label: 'Subject',
      placeholder: 'Enter Subject',
      fullWidth: true,
    },
    component: RHFTextField,
    isBCCField: ['both'],
    md: 6.1,
  },

  // {
  //   componentProps: {
  //     name: 'message',
  //     label: '',
  //     fullWidth: true,
  //     placeholder: 'Message',
  //     multiline: true,
  //     minRows: 5,
  //   },
  //   component: RHFTextField,
  //   isBCCField: ['both'],
  //   md: 12,
  // },
];

export const articleEditorData = `<h2>Profiting in Bear and Bull Markets</h2><p><br></p><p>Both bear markets and bull markets represent tremendous opportunities to make money, and the key to success is to use strategies and ideas that can generate profits under a variety of conditions. This requires consistency, discipline, focus, and the ability to take advantage of fear and greed. This article will help familiarize you with investments that can prosper in up or down markets. A bear market is defined as a drop of 20% or more in a market average. Generally, bear markets occur during economic recessions or depressions, when pessimism prevails. But amid the rubble lie opportunities to make money for those who know how to use the right tools. Here are some ways to profit in bear markets</p><p><br></p><h4>Ways to Profit in Bear Markets </h4><p>The industry-standard vector graphics software used worldwide by designers to create digital graphics, illustrations, and typography for all kinds of media: print, web, interactive, video, and mobile.20GB of cloud storage to keep your files organized across multiple computers and share your work with colleagues and clients.</p><p><br></p><p>Features :</p><p>Touch Type Tool</p><p>Images in brushes</p><p>Font search</p><p>Multiple-file place</p><p>CSS extraction</p><p>Sync Colors</p><p>File Packaging</p><p>Platform :Windows 8, Windows 7, Mac OS X 10.7 Lion, Mac OS X 10.6 Snow Leopard</p><p><br></p><p>System Requirements</p><p>Windows :</p><ul><li>Pentium 4 or AMD Athlon 64 processor (2GHz or faster)</li><li>Microsoft Windows 7 with Service Pack 1 or Windows 8</li><li>1GB of RAM (3GB recommended) for 32 bit; 2GB of RAM (8GB recommended) for 64 bit</li><li>2GB of available hard-disk space for installation</li></ul><p><br></p><p>Mac OS :</p><ul><li>Multicore Intel processor with 64-bit support</li><li>Mac OS X v10.6.8, v10.7, or v10.8</li><li>2GB of RAM (8GB recommended)</li><li>2GB of available hard-disk space for installation</li></ul><p><br></p>`;
