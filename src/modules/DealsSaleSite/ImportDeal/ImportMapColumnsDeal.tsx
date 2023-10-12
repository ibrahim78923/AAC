import { useState } from 'react';
import {
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
} from '@mui/material';
import Available from '../../../assets/images/shared/available.png';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { ImportDealsData } from '@/mock/modules/DealsTableData/importDealsData';

const ImportMapColumnsDeal = () => {
  const [fieldsValue, setFieldsValue] = useState<any>({
    dealName: '',
    dealValue: '',
    dealStage: '',
    dealPipline: '',
  });

  const handleChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFieldsValue({ ...fieldsValue, [name]: value });
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>File Columns</TableCell>
          <TableCell sx={{ width: '200px' }}>CRM Fields</TableCell>
          <TableCell>Mapped</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {ImportDealsData.map((data, i) => (
          <TableRow key={uuidv4()}>
            <TableCell align="left">{data.fileColumn}</TableCell>
            <TableCell align="left" sx={{ width: '200px' }}>
              <CustomSelect
                index={i}
                handleChange={handleChange}
                value={fieldsValue[data.selectProps.name]}
                options={data.options}
                {...data.selectProps}
              />
            </TableCell>
            <TableCell align="center">
              <Image
                src={Available}
                alt={'icon' + i}
                style={{
                  opacity: fieldsValue[data.selectProps.name] ? 1 : 0.7,
                  margin: '0px auto',
                }}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ImportMapColumnsDeal;

const CustomSelect = ({
  handleChange,
  value,
  options,
  index,
  ...rest
}: any) => {
  return (
    <FormControl fullWidth>
      <InputLabel
        sx={{
          transform: 'translate(14px, 8px) scale(1) !important',
          '&.MuiInputLabel-shrink': {
            transform: 'translate(14px, -8px) scale(1) !important',
            fontSize: '12px',
          },
        }}
        id={'select-label' + index}
      >
        {rest.label}
      </InputLabel>
      <Select
        size="small"
        labelId={'select-label' + index}
        id={'select' + index}
        value={value}
        onChange={handleChange}
        {...rest}
      >
        {options.map((option: any) =>
          option.head ? (
            <ListSubheader key={option.head}>{option.head}</ListSubheader>
          ) : (
            <MenuItem value={option.value} key={option.value}>
              {option.label}
            </MenuItem>
          ),
        )}
      </Select>
    </FormControl>
  );
};
