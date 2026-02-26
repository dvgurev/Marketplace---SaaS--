-- Initial database schema for Marketplace SaaS platform
-- PostgreSQL dialect

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  company_name VARCHAR(255),
  phone VARCHAR(50),
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  is_email_verified BOOLEAN NOT NULL DEFAULT false,
  avatar_url TEXT,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  short_description VARCHAR(500),
  logo_url TEXT,
  preview_images JSONB,
  category VARCHAR(100),
  features JSONB,
  docker_image VARCHAR(255) NOT NULL,
  default_cpu_limit DECIMAL(3,2) DEFAULT 0.5,
  default_memory_limit VARCHAR(20) DEFAULT '512m',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

CREATE TABLE service_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID REFERENCES services(id),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100),
  description TEXT,
  price_monthly DECIMAL(10,2) NOT NULL,
  price_yearly DECIMAL(10,2) NOT NULL,
  max_users INTEGER,
  max_projects INTEGER,
  max_storage_mb INTEGER,
  features JSONB,
  is_popular BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  service_id UUID REFERENCES services(id),
  subdomain VARCHAR(255) NOT NULL UNIQUE,
  container_id VARCHAR(255),
  container_port INTEGER,
  cpu_limit DECIMAL(3,2),
  memory_limit VARCHAR(20),
  status VARCHAR(50),
  deployed_at TIMESTAMP WITHOUT TIME ZONE,
  last_active_at TIMESTAMP WITHOUT TIME ZONE,
  scheduled_deletion TIMESTAMP WITHOUT TIME ZONE,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  service_id UUID REFERENCES services(id),
  plan_id UUID REFERENCES service_plans(id),
  yookassa_payment_method_id VARCHAR(255),
  status VARCHAR(50) NOT NULL,
  billing_cycle VARCHAR(20),
  current_period_start TIMESTAMP WITHOUT TIME ZONE NOT NULL,
  current_period_end TIMESTAMP WITHOUT TIME ZONE NOT NULL,
  trial_start TIMESTAMP WITHOUT TIME ZONE,
  trial_end TIMESTAMP WITHOUT TIME ZONE,
  cancel_at_period_end BOOLEAN NOT NULL DEFAULT false,
  cancelled_at TIMESTAMP WITHOUT TIME ZONE,
  tenant_id UUID REFERENCES tenants(id),
  metadata JSONB,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  subscription_id UUID REFERENCES subscriptions(id),
  yookassa_payment_id VARCHAR(255),
  yookassa_payment_method_id VARCHAR(255),
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'RUB',
  status VARCHAR(50) NOT NULL,
  description TEXT,
  paid_at TIMESTAMP WITHOUT TIME ZONE,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

-- Trigger functions to update updated_at timestamp
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- apply triggers for every table with updated_at
DO $$
DECLARE
  tbl text;
BEGIN
  FOR tbl IN SELECT table_name FROM information_schema.columns WHERE column_name = 'updated_at' LOOP
    EXECUTE format('CREATE TRIGGER %I_update_timestamp BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();', tbl, tbl);
  END LOOP;
END;
$$;
