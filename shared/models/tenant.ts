export interface Tenant {
  id: string;
  userId: string;
  serviceId: string;
  subscriptionId: string;
  subdomain: string;
  containerId?: string;
  containerPort?: number;
  cpuLimit?: number;
  memoryLimit?: string;
  status?: string;
  deployedAt?: Date;
  lastActiveAt?: Date;
  scheduledDeletion?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
