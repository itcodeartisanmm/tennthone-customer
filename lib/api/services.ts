import api from "./axios";
import type {
  ApiResponse,
  DashboardResponse,
  LoginRequest,
  LoginResponse,
  ProfileResponse,
  UpdatePasswordRequest,
  UpdateProfileInfoRequest,
} from "./types";

// Auth Services
export const authService = {
  login: async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    const response = await api.post<ApiResponse<LoginResponse>>(
      "/customer/auth/login",
      data,
    );
    if (response.data.data.token) {
      console.log(response.data.data);
      if (typeof window !== "undefined") {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("user_id", response.data.data.user_id);
      }
    }
    return response.data;
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      window.location.href = "/auth/login";
    }
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
      "/dashboard/wallet/dashboard",
      { params: data },
    );
    return response.data;
  },
};
