import { createElement } from 'react';
import { CustomGrid } from '../Grids/CustomGrid';
import { ReactHookFormFieldsI } from '../ReactHookForm/ReactHookForm.interface';
import { componentMap } from '@/utils/dynamic-forms';

export const DynamicForm = (props: any) => {
  const { md = 12, dynamicFormFieldsList = [] } = props;

  return (
    <>
      {dynamicFormFieldsList?.map((item: ReactHookFormFieldsI) => (
        <CustomGrid xs={12} md={md} key={item?.id}>
          {componentMap[item?.component] &&
            createElement(componentMap[item?.component], {
              ...item?.componentProps,
              name: item?.componentProps?.label,
              size: 'small',
            })}
        </CustomGrid>
      ))}
    </>
  );
};
