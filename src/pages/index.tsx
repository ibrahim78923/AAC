import AuthGuard from '@/GuardsAndPermissions/AuthGuard';
import ProductSuite from '@/modules/productSuite';

export default function Home() {
  return <ProductSuite />;
}

Home.getLayout = function getLayout(page: any) {
  return <AuthGuard>{page}</AuthGuard>;
  // return page;
};
