import { Grid, Typography } from '@mui/material';
import TemplateFrame from '../TemplateFrame/index';
import TemplatePlaceholder from '../TemplatePlaceholder';
import { RHFSearchableSelect } from '@/components/ReactHookForm';
import { styles } from './StepDeal.style';
import { createQuoteFormFields } from '../CreateQuote.data';
import TemplateBasic from '../TemplateBasic';
import useQuotes from '../../useQuotes';

const StepDeal = ({ openCreateDeal, values }: any) => {
  const { dataGetDeals } = useQuotes();
  const selectDealField = [
    {
      md: 12,
      component: RHFSearchableSelect,
      componentProps: {
        name: 'selectDeal',
        label: 'Select Deal',
        required: true,
        fullWidth: true,
        options: dataGetDeals?.data?.deals?.map((deal: any) => {
          return { value: deal?._id, label: deal?.name };
        }),
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
          <Grid container spacing={'22px'}>
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
            {createQuoteFormFields?.map((item: any, index) => {
              if (index === 0) {
                return null;
              } else if (index >= 1 && index <= 5) {
                return (
                  <Grid item xs={12} key={item.id}>
                    <item.component {...item.componentProps} size={'small'}>
                      {item?.componentProps?.select &&
                        item?.options?.map((option: any) => (
                          <option key={option?.value} value={option?.value}>
                            {option?.label}
                          </option>
                        ))}
                    </item.component>
                  </Grid>
                );
              } else {
                return null;
              }
            })}
          </Grid>
        </Grid>
        <Grid item xs={7}>
          <TemplateFrame>
            {values?.quoteTemplate === '' || values?.quoteTemplate == null ? (
              <TemplatePlaceholder />
            ) : (
              <TemplateBasic />
            )}
          </TemplateFrame>
        </Grid>
      </Grid>
    </>
  );
};

export default StepDeal;
