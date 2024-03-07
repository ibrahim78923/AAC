import * as Yup from 'yup';
export const moveFolderSchema: any = Yup?.object()?.shape({
  folder: Yup?.object()?.nullable()?.required('Required'),
});
export const moveFolderDefaultValues = {
  folder: null,
};
