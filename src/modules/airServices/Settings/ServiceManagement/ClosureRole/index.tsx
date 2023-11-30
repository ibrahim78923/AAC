import { Header } from './Header';
import { IncidentClosureRule } from './IncidentClosureRule';
import { ServicesRequestClosureRule } from './ServicesRequestClosureRule';

export const ClosureRole = () => {
  return (
    <>
      <Header />
      <br />
      <IncidentClosureRule />
      <br />
      <ServicesRequestClosureRule />
    </>
  );
};
