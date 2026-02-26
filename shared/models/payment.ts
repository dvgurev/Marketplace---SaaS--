export interface Payment {
  id: string;
  userId: string;
  subscriptionId: string;
  yookassaPaymentId?: string;
  yookassaPaymentMethodId?: string;
  amount: number;
  currency: string;
  status: string;
  description?: string;
  paidAt?: Date;
  createdAt?: Date;
}
