import * as Yup from 'yup';
export const createNewFolderSchema = Yup.object().shape({
  folderName: Yup.string()
    .required('Folder Name is required')
    .min(3, 'Folder Name must be at least 3 characters')
    .max(30, 'Folder Name must not exceed 30 characters'),
  description: Yup.string().required('Description is required'),
});
export const createNewFolderDefaultValues = {
  folderName: '',
  description: '',
};
