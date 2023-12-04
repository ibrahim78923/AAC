import * as Yup from 'yup';
export const moveFolderSchema = Yup?.object()?.shape({
  folderName: Yup?.object()?.required('Folder Name is required'),
});
export const moveFolderDefaultValues = {
  folderName: { label: '', value: '' },
};
export const moveFolderOptions = [
  { label: 'Personal', value: 'Personal' },
  { label: 'General', value: 'General' },
  { label: 'Approval Responses', value: 'Approval Responses' },
];
