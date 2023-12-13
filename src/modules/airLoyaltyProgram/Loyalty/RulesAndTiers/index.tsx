import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { Header } from './Header';
import { Tiers } from './Tiers';
import { Rules } from './Rules';
import { useRulesAndTiers } from './useRulesAndTiers';
import { RULES_AND_TIERS_ACTION_CONSTANTS } from './RulesAndTiers.data';

export const RulesAndTiers = () => {
  const {
    hasRulesAndTiersAction,
    rulesAndTiersActionComponent,
    router,
    setRulesAndTiersAction,
  } = useRulesAndTiers();
  return (
    <>
      <Header
        upsertRulesHandler={() =>
          setRulesAndTiersAction?.(
            RULES_AND_TIERS_ACTION_CONSTANTS?.UPSERT_RULES,
          )
        }
      />
      <br />
      <HorizontalTabs tabsDataArray={['Tiers', 'Rules']}>
        <Tiers />
        <Rules />
      </HorizontalTabs>
      {hasRulesAndTiersAction &&
        rulesAndTiersActionComponent?.[
          router?.query?.rulesAndTierAction as string
        ]}
    </>
  );
};
