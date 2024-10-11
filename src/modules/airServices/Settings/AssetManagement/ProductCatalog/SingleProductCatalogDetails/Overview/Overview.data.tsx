export const OverviewData = (data: any) => [
  { 'Asset Type': data?.assetType?.name ?? '-' },
  { Status: data?.status?.replaceAll?.('_', ' ') ?? '-' },
  { Manufacture: data?.manufacturer },
  { 'Mode of Procurement': data?.modeOfProcurement ?? '-' },
  { Description: data?.description ?? '-' },
];
