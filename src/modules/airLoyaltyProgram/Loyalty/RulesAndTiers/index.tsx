import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { Header } from './Header';
import { Tiers } from './Tiers';
import { Rules } from './Rules';
import { useRulesAndTiers } from './useRulesAndTiers';
import { RULES_AND_TIERS_ACTION_CONSTANTS } from './RulesAndTiers.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Permissions } from '@/constants/permissions';

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
        upsertTiersHandler={() =>
          setRulesAndTiersAction?.(
            RULES_AND_TIERS_ACTION_CONSTANTS?.UPSERT_TIERS,
          )
        }
      />
      <br />
      <HorizontalTabs tabsDataArray={['Tiers', 'Rules']}>
        <PermissionsGuard
          permissions={Permissions?.AIR_LOYALTY_PROGRAM_LOYALTY_TIERS}
        >
          <Tiers setRulesAndTiersAction={setRulesAndTiersAction} />
        </PermissionsGuard>
        <PermissionsGuard
          permissions={Permissions?.AIR_LOYALTY_PROGRAM_LOYALTY_RULES}
        >
          <Rules />
        </PermissionsGuard>
      </HorizontalTabs>
      {hasRulesAndTiersAction &&
        rulesAndTiersActionComponent?.[
          router?.query?.rulesAndTierAction as string
        ]}
    </>
  );
};
