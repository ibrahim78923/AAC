import CommonDrawer from '@/components/CommonDrawer';
import { drawerInitialState } from '../Association.data';
import { FormProvider, RHFRadioGroup } from '@/components/ReactHookForm';
import { useForm, useWatch } from 'react-hook-form';
import { TYPE_VALUES, getAssociateContactsColumns } from './Contacts.data';
import { useEffect, useState } from 'react';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { CircularProgress, Typography } from '@mui/material';
import { useLazyGetTicketsAssociatesContactsQuery } from '@/services/airServices/tickets/single-ticket-details/association';
import TanstackTable from '@/components/Table/TanstackTable';
import { PAGINATION } from '@/config';
import { useRouter } from 'next/router';
import { buildQueryParams } from '@/utils/api';
import ExistingContact from './ExistingContact';
import NewContact from './NewContact';

export default function Contacts({ isDrawerOpen, setIsDrawerOpen }: any) {
  const router = useRouter();

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const [selected, setSelected] = useState([]);

  const { ticketId } = router?.query;

  const methods = useForm({
    defaultValues: { type: TYPE_VALUES?.EXISTING_CONTACT },
  });
  const { control, reset } = methods;

  const type = useWatch({
    control,
    name: 'type',
    defaultValue: TYPE_VALUES?.EXISTING_CONTACT,
  });

  const [
    lazyGetTicketsAssociatesContactsTrigger,
    { data, isLoading, isFetching, isError, isSuccess },
  ] = useLazyGetTicketsAssociatesContactsQuery<any>();

  const getTicketsAssociatesContactsListData = async (
    currentPage: any = page,
  ) => {
    const additionalParams = [
      ['page', currentPage + ''],
      ['limit', pageLimit + ''],
      ['ticketId', ticketId],
    ];

    const getTicketsAssociatesContactsParam: any =
      buildQueryParams(additionalParams);

    const getTicketsAssociatesContactsParameter = {
      queryParams: getTicketsAssociatesContactsParam,
    };

    try {
      await lazyGetTicketsAssociatesContactsTrigger(
        getTicketsAssociatesContactsParameter,
      )?.unwrap();
    } catch (error: any) {}
  };

  useEffect(() => {
    getTicketsAssociatesContactsListData();
  }, [page, pageLimit]);

  const associateContactsColumns = getAssociateContactsColumns({});

  const onClose = () => {
    setIsDrawerOpen(drawerInitialState);
    reset();
  };

  const submitHandler = () => {
    if (type === TYPE_VALUES?.NEW_CONTACT) {
      return;
    }
    if (type === TYPE_VALUES?.EXISTING_CONTACT) {
      return;
    }
  };

  return (
    <>
      {isDrawerOpen?.contact && (
        <CommonDrawer
          isDrawerOpen={isDrawerOpen?.contact}
          onClose={onClose}
          title={
            type === TYPE_VALUES?.NEW_CONTACT
              ? 'Add Contacts'
              : 'Add Associate Contacts'
          }
          footer
          isOk
          okText={type === TYPE_VALUES?.NEW_CONTACT ? 'Submit' : 'Associate'}
          submitHandler={submitHandler}
        >
          <FormProvider methods={methods}>
            <RHFRadioGroup
              name={'type'}
              options={[
                { value: TYPE_VALUES?.NEW_CONTACT, label: 'New Contact' },
                {
                  value: TYPE_VALUES?.EXISTING_CONTACT,
                  label: 'Existing Contact',
                },
              ]}
            />
          </FormProvider>

          {type === TYPE_VALUES?.NEW_CONTACT ? (
            <NewContact />
          ) : (
            <ExistingContact setSelected={setSelected} selected={selected} />
          )}
        </CommonDrawer>
      )}

      <PermissionsGuard
        permissions={[AIR_SERVICES_TICKETS_TICKETS_DETAILS?.CONTACT_LIST_VIEW]}
      >
        <Typography variant={'h5'}>
          <Typography
            variant={'body1'}
            component={'span'}
            bgcolor={'secondary.main'}
            borderRadius={1}
            p={0.4}
            color={'common.white'}
            mr={0.5}
          >
            {isLoading || isFetching ? (
              <CircularProgress size={18} />
            ) : data?.data?.tickets?.length > 1 ? (
              data?.data?.tickets?.length
            ) : !!data?.data?.tickets?.[0]?.associateAssetsDetails?._id ? (
              data?.data?.tickets?.length
            ) : (
              0
            )}
          </Typography>
          Contacts
        </Typography>

        <TanstackTable
          columns={associateContactsColumns}
          data={
            data?.data?.tickets?.length > 1
              ? data?.data?.tickets
              : !!data?.data?.tickets?.[0]?.associateAssetsDetails?._id
                ? data?.data?.tickets
                : []
          }
          isPagination
          isSuccess={isSuccess}
          isError={isError}
          isFetching={isFetching}
          isLoading={isLoading}
          currentPage={
            data?.data?.tickets?.length > 1
              ? data?.data?.meta?.page
              : !!data?.data?.tickets?.[0]?.associateAssetsDetails?._id
                ? data?.data?.meta?.page
                : 0
          }
          count={
            data?.data?.tickets?.length > 1
              ? data?.data?.meta?.pages
              : !!data?.data?.tickets?.[0]?.associateAssetsDetails?._id
                ? data?.data?.meta?.pages
                : 0
          }
          totalRecords={
            data?.data?.tickets?.length > 1
              ? data?.data?.meta?.total
              : !!data?.data?.tickets?.[0]?.associateAssetsDetails?._id
                ? data?.data?.meta?.total
                : 0
          }
          pageLimit={data?.data?.meta?.limit}
          onPageChange={(page: any) => setPage(page)}
          setPage={setPage}
          setPageLimit={setPageLimit}
        />
      </PermissionsGuard>
    </>
  );
}
