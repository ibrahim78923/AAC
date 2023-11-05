import NoData from '@/components/NoData';
import { Typography, useTheme } from '@mui/material';
import { contractData } from './Contract.data';
import { InventoryCard } from '@/components/InventoryCard/index';
import { v4 as uuidv4 } from 'uuid';
import { contractImage } from '@/assets/images';

export const Contract = () => {
  const theme: any = useTheme();
  return (
    <>
      {!!contractData?.length ? (
        contractData?.map((singleContract: any) => (
          <InventoryCard
            heading={singleContract?.heading}
            status={singleContract?.status}
            key={uuidv4()}
            showChild
          >
            <Typography color={theme?.palette?.grey?.[900]}>
              {singleContract?.body}
            </Typography>
          </InventoryCard>
        ))
      ) : (
        <NoData
          image={contractImage}
          message={'There are no active contract available'}
        />
      )}
    </>
  );
};
