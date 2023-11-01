import { KnowledgeBaseCard } from './KnowledgeBaseCard';
import { knowledgeBaseDataArray } from './KnowledgeBase.data';
import { Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

export const KnowledgeBase = () => {
  return (
    <Grid container gap={2} justifyContent={'center'}>
      {knowledgeBaseDataArray?.map((option: any) => (
        <KnowledgeBaseCard
          key={uuidv4()}
          name={option?.name}
          createdBy={option?.createdBy}
          createdDate={option?.createdDate}
        />
      ))}
    </Grid>
  );
};
