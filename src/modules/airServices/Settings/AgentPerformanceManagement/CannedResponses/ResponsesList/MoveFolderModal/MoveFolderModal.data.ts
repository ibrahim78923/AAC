import * as Yup from 'yup';
export const moveFolderSchema = Yup?.object()?.shape({
  folderName: Yup?.object()?.required('Required'),
});
export const moveFolderDefaultValues = {
  folderName: { label: '', value: '' },
};
export const moveFolderOptions = ['Personal', 'General', 'Approval Responses'];
