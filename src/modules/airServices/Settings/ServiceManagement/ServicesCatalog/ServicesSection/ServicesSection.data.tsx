export const getServicesSectionDataArray = (result: any) => ({
  Cost: result?.cost ?? '---',
  'Estimated Delivery': result?.estimatedDelivery?.toLowerCase() ?? '---',
  Category: result?.categoryDetails?.categoryName,
  ...(result?.status && { Status: result?.status?.toLowerCase() }),
});
