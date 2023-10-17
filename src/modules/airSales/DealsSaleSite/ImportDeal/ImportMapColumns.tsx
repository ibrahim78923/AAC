import Image from 'next/image';

import {
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
} from '@mui/material';

import { ImportDealsData } from '@/mock/modules/airSales/Deals/ImportDeals';
import UseImportDeal from './useImportDeal';

import { AvailableImage } from '@/assets/images';

import { v4 as uuidv4 } from 'uuid';

import { styles } from './importDeal.style';

const ImportMapColumns = () => {
  const { handleChange, fieldsValue } = UseImportDeal();

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
                src={AvailableImage}
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

export default ImportMapColumns;

const CustomSelect = ({
  handleChange,
  value,
  options,
  index,
  ...rest
}: any) => {
  return (
    <FormControl fullWidth>
      <InputLabel sx={styles.inputLabel} id={'select-label' + index}>
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
