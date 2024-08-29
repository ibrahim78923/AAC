import { Component } from 'react';

interface DataArray {
  id?: number;
  component?: Component;
  componentProps?: any;
  resolveIncident?: boolean;
  closeIncident?: boolean;
  serviceResolveIncident?: boolean;
  serviceCloseIncident?: boolean;
}

export interface IClosureRuleProps {
  resolveIncident?: boolean;
  closeIncident?: boolean;
  serviceResolveIncident?: boolean;
  serviceCloseIncident?: boolean;
  closeIncidentData?: DataArray[] | any;
  resolveIncidentData?: DataArray[] | any;
  serviceCloseData?: DataArray[] | any;
  serviceResolveData?: DataArray[] | any;
}
