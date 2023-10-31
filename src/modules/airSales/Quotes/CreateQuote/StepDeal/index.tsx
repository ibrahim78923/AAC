import { Grid, Typography } from '@mui/material';
import TemplateFrame from '../TemplateFrame/index';
import TemplatePlaceholder from '../TemplatePlaceholder';
import { RHFSearchableSelect } from '@/components/ReactHookForm';
import { styles } from './StepDeal.style';

const StepDeal = ({ openCreateDeal }: any) => {
  const selectDealField = [
    {
      md: 12,
      component: RHFSearchableSelect,
      componentProps: {
        name: 'selectDeal',
        label: 'Select Deal*',
        fullWidth: true,
        options: [
          { value: 'deal1', label: 'Deal Name 1' },
          { value: 'deal2', label: 'Deal Name 2' },
        ],
        isFooter: true,
        footerText: 'Create New Deal',
        footerActionHandler: openCreateDeal,
      },
    },
  ];
  return (
    <>
      <Grid container spacing={'40px'}>
        <Grid item xs={5}>
          <Grid container spacing={4}>
            {selectDealField?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item.id}>
                <item.component {...item.componentProps} size={'small'}>
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={option?.value} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>
                <Typography variant="body2" sx={styles.selectDealHelp}>
                  Once a deal is linked to a quote in this wizard, any
                  alterations you make will impact the attributes of the chosen
                  deal
                </Typography>
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
    </>
  );
};

export default StepDeal;
