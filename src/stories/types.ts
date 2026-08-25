export interface IBaseProps {
  id?: string;
  className?: string;
  style?: any;
}
export interface IAnalyticsData {
  eventName?: string;
  data?: any;
}
export interface IAnalyticsEvents {
  tag?: IAnalyticsData;
  generateAnalytics?: any;
}
