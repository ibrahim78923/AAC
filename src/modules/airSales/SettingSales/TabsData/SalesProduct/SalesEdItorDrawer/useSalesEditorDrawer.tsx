import {
  salesProductDefaultValues,
  salesProductvalidationSchema,
} from './SalesEditorDrawer.data';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const useSalesEditorDrawer = ({ selectedCheckboxes }: any) => {
  const editRowValue = selectedCheckboxes && selectedCheckboxes[0];
  const salesProduct = useForm({
    resolver: yupResolver(salesProductvalidationSchema),
    defaultValues: async () => {
      if (editRowValue) {
        const {
          name,
          sku,
          purchasePrice,
          category,
          associate,
          description,
          createdBy,
          unitPrice,
          note,
        } = editRowValue;
        return {
          name,
          sku,
          purchasePrice,
          category,
          description,
          associate,
          createdBy: new Date(createdBy),
          unitPrice,
          note,
        };
      }
      return salesProductDefaultValues;
    },
  });
  const { handleSubmit } = salesProduct;
  const onSubmit = () => {};
  return {
    handleSubmit,
    onSubmit,
    salesProduct,
  };
};

export default useSalesEditorDrawer;
