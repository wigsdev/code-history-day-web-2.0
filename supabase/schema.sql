-- Tabla principal de efemérides
CREATE TABLE IF NOT EXISTS ephemerides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  year INTEGER NOT NULL,
  title VARCHAR(100) NOT NULL,
  description VARCHAR(500) NOT NULL,
  category VARCHAR(20) NOT NULL CHECK (category IN ('OS', 'Language', 'Hardware', 'Company', 'Web', 'AI', 'Innovation', 'Other')),
  impact VARCHAR(10) NOT NULL CHECK (impact IN ('high', 'medium', 'low')),
  source VARCHAR(10) DEFAULT 'ai' CHECK (source IN ('ai', 'cache', 'manual')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_ephemerides_date ON ephemerides(date DESC);
CREATE INDEX IF NOT EXISTS idx_ephemerides_category ON ephemerides(category);
CREATE INDEX IF NOT EXISTS idx_ephemerides_created_at ON ephemerides(created_at DESC);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at
CREATE TRIGGER update_ephemerides_updated_at
  BEFORE UPDATE ON ephemerides
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security (RLS)
ALTER TABLE ephemerides ENABLE ROW LEVEL SECURITY;

-- Política: Permitir lectura pública
CREATE POLICY "Permitir lectura pública de efemérides"
  ON ephemerides
  FOR SELECT
  USING (true);

-- Política: Permitir inserción solo con service_role
CREATE POLICY "Permitir inserción con service_role"
  ON ephemerides
  FOR INSERT
  WITH CHECK (true);

-- Política: Permitir actualización solo con service_role
CREATE POLICY "Permitir actualización con service_role"
  ON ephemerides
  FOR UPDATE
  USING (true);
