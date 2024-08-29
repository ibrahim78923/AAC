interface UsageActivity {
  label: string;
  color: string;
}

interface UsageActivityLabel {
  textLabel: string;
  heading: string;
}

export interface UsageActivityI {
  usageActivityData: UsageActivity[];
  usageActivityLabel: UsageActivityLabel;
}
