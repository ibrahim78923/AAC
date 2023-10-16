import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
const emailValidationsSchema = Yup.object().shape({});
const emailDefaultValues = {};
const useEmailEditorDrawer = () => {
  const methodsdealsTasks = useForm({
    resolver: yupResolver(emailValidationsSchema),
    defaultValues: emailDefaultValues,
  });
  return { methodsdealsTasks };
};
export default useEmailEditorDrawer;
