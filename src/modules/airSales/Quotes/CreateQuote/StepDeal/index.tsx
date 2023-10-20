import { Grid } from '@mui/material';
import TemplateFrame from '../TemplateFrame/index';
import TemplatePlaceholder from '../TemplatePlaceholder';
import { formFields } from './StepDeal.data';

const StepDeal = () => {
  return (
    <Grid container spacing={'40px'}>
      <Grid item xs={5}>
        <Grid container spacing={4}>
          {formFields?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item.id}>
              <item.component {...item.componentProps} size={'small'}>
                {item?.componentProps?.select &&
                  item?.options?.map((option: any) => (
                    <option key={option?.value} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
              </item.component>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={7}>
        <TemplateFrame>
          <TemplatePlaceholder />
        </TemplateFrame>
      </Grid>
    </Grid>
  );
};

export default StepDeal;
