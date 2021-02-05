// Data Types
declare interface LicenseInfo {
  type: number;
  expireDate: string;
  quantity: number;
}
declare interface LicenseUsageData {
  date: string;
  quantity: number;
}
// State types
declare interface LicenseState {
  isCounting: boolean;
  shouldLogout: boolean;
  start: Date;
  licenseInfo?: LicenseInfo;
  licenseUsage?: Array<LicenseUsageData>;
  dateInterval: DateInterval;
  selectedDate: string /* DD/MM/YYYY */;
}
