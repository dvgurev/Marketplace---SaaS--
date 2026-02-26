export interface ServicePlan {
  id: string;
  serviceId: string;
  name: string;
  slug?: string;
  description?: string;
  priceMonthly: number;
  priceYearly: number;
  maxUsers?: number;
  maxProjects?: number;
  maxStorageMb?: number;
  features?: Record<string, any>;
  isPopular: boolean;
  isActive: boolean;
  sortOrder?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
