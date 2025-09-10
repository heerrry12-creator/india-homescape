-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  property_type TEXT NOT NULL,
  listing_type TEXT NOT NULL CHECK (listing_type IN ('sell', 'rent')),
  city TEXT NOT NULL,
  locality TEXT NOT NULL,
  address TEXT,
  price DECIMAL(12,2) NOT NULL,
  area DECIMAL(10,2) NOT NULL,
  bedrooms INTEGER,
  bathrooms INTEGER,
  amenities TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  videos TEXT[] DEFAULT '{}',
  floor_plan TEXT,
  plan_type TEXT NOT NULL DEFAULT 'free' CHECK (plan_type IN ('free', 'basic', 'premium', 'assisted')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'sold', 'rented')),
  views INTEGER DEFAULT 0,
  leads INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  name TEXT,
  avatar_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  subscription_plan TEXT DEFAULT 'free' CHECK (subscription_plan IN ('free', 'basic', 'premium', 'assisted')),
  subscription_expires TIMESTAMP WITH TIME ZONE,
  total_listings INTEGER DEFAULT 0,
  total_leads INTEGER DEFAULT 0
);

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  lead_type TEXT NOT NULL CHECK (lead_type IN ('contact', 'inquiry', 'view')),
  contact_method TEXT CHECK (contact_method IN ('phone', 'email', 'whatsapp')),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'interested', 'not_interested')),
  notes TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_user_id ON properties(user_id);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON properties(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_properties_plan_type ON properties(plan_type);
CREATE INDEX IF NOT EXISTS idx_leads_property_id ON leads(property_id);
CREATE INDEX IF NOT EXISTS idx_leads_user_id ON leads(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- RLS Policies for properties
CREATE POLICY "Properties are viewable by everyone" ON properties
  FOR SELECT USING (status = 'active');

CREATE POLICY "Users can insert their own properties" ON properties
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own properties" ON properties
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own properties" ON properties
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for users
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for leads
CREATE POLICY "Users can view leads for their properties" ON leads
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM properties 
      WHERE properties.id = leads.property_id 
      AND properties.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert leads" ON leads
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Function to increment views
CREATE OR REPLACE FUNCTION increment(row_id UUID, column_name TEXT)
RETURNS INTEGER AS $$
BEGIN
  EXECUTE format('UPDATE properties SET %I = %I + 1 WHERE id = $1', column_name, column_name)
  USING row_id;
  RETURN 1;
END;
$$ LANGUAGE plpgsql;

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO users (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update user stats
CREATE OR REPLACE FUNCTION update_user_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE users 
    SET total_listings = total_listings + 1
    WHERE id = NEW.user_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE users 
    SET total_listings = total_listings - 1
    WHERE id = OLD.user_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger to update user stats when properties are created/deleted
CREATE TRIGGER on_property_change
  AFTER INSERT OR DELETE ON properties
  FOR EACH ROW EXECUTE FUNCTION update_user_stats();
