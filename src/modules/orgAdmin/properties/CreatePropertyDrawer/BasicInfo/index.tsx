import { Grid } from '@mui/material';
import { basicInfoFields } from '../CreatePropertyDrawer.data';

const BasicInfo = () => {
  return (
    <Grid container spacing={2} sx={{ p: 0 }}>
      {basicInfoFields()?.map((item: any) => (
        <Grid item xs={12} md={item?.md} key={item?.componentProps?.name}>
          <item.component size="small" {...item?.componentProps} />
        </Grid>
      ))}
    </Grid>
  );
};

export default BasicInfo;
