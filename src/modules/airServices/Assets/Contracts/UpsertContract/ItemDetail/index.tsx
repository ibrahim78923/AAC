import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import { Button, Table, TableCell, TableHead, TableRow } from '@mui/material';
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

const columns = [
  'Service Name',
  'Price Model',
  // 'Cost', 'Count',
  'Comments',
];
const tableData = (name: any, index: any, remove: any) => [
  {
    id: 1,
    data: <RHFTextField name={`${name}.${index}.firstName`} />,
  },
  {
    id: 2,
    data: (
      <RHFSelect name={`${name}.${index}.lastName`} options={dropdownDummy}>
        {dropdownDummy?.map((option: any) => (
          <option key={option?.value} value={option?.value}>
            {option?.label}
          </option>
        ))}
      </RHFSelect>
    ),
  },
  // {
  //   id: 3,
  //   data: <RHFTextField name={`${name}.${index}.firstName`} />,
  // },
  // {
  //   id: 4,
  //   data: <RHFTextField name={`${name}.${index}.firstName`} />,
  // },
  {
    id: 5,
    data: (
      <Button type="button" onClick={() => remove(index)}>
        Delete
      </Button>
    ),
  },
];
export const ItemDetail = (props: any) => {
  const { name } = props;
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  console.log({ fields });
  return (
    <>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns?.map((x: any) => <TableCell>{x}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableHead>
          {fields?.map((item: any, index: any) => {
            return (
              <TableRow key={item.id}>
                {tableData?.(name, index, remove).map((x: any) => (
                  <TableCell key={x?.id}>
                    {x?.data}
                    {/* <RHFTextField name={`${name}.${index}.firstName`} /> */}
                  </TableCell>
                ))}
                {/* <TableCell>
                  <RHFTextField name={`${name}.${index}.firstName`} />
                </TableCell>
                <TableCell>
                  <RHFTextField name={`${name}.${index}.lastName`} />
                </TableCell>
                <TableCell>
                  <Button type="button" onClick={() => remove(index)}>
                    Delete
                  </Button>
                </TableCell> */}
              </TableRow>
            );
          })}
        </TableHead>
      </Table>
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
