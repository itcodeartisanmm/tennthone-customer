// API Response Types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginWithTokenRequest {
  token: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
  };
  url?: string;
}

export interface ProfileResponse {
  id: string;
  email: string;
  name: string;
  avatar: string;
  register_type: string;
  email_verified_at: string;
}

// Error Types
export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

export interface UpdateProfileInfoRequest {
  name: string;
  email: string;
}

export interface UpdatePasswordRequest {
  old_password: string;
  password: string;
  confirm_password: string;
}

export interface DashboardResponse {
  balance: number;
  recentOrders: IncomeInterface[];
  recentTopups: TopUpInterface[];
  totalEarnings: number;
  totalOrders: number;
  avgOrderValue: number;
  conversionRate: number;
}

export interface WithdrawalInterface {
  id: number;
  order_no: string;
  created_at: string;
  customer: string;
  website: string;
}

export interface IncomeInterface {
  id: number;
  order_no: string;
  created_at: string;
  customer: string;
  website: string;
  amount: number;
  status: number;
  payment_status: number;
  payment_method: string;
  transaction_no: string;
  note: string;
}

export interface OrderInterface {
  id: number;
  order_no: string;
  created_at: string;
  customer: string;
  website: string;
  status: number;
  payment_status: number;
  payment_method: number;
  transaction_no: string;
  note: string;
}

export interface PaginationInterface {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface OrderResponse {
  orders: OrderInterface[];
  pagination: PaginationInterface;
}

export interface OrderDetailsInterface {
  id: number;
  order_no: string;
  created_at: string;
  website: WebsiteInterface;
  status: number;
  amount: number;
  payment_status: number;
  payment_method: string;
  transaction_no: string;
  note: string;
  order_items: OrderItemInterface[];
  customer: CustomerInterface;
  transaction_status: string;
  transaction_amount: number;
}

export interface CustomerInterface {
  id: number;
  name: string;
  email: string;
}

export interface OrderItemInterface {
  id: number;
  name: string;
  price: number;
  quantity: number;
  product: ProductInterface;
  website: WebsiteInterface;
}

export interface ProductInterface {
  id: number;
  name: string;
  price: number;
  image: string;
  tags: TagInterface[];
  sale_price: number;
}

export interface TagInterface {
  id: number;
  name: string;
}

export interface WebsiteInterface {
  id: number;
  name: string;
  title: string;
}

export interface OrderDetailsResponse {
  order: OrderDetailsInterface;
}

export interface statusColorInterface {
  [key: number]: "success" | "danger" | "warning";
}

export interface paymentStatusColorInterface {
  [key: number]: "success" | "danger" | "warning";
}

export interface paymentMethodColorInterface {
  [key: number]: "success" | "danger" | "warning";
}

export interface TopUpBalanceRequest {
  amount: number;
  payment_method: number;
}

export interface TopUpInterface {
  id: number;
  transaction_no: string;
  amount: number;
  payment_method: number;
  created_at: string;
  status: number;
}
export interface TopupHistoryRequest {
  page: number;
  limit: number;
}

export interface TopUpHistoryResponse {
  topups: TopUpInterface[];
  pagination: PaginationInterface;
}

export interface TopUpBalanceResponse {
  topup: TopUpInterface;
}

export interface TopupDetailsResponse {
  topup: TopUpInterface;
}
