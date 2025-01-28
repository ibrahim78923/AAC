import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { ContainerGrid } from '../ContainerGrid';
import { CustomGrid } from '../CustomGrid';
import { HeadingFormGridPropsI } from '../Grids.interface';

export const HeadingFormGrid = (props: HeadingFormGridPropsI) => {
  const {
    formFieldsList = [],
    spacing = 2,
    disabled,
    children,
    md = 12,
  } = props;

  return (
    <ContainerGrid spacing={spacing}>
      {formFieldsList?.map((form: ReactHookFormFieldsI) => (
        <CustomGrid
          xs={12}
          md={form?.md ?? md}
          key={form?._id}
          customStyles={form?.gridSx}
        >
          <form.component
            {...form?.componentProps}
            size={'small'}
            disabled={form?.componentProps?.disabled || disabled}
          >
            {form?.heading ? form?.heading : null}
          </form.component>
        </CustomGrid>
      ))}
      {children}
    </ContainerGrid>
  );
};
