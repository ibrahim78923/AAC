import { PAGINATION } from '@/config';
import { locationsListColumnsDynamic } from './Locations.data';
import { useEffect, useState } from 'react';
import { buildQueryParams } from '@/utils/api';
import { useLazyGetCommonMeetingsLocationsListQuery } from '@/services/commonFeatures/meetings/settings/locations';
import { DeleteLocations } from './DeleteLocations';
import { UpsertLocations } from './UpsertLocations';

export const useLocations = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [isPortalOpen, setIsPortalOpen] = useState<any>({});

  const [
    lazyGetCommonMeetingsLocationsListTrigger,
    lazyGetCommonMeetingsLocationsListStatus,
  ]: any = useLazyGetCommonMeetingsLocationsListQuery?.();

  const getMeetingsLocationListData = async (currentPage = page) => {
    const additionalParams = [
      ['page', currentPage + ''],
      ['limit', pageLimit + ''],
      ['search', search + ''],
    ];

    const rolesListParam: any = buildQueryParams(additionalParams);
    const apiDataParameter = {
      queryParams: rolesListParam,
    };
    try {
      await lazyGetCommonMeetingsLocationsListTrigger?.(
        apiDataParameter,
      )?.unwrap();
    } catch (error: any) {}
  };

  useEffect(() => {
    getMeetingsLocationListData?.();
  }, [page, search, pageLimit]);

  const locationsListColumns = locationsListColumnsDynamic(setIsPortalOpen);

  const portalComponentProps = {
    isPortalOpen,
    setIsPortalOpen,
    getMeetingsLocationListData: getMeetingsLocationListData,
    setPage: setPage,
    page: page,
    totalRecords:
      lazyGetCommonMeetingsLocationsListStatus?.data?.data?.meetinglocations
        ?.length,
  };

  const renderPortalComponent = () => {
    if (isPortalOpen?.isDelete) {
      return <DeleteLocations {...portalComponentProps} />;
    }
    if (isPortalOpen?.isUpsert) {
      return <UpsertLocations {...portalComponentProps} />;
    }
    return <></>;
  };

  return {
    locationsListColumns,
    lazyGetCommonMeetingsLocationsListStatus,
    setSearch,
    setPageLimit,
    setPage,
    renderPortalComponent,
    isPortalOpen,
    setIsPortalOpen,
  };
};
