-- Crear extensión para UUID si no existe
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Crear tipos ENUM
CREATE TYPE user_role AS ENUM ('admin', 'technician', 'user');
CREATE TYPE installation_status AS ENUM ('pending', 'inProgress', 'completed', 'cancelled');
CREATE TYPE inspection_status AS ENUM ('pending', 'inProgress', 'completed', 'cancelled');
CREATE TYPE evidence_type AS ENUM ('installation', 'inspection');
CREATE TYPE image_type AS ENUM (
  'antenna_installation',
  'fiber_installation',
  'nap_connection',
  'router_configuration',
  'signal_test',
  'speed_test',
  'client_signature',
  'inspection_evidence',
  'other'
);

-- 1. Tablas de Infraestructura
CREATE TABLE areas (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE towers (
  id SERIAL PRIMARY KEY,
  area_id INTEGER NOT NULL REFERENCES areas(id) ON DELETE RESTRICT,
  name VARCHAR(100) NOT NULL,
  location_lat DECIMAL(10,8),
  location_lon DECIMAL(11,8),
  height DECIMAL(10,2),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sectors (
  id SERIAL PRIMARY KEY,
  tower_id INTEGER NOT NULL REFERENCES towers(id) ON DELETE RESTRICT,
  name VARCHAR(100) NOT NULL,
  azimuth INTEGER CHECK (azimuth >= 0 AND azimuth <= 360),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE fiber (
  id SERIAL PRIMARY KEY,
  area_id INTEGER NOT NULL REFERENCES areas(id) ON DELETE RESTRICT,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE naps (
  id SERIAL PRIMARY KEY,
  fiber_id INTEGER NOT NULL REFERENCES fiber(id) ON DELETE RESTRICT,
  name VARCHAR(100) NOT NULL,
  location_lat DECIMAL(10,8),
  location_lon DECIMAL(11,8),
  ports_total INTEGER NOT NULL,
  ports_used INTEGER DEFAULT 0,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabla de Usuarios
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(15) NOT NULL UNIQUE,
  full_name VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  role user_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tablas de Instalaciones e Inspecciones
CREATE TABLE installations (
  id SERIAL PRIMARY KEY,
  area_id INTEGER NOT NULL REFERENCES areas(id) ON DELETE RESTRICT,
  sector_id INTEGER REFERENCES sectors(id) ON DELETE RESTRICT,
  fiber_id INTEGER REFERENCES fiber(id) ON DELETE RESTRICT,
  nap_id INTEGER REFERENCES naps(id) ON DELETE RESTRICT,
  client_id VARCHAR(20) NOT NULL,
  client_name VARCHAR(100) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  ip_address VARCHAR(15) NOT NULL UNIQUE,
  mac_address VARCHAR(17) NOT NULL UNIQUE,
  status installation_status DEFAULT 'pending',
  technician_id INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  installation_date TIMESTAMP WITH TIME ZONE NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE inspections (
  id SERIAL PRIMARY KEY,
  installation_id INTEGER NOT NULL REFERENCES installations(id) ON DELETE RESTRICT,
  technician_id INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  status inspection_status DEFAULT 'pending',
  scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE,
  findings TEXT,
  recommendations TEXT,
  signal_strength DECIMAL(5,2) CHECK (signal_strength >= -100 AND signal_strength <= 0),
  download_speed DECIMAL(10,2) CHECK (download_speed >= 0),
  upload_speed DECIMAL(10,2) CHECK (upload_speed >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tablas de Evidencias
CREATE TABLE evidence (
  id SERIAL PRIMARY KEY,
  installation_id INTEGER REFERENCES installations(id) ON DELETE RESTRICT,
  inspection_id INTEGER REFERENCES inspections(id) ON DELETE RESTRICT,
  type evidence_type NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  description TEXT,
  uploaded_by INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT either_installation_or_inspection CHECK (
    (installation_id IS NOT NULL AND inspection_id IS NULL) OR
    (installation_id IS NULL AND inspection_id IS NOT NULL)
  )
);

CREATE TABLE evidence_images (
  id SERIAL PRIMARY KEY,
  evidence_id INTEGER NOT NULL REFERENCES evidence(id) ON DELETE CASCADE,
  image_type image_type NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  description TEXT,
  uploaded_by INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para mejorar el rendimiento
CREATE INDEX idx_installations_client_id ON installations(client_id);
CREATE INDEX idx_installations_ip_address ON installations(ip_address);
CREATE INDEX idx_installations_mac_address ON installations(mac_address);
CREATE INDEX idx_evidence_installation_id ON evidence(installation_id);
CREATE INDEX idx_evidence_inspection_id ON evidence(inspection_id);
CREATE INDEX idx_evidence_images_evidence_id ON evidence_images(evidence_id);

-- Triggers para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_areas_updated_at
    BEFORE UPDATE ON areas
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_towers_updated_at
    BEFORE UPDATE ON towers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sectors_updated_at
    BEFORE UPDATE ON sectors
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_fiber_updated_at
    BEFORE UPDATE ON fiber
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_naps_updated_at
    BEFORE UPDATE ON naps
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_installations_updated_at
    BEFORE UPDATE ON installations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inspections_updated_at
    BEFORE UPDATE ON inspections
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_evidence_updated_at
    BEFORE UPDATE ON evidence
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_evidence_images_updated_at
    BEFORE UPDATE ON evidence_images
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
