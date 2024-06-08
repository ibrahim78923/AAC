import { RHFDropZone, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchema = Yup?.object()?.shape({
  email: Yup?.string()?.email('Invalid Email')?.required('Email is Required'),
  profilePicture: Yup?.mixed()?.nullable(),
  firstName: Yup?.string()?.required('First Name is Required'),
  lastName: Yup?.string()?.required('Last Name is Required'),
  contactOwnerId: Yup?.string()?.nullable(),
  phoneNumber: Yup?.string()?.trim(),
  jobTitle: Yup?.string()?.trim()?.required('Job Title is Required'),
  lifeCycleStageId: Yup?.string()?.nullable(),
  statusId: Yup?.string()?.nullable(),
  dateOfJoining: Yup?.string()?.nullable(),
});

export const defaultValues = {
  email: '',
  profilePicture: null,
  firstName: '',
  lastName: '',
  contactOwnerId: null,
  phoneNumber: '',
  jobTitle: '',
  lifeCycleStageId: null,
  statusId: null,
  dateOfJoining: null,
};

export const getFormFields = () => [
  {
    id: 1,
    componentProps: {
      name: 'email',
      label: 'Email',
      placeholder: 'Enter Email',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: 'profilePicture',
      fullWidth: true,
      fileType: 'PNG or JPG  (max 2.44 MB)',
      maxSize: 1024 * 1024 * 2.44,
      accept: {
        'image/*': ['.png', '.jpg'],
      },
    },
    component: RHFDropZone,
  },
  {
    id: 3,
    componentProps: {
      name: 'firstName',
      label: 'First Name',
      placeholder: 'John',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 4,
    componentProps: {
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Doe',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 5,
    componentProps: {
      name: 'contactOwnerId',
      label: 'Contact Owner',
      placeholder: 'Select Owner',
      required: true,
    },
    component: RHFTextField,
  },
];
