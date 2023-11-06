import { FC } from 'react';
import { Autocomplete, Box, TextField } from '@mui/material';
import {
  itemsDetailsList,
  itemsDetailsSubList,
} from '../../../NewPurchaseOrder.data';
import useItemsDetails from '../../useItemsDetails';
import { styles } from '../../ItemsDetails.style';
import { v4 as uuidv4 } from 'uuid';

const DetailsListItem: FC<{
  data: any;
  values: any;
  index: number;
}> = (props) => {
  const { data, index } = props;
  const { detailItem, handleChange, handleSelectItem } = useItemsDetails();
  const { flexBetween } = styles();

  return (
    <Box sx={{ ...flexBetween }}>
      <Autocomplete
        freeSolo
        id="itemName"
        disableClearable
        options={data?.map((option: any) => option?.itemName)}
        onChange={(_, v) => handleSelectItem(v, data, index)}
        value={detailItem?.['itemName']}
        renderInput={(params) => (
          <TextField
            name="itemName"
            {...params}
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
            onChange={handleChange}
          />
        )}
        sx={{ flex: 3 }}
      />
      {itemsDetailsList
        ?.slice(1)
        ?.map((item) => (
          <TextField
            key={uuidv4()}
            name={item?.value}
            value={detailItem?.[item?.value]}
            onChange={handleChange}
            type={item?.value === 'description' ? 'text' : 'number'}
            sx={{ flex: itemsDetailsSubList?.includes(item?.value) ? 3 : 1 }}
          />
        ))}
    </Box>
  );
};

export default DetailsListItem;
