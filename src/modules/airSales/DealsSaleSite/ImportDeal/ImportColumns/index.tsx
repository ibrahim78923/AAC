import Image from 'next/image';

import {
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
} from '@mui/material';

import { ImportDealsData } from '@/mock/modules/airSales/Deals/ImportDeals';
import UseImportDeal from '../useImportDeal';
import CustomSelect from './CustomSelect';

import { AvailableImage } from '@/assets/images';

import { v4 as uuidv4 } from 'uuid';

const ImportColumns = () => {
  const { fieldsValue, handleChange } = UseImportDeal();

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
                id={i}
                options={data.options}
                handleChange={handleChange}
                value={fieldsValue[data.selectProps.name]}
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

export default ImportColumns;
