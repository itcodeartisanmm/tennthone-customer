import api from "./axios";
import type {
  ApiResponse,
  DashboardResponse,
  LoginRequest,
  LoginWithTokenRequest,
  LoginResponse,
  ProfileResponse,
  UpdatePasswordRequest,
  UpdateProfileInfoRequest,
  OrderResponse,
  OrderDetailsResponse,
  TopUpBalanceResponse,
  TopUpBalanceRequest,
  TopUpHistoryResponse,
  TopupHistoryRequest,
  TopUpInterface,
  TopupDetailsResponse,
} from "./types";


// Auth Services
export const authService = {
  login: async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    const response = await api.post<ApiResponse<LoginResponse>>(
      "/customer/auth/login",
      data,
    );
    console.log(response.data.data);
    if (response.data.data.token) {
      if (typeof window !== "undefined") {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("user_id", response.data.data.user.id);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
      }
      if (response.data.data.url) {
        window.location.href = response.data.data.url;
      } else {
        window.location.href = "/dashboard/wallet";
      }
    }
    return response.data;
  },

  loginWithToken: async (data: LoginWithTokenRequest): Promise<ApiResponse<LoginResponse>> => {
    const response = await api.post<ApiResponse<LoginResponse>>(
      "/customer/auth/login-with-token",
      data,
    );
    if (response.data.data.url) {
      window.location.href = response.data.data.url;
    }
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/customer/auth/logout");
    if (response.data.success) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        window.location.href = "/auth/login";
      }
    }
    return response.data;
  },

  getCurrentUser: async () => {
    const response =
      await api.get<ApiResponse<ProfileResponse>>("/dashboard/profile");
    return response.data;
  },
};

export const userService = {
  updateProfile: async (data: UpdateProfileInfoRequest) => {
    const response = await api.put<ApiResponse<ProfileResponse>>(
      "/dashboard/profile",
      data,
    );
    return response.data;
  },
  updatePassword: async (data: UpdatePasswordRequest) => {
    const response = await api.put<ApiResponse<ProfileResponse>>(
      "/dashboard/password",
      data,
    );
    return response.data;
  },
};

export const walletService = {
  getDashboardData: async (data: { date: string }) => {
    const response = await api.get<ApiResponse<DashboardResponse>>(
      "/dashboard/wallet",
      { params: data },
    );
    return response.data;
  }
};

export const topupService = {
  topUpBalance: async (data: TopUpBalanceRequest) => {
    const response = await api.post<ApiResponse<TopUpBalanceResponse>>(
      "/dashboard/topup",
      data,
    );
    return response.data;
  },
  getTopups: async (data: TopupHistoryRequest) => {
    const response = await api.get<ApiResponse<TopUpHistoryResponse>>(
      "/dashboard/topup",
      { params: data },
    );
    return response.data;
  },
  getTopupById: async (id: string) => {
    const response = await api.get<ApiResponse<TopupDetailsResponse>>(
      `/dashboard/topup/${id}`,
    );
    return response.data;
  },
};

export const orderService = {
  getOrders: async (data: { page: number, limit: number }) => {
    const response = await api.get<ApiResponse<OrderResponse>>(
      "/dashboard/orders",
      { params: data },
    );
    return response.data;
  },
  getOrderDetails: async (data: { id: number }) => {
    const response = await api.get<ApiResponse<OrderDetailsResponse>>(
      `/dashboard/orders/${data.id}`,
    );
    return response.data;
  },
};

