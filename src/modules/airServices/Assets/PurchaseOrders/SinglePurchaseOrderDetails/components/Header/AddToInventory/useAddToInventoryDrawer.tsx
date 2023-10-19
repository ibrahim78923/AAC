import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  validationSchema,
  defaultValues,
  validationSchema1,
  defaultValues1,
} from './AddToInventoryDrawer.data';
export default function useAddToInventoryDrawer() {
  const methods1: any = useForm({
    resolver: yupResolver(validationSchema),

    defaultValues,
  });
  const {
    handleSubmit: handleSubmit1,

    watch,
  } = methods1;

  const { addNew } = watch({ name: 'addNew' });
  const methods2: any = useForm({
    resolver: yupResolver(validationSchema1),
    defaultValues: defaultValues1,
  });
  const { handleSubmit: handleSubmit2 } = methods2;

  const onSubmit = async () => {};
  return {
    methods1,
    handleSubmit1,
    methods2,
    handleSubmit2,
    onSubmit,
    addNew,
  };
}
