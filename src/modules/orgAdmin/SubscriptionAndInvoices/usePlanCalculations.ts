import { useEffect, useState } from 'react';
import {
  PlanCalculationsParamsI,
  PlanCalculationsResultI,
} from './subscriptionAndInvoices.interface';

const usePlanCalculations = ({
  additionalDefaultUser,
  additionalDefaultStorage,
  additionalUserPrice,
  additionalStoragePrice,
  planDefaultPrice,
  planDefaultDiscount,

  PLAN_CALCULATIONS,
}: PlanCalculationsParamsI) => {
  const [planCalculations, setPlanCalculations] =
    useState<PlanCalculationsResultI>({
      perUserPrice: 0,
      perStoragePrice: 0,
      planPrice: 0,
      additionalUsers: 0,
      additionalStorage: 0,
      planDiscount: 0,
      planTax: 0,
      convertedPlanDiscount: 0,
      totalCostBeforeDiscount: 0,
      discountedPriceBeforeTax: 0,
      discountApplied: 0,
      taxAmount: 0,
      finalPrice: 0,
    });
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
