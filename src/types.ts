export type ThemeMode = 'day' | 'night' | 'signal';

export interface RouteOption {
  carrier: string;
  carrierLogo: string;
  service: string;
  cost: number;
  currency: string;
  transitDays: number;
  reliability: number;
  carbonScore: string;
  isAiRecommended?: boolean;
  savings?: number;
}

export interface ShipmentItem {
  id: string;
  origin: string;
  destination: string;
  carrier: string;
  status: 'In Transit' | 'Delivered' | 'Customs' | 'Out for Delivery' | 'Sorted';
  eta: string;
  cost: number;
  weight: string;
  type: string;
  timestamp: string;
}

export interface IntegrationCard {
  id: string;
  name: string;
  category: 'store' | 'carrier' | 'erp';
  icon: string;
  color: string;
  latency: string;
  throughput: string;
  features: string[];
  samplePayload: Record<string, unknown>;
}
