import { useEffect, useState } from 'react';

const usePlanCalculations = ({
  additionalDefaultUser,
  additionalDefaultStorage,
  additionalUserPrice,
  additionalStoragePrice,
  planDefaultPrice,
  planDefaultDiscount,

  PLAN_CALCULATIONS,
}: any) => {
  const [planCalculations, setPlanCalculations] = useState<any>(null);
  useEffect(() => {
    const perUserPrice = additionalUserPrice || 0;
    const perStoragePrice = additionalStoragePrice || 0;
    const planPrice = planDefaultPrice || 0;
    const additionalUsers = (additionalDefaultUser || 0) * perUserPrice;
    const additionalStorage = (additionalDefaultStorage || 0) * perStoragePrice;

    const planDiscount = planDefaultDiscount || 0;
    const planTax = PLAN_CALCULATIONS?.PLAN_DISCOUNT || 0.2; // By default, 20% discount
    const convertedPlanDiscount = planDiscount / 100;
    const totalCostBeforeDiscount =
      planPrice + additionalUsers + additionalStorage;
    const discountedPriceBeforeTax =
      totalCostBeforeDiscount - totalCostBeforeDiscount * convertedPlanDiscount; //discout formula;
    const discountApplied = totalCostBeforeDiscount - discountedPriceBeforeTax;
    const taxAmount = discountedPriceBeforeTax * planTax;
    const finalPrice = discountedPriceBeforeTax + taxAmount;

    setPlanCalculations({
      perUserPrice,
      perStoragePrice,
      planPrice,
      additionalUsers,
      additionalStorage,
      planDiscount,
      planTax,
      convertedPlanDiscount,
      totalCostBeforeDiscount,
      discountedPriceBeforeTax,
      discountApplied,
      taxAmount,
      finalPrice,
    });
  }, [
    additionalDefaultUser,
    additionalDefaultStorage,
    additionalUserPrice,
    additionalStoragePrice,
    planDefaultPrice,
    planDefaultDiscount,
    PLAN_CALCULATIONS,
  ]);

  return planCalculations;
};

export default usePlanCalculations;
