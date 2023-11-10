import { KnowledgeBaseCard } from './KnowledgeBaseCard';
import { knowledgeBaseDataArray } from './KnowledgeBase.data';
import { Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import NoData from '@/components/NoData';
import { NoAssociationFoundImage } from '@/assets/images';

export const KnowledgeBase = () => {
  return (
    <Grid container gap={1}>
      {!!knowledgeBaseDataArray?.length ? (
        knowledgeBaseDataArray?.map((option: any) => (
          <KnowledgeBaseCard
            key={uuidv4()}
            id={option?.id}
            name={option?.name}
            createdBy={option?.createdBy}
            createdDate={option?.createdDate}
          />
        ))
      ) : (
        <NoData
          message="There are no knowledge base articles available"
          image={NoAssociationFoundImage}
        />
      )}
    </Grid>
  );
};
