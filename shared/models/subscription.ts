export interface Subscription {
  id: string;
  userId: string;
  serviceId: string;
  planId: string;
  yookassaPaymentMethodId?: string;
  status: 'active' | 'past_due' | 'canceled' | string;
  billingCycle?: 'monthly' | 'yearly' | string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  trialStart?: Date;
  trialEnd?: Date;
  cancelAtPeriodEnd: boolean;
  cancelledAt?: Date;
  tenantId?: string;
  metadata?: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
}
