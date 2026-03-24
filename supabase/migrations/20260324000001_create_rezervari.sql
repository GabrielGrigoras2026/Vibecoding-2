-- Creare tabel rezervări
CREATE TABLE rezervari (
  id BIGSERIAL PRIMARY KEY,
  nume TEXT NOT NULL,
  email TEXT NOT NULL,
  telefon TEXT NOT NULL,
  numar_persoane INTEGER NOT NULL DEFAULT 2,
  data DATE NOT NULL,
  ora TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'în așteptare',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Activare Row Level Security
ALTER TABLE rezervari ENABLE ROW LEVEL SECURITY;

-- Politică: oricine poate adăuga, citi, modifica și șterge rezervări
CREATE POLICY "Acces public la rezervari" ON rezervari
  FOR ALL
  USING (true)
  WITH CHECK (true);
