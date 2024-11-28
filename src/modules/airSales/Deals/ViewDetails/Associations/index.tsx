import { Box, Grid, Typography } from '@mui/material';
import { styles } from '../ViewDetails.style';
import Attachments from './Attachments';
import Companies from './Companies';
import Tickets from './Tickets';
import Contacts from './Contacts';
import Products from './Products';
import Quotes from './Quotes';
import useAssociations from './useAssociations';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { AssociationsProps } from './Associations-interface';

const Associations = (props: AssociationsProps) => {
  const { selected, viewDeal } = props;

  const sectionId = useSearchParams()?.get('section-id');
  const {
    assocaitionData,
    isLoading,
    setSearchContacts,
    setSearchCompanies,
    setSearchQuotes,
    associationDataFetching,
  } = useAssociations(selected);

  const router = useRouter();
  useEffect(() => {
    if (sectionId) {
      router.push('/air-sales/deals/view-details?tab-value=2#companies');
    }
  }, [sectionId]);

  return (
    <Box sx={styles?.horizontalTabsBox}>
      <Typography variant="h4">Associations </Typography>
      <Box sx={styles?.horizontalTabsInnnerBox}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Contacts
              contactsData={assocaitionData?.contacts}
              dealId={selected}
              isLoading={isLoading || associationDataFetching}
              handleSearch={setSearchContacts}
            />
          </Grid>
          <Grid item xs={12}>
            <Tickets isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} id="companies">
            <Companies
              companiesData={assocaitionData?.companies}
              dealId={selected}
              isLoading={isLoading || associationDataFetching}
              handleSearch={setSearchCompanies}
            />
          </Grid>
          <Grid item xs={12}>
            <Products viewDeal={viewDeal} dealId={selected} />
          </Grid>
          <Grid item xs={12}>
            <Quotes
              quotesData={assocaitionData?.quotes}
              isLoading={isLoading || associationDataFetching}
              dealId={selected}
              setSearchQuotes={setSearchQuotes}
            />
          </Grid>
          <Grid item xs={12}>
            <Attachments dealId={selected} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Associations;
