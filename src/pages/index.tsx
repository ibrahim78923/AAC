import AuthGuard from '@/GuardsAndPermissions/AuthGuard';

export default function Home() {
  return <div> Air Sales </div>;
}

Home.getLayout = function getLayout(page: any) {
  return <AuthGuard>{page}</AuthGuard>;
};
