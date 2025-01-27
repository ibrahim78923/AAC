import { ContainerGrid } from '../ContainerGrid';
import { CustomGrid } from '../CustomGrid';

export const FormGrid = (props: any) => {
  const {
    formFieldsList = [],
    spacing = 2,
    disabled,
    children,
    md = 12,
  } = props;

  return (
    <ContainerGrid spacing={spacing}>
      {formFieldsList?.map((form: any) => (
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
          />
        </CustomGrid>
      ))}
      {children}
    </ContainerGrid>
  );
};
