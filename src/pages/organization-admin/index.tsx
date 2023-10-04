import Organization from '@/modules/Organization';
import React from 'react';

// const OrganizationPage = () => {
//   return <Organization/>
// }

// export default OrganizationPage

import SuperAdminLayout from '../../layout';
function OrganizationPage() {
  return (
    <div>
      <Organization />
    </div>
  );
}
export default OrganizationPage;
OrganizationPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
