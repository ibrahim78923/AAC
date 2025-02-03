import { useUsers } from './useUsers';
import { UsersList } from './UsersList';
import { Header } from './Header';

export const Users = () => {
  const {
    usersData,
    setUsersData,
    page,
    setPage,
    isPortalOpen,
    setIsPortalOpen,
    search,
    setSearch,
  } = useUsers();

  return (
    <>
      <Header
        setUsersData={setUsersData}
        usersData={usersData}
        page={page}
        setPage={setPage}
        search={search}
        setSearch={setSearch}
        isPortalOpen={isPortalOpen}
        setIsPortalOpen={setIsPortalOpen}
      />
      <br />
      <UsersList
        setUsersData={setUsersData}
        usersData={usersData}
        page={page}
        setPage={setPage}
        search={search}
        setSearch={setSearch}
        isPortalOpen={isPortalOpen}
        setIsPortalOpen={setIsPortalOpen}
      />
    </>
  );
};
