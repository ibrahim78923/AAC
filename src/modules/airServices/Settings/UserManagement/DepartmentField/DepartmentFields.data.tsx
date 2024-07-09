import {
  RHFAutocomplete,
  RHFDropZone,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';

export const predefinedDepartmentDataArray: any = [
  {
    id: 2,
    componentProps: {
      label: 'Name',
      name: 'name',
      placeholder: 'Enter Name',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      label: 'Department Head',
      name: 'departmentHeadDetails',
      placeholder: 'Select',
    },
    component: RHFAutocomplete,
  },
  {
    id: 4,
    componentProps: {
      label: 'Description',
      name: 'description',
      style: { height: '150px' },
    },
    component: RHFEditor,
  },
  {
    id: 6,
    componentProps: {
      label: 'Members',
      name: 'membersListDetails',
      placeholder: 'Select',
    },
    component: RHFAutocomplete,
  },
  {
    id: 1,
    componentProps: {
      name: 'fileUrl',
      label: 'Image',
      fileName: 'Upload File',
    },
    component: RHFDropZone,
  },
];
