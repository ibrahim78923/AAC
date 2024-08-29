interface ContractUtilization {
  label: string;
  color: string;
}

interface ContractUtilizationLabel {
  textLabel: string;
  heading: string;
}

export interface ContractUtilizationI {
  contractUtilizationData: ContractUtilization[];
  contractUtilizationLabel: ContractUtilizationLabel;
}
