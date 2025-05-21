import axios from "axios";

const baseUri = "http://localhost:3001";

const api = axios.create({
  baseURL: baseUri,
  withCredentials: true,
});

interface SignUpData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  username: string;
  confirmPassword: string;
}

export interface UpdateUserData {
  username?: string;
  email?: string;
  bio?: string;
}

const getCsrfToken = async () => {
  try {
    const res = await api.get(`${baseUri}/csrf-token`);
    if (res.status !== 200) {
      throw new Error(res.data.message || "CSRF token fetch failed");
    }
    return res.data;
  } catch (error) {
    console.error("CSRF token fetch error:", error);
    throw error;
  }
};

const signIn = async (email: string, password: string) => {
  try {
    const res = await api.post(`${baseUri}/api/v1/user/sign-in`, {
      email,
      password,
    });

    if (res.status !== 200) {
      throw new Error(res.data.message || "Sign in failed");
    }

    return res.data;
  } catch (error) {
    console.error("Sign in error:", error);
    throw error;
  }
};

const sessionCheck = async () => {
  try {
    const res = await api.get(`${baseUri}/api/v1/user/session`);
    if (res.status !== 200) {
      throw new Error(res.data.message || "Session check failed");
    }
    return res.data;
  } catch (error: any) {
    console.log("error while session check", error);
    throw error;
  }
};

const signUp = async (data: SignUpData) => {
  try {
    const res = await api.post(`${baseUri}/api/v1/user/sign-up`, data);
    if (res.status !== 201) {
      throw new Error(res.data.message || "Sign up failed");
    }
    return res.data;
  } catch (error) {
    console.error("Sign up error:", error);
    throw error;
  }
};

const checkSameUsername = async (username: string) => {
  try {
    const res = await api.get(
      `${baseUri}/api/v1/user/check-username/${username}`,
    );
    if (res.status !== 200) {
      throw new Error(res.data.message || "Username check failed");
    }

    return res.data;
  } catch (error) {
    console.error("Username check error:", error);
    throw error;
  }
};

const checkAndVerifyOtp = async (email: string, otp: string) => {
  try {
    const res = await api.post(`${baseUri}/api/v1/user/verify-otp`, {
      email,
      otp,
    });
    if (res.status !== 200) {
      throw new Error(res.data.message || "OTP verification failed");
    }
    return res.data;
  } catch (error) {
    console.error("OTP verification error:", error);
    throw error;
  }
};

const refreshOtp = async (email: string) => {
  try {
    const res = await api.patch(`${baseUri}/api/v1/user/refresh-otp`, {
      email,
    });
    if (res.status !== 200) {
      throw new Error(res.data.message || "OTP resend failed");
    }
    return res.data;
  } catch (error) {
    console.error("OTP resend error:", error);
    throw error;
  }
};

const refreshTokens = async () => {
  try {
    const res = await api.get(`${baseUri}/api/v1/user/refresh-token`);
    if (res.status !== 200) {
      throw new Error(res.data.message || "Token refresh failed");
    }
    return res.data;
  } catch (error) {
    console.error("Token refresh error:", error);
    throw error;
  }
};

const signOut = async () => {
  try {
    const res = await api.delete(`${baseUri}/api/v1/user/sign-out`);
    if (res.status !== 200) {
      throw new Error(res.data.message || "Sign out failed");
    }
    return res.data;
  } catch (error) {
    console.error("Sign out error:", error);
    throw error;
  }
};

const uploadProfileImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("profileImage", file);

    const res = await api.patch(
      `${baseUri}/api/v1/user/profile-image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    if (res.status !== 201) {
      throw new Error(res.data.message || "Profile image upload failed");
    }
    return res.data.data.image;
  } catch (error) {
    console.error("Profile image upload error:", error);
    throw error;
  }
};

const updateUserInfo = async (data: UpdateUserData) => {
  try {
    const res = await api.patch(`${baseUri}/api/v1/user/profile-info`, data);
    if (res.status !== 200) {
      throw new Error(res.data.message || "Profile update failed");
    }
    return res.data;
  } catch (error) {
    console.error("Profile update error:", error);
    throw error;
  }
};

const searchUsers = async (
  username: string,
  pageSize?: number,
  cursor?: { id: string; createdAt: string },
) => {
  try {
    let url = `${baseUri}/api/v1/user/search?username=${encodeURIComponent(username)}`;
    if (pageSize) {
      url += `&pageSize=${pageSize}`;
    }
    if (cursor) {
      url += `&id=${cursor.id}&createdAt=${encodeURIComponent(cursor.createdAt)}`;
    }

    const res = await api.get(url);
    if (res.status !== 200) {
      throw new Error(res.data.message || "User search failed");
    }
    return res.data;
  } catch (error) {
    console.error("User search error:", error);
    throw error;
  }
};

export {
  signUp,
  checkAndVerifyOtp,
  signIn,
  refreshTokens,
  refreshOtp,
  signOut,
  uploadProfileImage,
  updateUserInfo,
  sessionCheck,
  searchUsers,
  checkSameUsername,
  getCsrfToken,
};
