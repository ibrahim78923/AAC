import { Box } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { useDesign } from './useDesign';
import { data } from './Design.data';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_LOYALTY_PROGRAM } from '@/constants';

export const Design = () => {
  const { designColumns, setSearch, theme, router }: any = useDesign();
  return (
    <>
      <PageTitledHeader
        title={'Physical Gift Cards Designs'}
        canMovedBack
        moveBack={() => {
          router?.push(AIR_LOYALTY_PROGRAM?.GIFT_CARDS);
        }}
      />
      <Box
        borderRadius={2}
        border={`1px solid ${theme?.palette?.custom?.off_white_three}`}
      >
        <br />
        <Box px={2}>
          <Search label="Search Here" setSearchBy={setSearch} />
        </Box>
        <br />
        <TanstackTable data={data} columns={designColumns} isPagination />
      </Box>
    </>
  );
};
