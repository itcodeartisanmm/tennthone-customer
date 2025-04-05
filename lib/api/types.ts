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

export interface LoginResponse {
  token: string;
  user_id: string;
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
  recentWithdrawal: WithdrawalInterface[];
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

export interface statusColorInterface {
  [key: number]: "success" | "danger" | "warning";
}

export interface paymentStatusColorInterface {
  [key: number]: "success" | "danger" | "warning";
}

export interface paymentMethodColorInterface {
  [key: number]: "success" | "danger" | "warning";
}
