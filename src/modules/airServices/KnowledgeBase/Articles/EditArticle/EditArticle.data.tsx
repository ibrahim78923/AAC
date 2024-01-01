import {
  RHFDatePicker,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
} from '@/components/ReactHookForm';

const dropdownDummy = [
  {
    value: 'option1',
    label: 'Option 1',
  },
  {
    value: 'option2',
    label: 'Option 2',
  },
];

export const defaultValues = {
  content: '',
  folder: '',
  tags: '',
  keywords: '',
  needsApproval: false,
  approver: '',
  reviewDate: new Date(),
};

export const editArticleFieldsFunction = (needApprovals: any) => {
  const conditionalFields = [
    {
      id: 5,
      componentProps: {
        fullWidth: true,
        name: 'approver',
        label: 'Approver',
        select: true,
        options: dropdownDummy,
        sx: { pb: 1.2 },
      },
      gridLength: 12,
      component: RHFSelect,
    },
    {
      id: 6,
      component: RHFDatePicker,
      gridLength: 12,
      componentProps: {
        fullWidth: true,
        name: 'reviewDate',
        label: 'Review Date',
        select: true,
        options: dropdownDummy,
        sx: { pb: 1.2 },
      },
    },
  ];
  const defaultFields = [
    {
      id: 3,
      component: RHFSelect,
      gridLength: 12,
      componentProps: {
        fullWidth: true,
        name: 'folder',
        label: 'Folder',
        select: true,
        options: dropdownDummy,
        sx: { pb: 1.2 },
      },
    },
    {
      id: 8,
      componentProps: {
        fullWidth: true,
        name: 'tags',
        label: 'Tags',
        sx: { pb: 1.2 },
      },
      gridLength: 12,
      component: RHFTextField,
    },
    {
      id: 8,
      componentProps: {
        fullWidth: true,
        name: 'keywords',
        label: 'Keywords',
        sx: { pb: 1.2 },
      },
      gridLength: 12,
      component: RHFTextField,
    },
    {
      id: 4,
      component: RHFSwitch,
      gridLength: 12,
      componentProps: {
        fullWidth: true,
        name: 'needsApproval',
        label: 'Need Approvals',
        sx: { pb: 1.8, pl: 1 },
      },
    },
  ];
  return needApprovals
    ? [...defaultFields, ...conditionalFields]
    : defaultFields;
};

export const articleEditorData = `<h2>Profiting in Bear and Bull Markets</h2><p><br></p><p>Both bear markets and bull markets represent tremendous opportunities to make money, and the key to success is to use strategies and ideas that can generate profits under a variety of conditions. This requires consistency, discipline, focus, and the ability to take advantage of fear and greed. This article will help familiarize you with investments that can prosper in up or down markets. A bear market is defined as a drop of 20% or more in a market average. Generally, bear markets occur during economic recessions or depressions, when pessimism prevails. But amid the rubble lie opportunities to make money for those who know how to use the right tools. Here are some ways to profit in bear markets</p><p><br></p><h4>Ways to Profit in Bear Markets </h4><p>The industry-standard vector graphics software used worldwide by designers to create digital graphics, illustrations, and typography for all kinds of media: print, web, interactive, video, and mobile.20GB of cloud storage to keep your files organized across multiple computers and share your work with colleagues and clients.</p><p><br></p><p>Features :</p><p>Touch Type Tool</p><p>Images in brushes</p><p>Font search</p><p>Multiple-file place</p><p>CSS extraction</p><p>Sync Colors</p><p>File Packaging</p><p>Platform :Windows 8, Windows 7, Mac OS X 10.7 Lion, Mac OS X 10.6 Snow Leopard</p><p><br></p><p>System Requirements</p><p>Windows :</p><ul><li>Pentium 4 or AMD Athlon 64 processor (2GHz or faster)</li><li>Microsoft Windows 7 with Service Pack 1 or Windows 8</li><li>1GB of RAM (3GB recommended) for 32 bit; 2GB of RAM (8GB recommended) for 64 bit</li><li>2GB of available hard-disk space for installation</li></ul><p><br></p><p>Mac OS :</p><ul><li>Multicore Intel processor with 64-bit support</li><li>Mac OS X v10.6.8, v10.7, or v10.8</li><li>2GB of RAM (8GB recommended)</li><li>2GB of available hard-disk space for installation</li></ul><p><br></p>`;
