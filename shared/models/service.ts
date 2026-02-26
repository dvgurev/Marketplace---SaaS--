export interface Service {
  id: string;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  logoUrl?: string;
  previewImages?: string[]; // array of urls
  category?: string;
  features?: Record<string, any>;
  dockerImage: string;
  defaultCpuLimit?: number;
  defaultMemoryLimit?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
