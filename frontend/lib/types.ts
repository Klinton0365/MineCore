export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'editor';
  created_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
  image: string | null;
  description: string | null;
  display_order: number;
  is_active: boolean;
  children?: Category[];
  products?: Product[];
  created_at: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  category_id: number;
  description: string;
  specifications: Record<string, string> | null;
  is_featured: boolean;
  is_product_of_week: boolean;
  featured_badge: string | null;
  is_active: boolean;
  category?: Category;
  images?: ProductImage[];
  branches?: BranchWithStock[];
  countries?: ProductCountry[];
  created_at: string;
}

export interface ProductImage {
  id: number;
  product_id: number;
  image_path: string;
  display_order: number;
  is_primary: boolean;
}

export interface Branch {
  id: number;
  name: string;
  region_code: string;
  country: string;
  description: string | null;
  address: string | null;
  is_visible: boolean;
  display_logic: string | null;
  created_at: string;
}

export interface BranchWithStock extends Branch {
  pivot: {
    stock_status: 'in_stock' | 'limited' | 'out_of_stock';
    is_override: boolean;
  };
}

export interface ProductCountry {
  id: number;
  product_id: number;
  country_code: string;
  country_name: string;
  is_available: boolean;
}

export interface Enquiry {
  id: number;
  customer_name: string;
  phone: string;
  email: string;
  country: string;
  message: string;
  status: 'new' | 'contacted' | 'converted' | 'closed';
  ip_address: string | null;
  items?: EnquiryItem[];
  created_at: string;
}

export interface EnquiryItem {
  id: number;
  enquiry_id: number;
  product_id: number;
  product?: Product;
}

export interface FeaturedSchedule {
  id: number;
  product_id: number;
  start_date: string;
  end_date: string;
  countdown_end: string | null;
  is_active: boolean;
  product?: Product;
}

export interface ApiSyncLog {
  id: number;
  endpoint: string;
  status: 'success' | 'failed' | 'pending';
  response_code: number | null;
  error_message: string | null;
  synced_at: string | null;
  created_at: string;
}

export interface DashboardStats {
  total_enquiries: number;
  enquiries_trend: number;
  top_product: { name: string; count: number } | null;
  top_region: { country: string; count: number } | null;
  recent_enquiries: Enquiry[];
  products_count: number;
  categories_count: number;
  branches_count: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface AuthResponse {
  user: User;
  token: string;
}
