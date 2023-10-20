import { FC } from 'react';
import { Autocomplete, Box, TextField } from '@mui/material';
import { itemsDetailsList } from './itemsDetails.data';
import useItemsDetails from './useItemsDetails';
import { styles } from './ItemsDetails.style';

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
        id="serviceName"
        disableClearable
        options={data?.map((option: any) => option.itemName)}
        onChange={(_, v) => handleSelectItem(v, data, index)}
        value={detailItem?.['serviceName']}
        renderInput={(params) => (
          <TextField
            name="serviceName"
            {...params}
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
            onChange={handleChange}
          />
        )}
        sx={{ flex: 1 }}
      />
      {itemsDetailsList
        ?.slice(1)
        ?.map((item) => (
          <TextField
            key={item?.value}
            name={item?.value}
            value={detailItem?.[item?.value]}
            onChange={handleChange}
            type={item?.value === 'serviceName' ? 'text' : 'number'}
            sx={{ flex: 1 }}
          />
        ))}
    </Box>
  );
};

export default DetailsListItem;
