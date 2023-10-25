import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import { Box, Button } from '@mui/material';
import { useFormContext, useFieldArray } from 'react-hook-form';

export const dropdownDummy = [
  {
    value: 'option1',
    label: 'Option 1',
  },
  {
    value: 'option2',
    label: 'Option 2',
  },
];

export const ItemDetail = (props: any) => {
  const { name } = props;
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  return (
    <>
      {fields?.map((item: any, index: any) => {
        return (
          <Box key={item?.id}>
            <RHFTextField name={`${name}.${index}.firstName`} />
            <RHFSelect
              name={`${name}.${index}.lastName`}
              options={dropdownDummy}
            >
              {dropdownDummy?.map((option: any) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </RHFSelect>
            <Button type="button" onClick={() => remove(index)}>
              Delete
            </Button>
          </Box>
        );
      })}
      <Button
        type="button"
        onClick={() => {
          append({ firstName: '', lastName: '' });
        }}
      >
        append
      </Button>
    </>
  );
};
