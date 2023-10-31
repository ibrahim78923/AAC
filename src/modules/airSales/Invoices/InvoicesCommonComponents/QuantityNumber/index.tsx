import { TextField } from '@mui/material';

export const QuantityNumber = (props: any) => {
  const { data } = props;
  return (
    <TextField
      type="number"
      inputProps={{
        min: 0,
        max: 100,
        step: 1,
      }}
      value={data.getValue()}
      size="small"
    />
  );
};
