import SkeletonFormExample from '@/components/Skeletons/SkeletonForm/SkeletonForm.example';
import SkeletonTableExample from '@/components/Skeletons/SkeletonTable/SkeletonTable.example';
import TanstackTable from '@/components/Tabel/TanstackTable';
import HorizontalTabsExample from '@/components/Tabs/HorizontalTabs/HorizontalTabs.example';
import SuperAdminLayout from '@/layouts/SuperAdminLayout';
// import SuperAdminLayout from '@/layouts/SuperAdminLayout/SuperAdminLayout';
import { TicketsLists } from '@/modules/ServicesTickets/TicketsLists';
import { Button, Checkbox } from '@mui/material';
import { useSnackbar } from 'notistack';
export const TestComponentsNoumanPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const data: any = [
    {
      Id: 1,
      articles: ` @olivia`,
      status: 'Drafts',
      insertedTickets: 'Sharemydine',
      Author: 'Alee',
      folder: 'Tech Support',
    },
    {
      Id: 2,
      articles: `@olivia`,
      status: 'Drafts',
      insertedTickets: 'Sharemydine',
      Author: 'Alee',
      folder: 'Release',
    },
    {
      Id: 3,
      articles: `@olivia`,
      status: 'Drafts',
      insertedTickets: 'Sharemydine',
      Author: 'Alee',
      folder: 'Tech support 3',
    },
  ];
  const columns: any = [
    {
      accessorFn: (row: any) => row.Id,
      id: 'Id',
      cell: (info: any) => <Checkbox color="primary" name={info.getValue()} />,
      header: <Checkbox color="primary" name="Id" />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.articles,
      id: 'Article',
      cell: (info: any) => info.getValue(),
      header: 'gog',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.status,
      id: 'Status',
      isSortable: true,
      header: '25',
      cell: (info: any) => info.getValue(),
    },
  ];
  return (
    <>
      <HorizontalTabsExample />
      <br />
      <SkeletonTableExample />
      <br />
      <SkeletonFormExample />
      <br />
      <br />
      <Button
        variant="contained"
        onClick={() =>
          enqueueSnackbar(`Details Submitted Successfully`, {
            variant: 'success',
          })
        }
      >
        Show Alert
      </Button>
      <br />
      <>Table</>
      <TanstackTable columns={columns} data={data} />
      <TicketsLists />
    </>
  );
};

TestComponentsNoumanPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
export default TestComponentsNoumanPage;
