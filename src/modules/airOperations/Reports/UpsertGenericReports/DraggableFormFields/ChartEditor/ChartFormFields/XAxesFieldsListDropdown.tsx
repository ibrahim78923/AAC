import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { COLLECTION_NAME } from '@/constants/strings';

export const XAxesFieldsListDropdown = (props: any) => {
  const { xAxisData, productId, singleFieldDropdown } = props;

  return (
    <RHFAutocompleteAsync
      size="small"
      name="xAxisType"
      label={`${xAxisData?.label} Fields`}
      multiple={true}
      apiQuery={singleFieldDropdown}
      getOptionLabel={(option: any) =>
        xAxisData?.ref === COLLECTION_NAME?.LOCATION
          ? option?.locationName
          : xAxisData?.ref === COLLECTION_NAME?.USERS
            ? `${option?.firstName} ${option?.lastName}`
            : option?.name
      }
      placeholder="Select Option"
      externalParams={{
        ...(xAxisData?.ref != COLLECTION_NAME?.USERS && {
          meta: false,
        }),
        ...(xAxisData?.ref === COLLECTION_NAME?.USERS && {
          productId: productId,
        }),
      }}
    />
  );
};
