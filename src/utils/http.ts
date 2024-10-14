import axios, { AxiosError, AxiosResponse, type AxiosInstance } from "axios";
import { getAccessToken, getRefreshToken, saveTokens, removeTokens } from "./auth";

export interface AuthResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  }
  
}

class Http {
  instance: AxiosInstance;
  private accessToken: string;
  private refreshToken: string;
  private refreshTokenRequest: Promise<AuthResponse> | null = null;

  constructor() {
    this.accessToken = getAccessToken();
    this.refreshToken = getRefreshToken();
    this.instance = axios.create({
      baseURL: "https://indocs.click/api/",
      timeout: 100000,
      headers:{
        "Content-Type": "application/json"
      }
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = `Bearer ${this.accessToken}`;
        }
        if (config.url === 'v1/logout') {
          config.headers.authorization = `Bearer ${this.accessToken || getAccessToken()}`;
          console.log(this.accessToken? this.accessToken : "khong co")
          console.log(getAccessToken()? getAccessToken() : "khong co")
        }
        return config;
      },
      (error) => {
        console.log(getAccessToken()? getAccessToken() : "khong co")
        console.log(this.accessToken? this.accessToken : "khong co")
        return Promise.reject(error)
      }
    );

    this.instance.interceptors.response.use(
      (response: AxiosResponse<AuthResponse>) => {
        const { url } = response.config;
        if (url === "v1/signin") {
          this.setTokens(response.data);
        }else if (url === "v1/logout") {
          
          this.accessToken = ""
          this.refreshToken=""
          
          removeTokens()
          
      }
        return response;
      },
      async (error: AxiosError) => {
        if (error.response?.status === 401 && !error.config?.url?.includes('v1/refresh-token')) {
          try {
            const newTokens = await this.refreshAccessToken();
            const config = error.config!;
            config.headers!.authorization = `Bearer ${newTokens.data.accessToken}`;
            return this.instance(config);
          } catch (refreshError) {
            // If refresh token fails, logout the user
            removeTokens()
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private setTokens(tokens: AuthResponse) {
    this.accessToken = tokens.data.accessToken;
    this.refreshToken = tokens.data.refreshToken;
    console.log("ok1",this.accessToken + this.refreshToken + tokens)
    saveTokens(tokens.data.accessToken, tokens.data.refreshToken);

  }

  private async refreshAccessToken(): Promise<AuthResponse> {
    if (!this.refreshTokenRequest) {
        this.refreshTokenRequest = this.instance.post<AuthResponse>('v1/refresh-token', {}, {
          headers: { 'refresh-token': this.refreshToken }
        }).then(response => response.data);
    }

    try {
        const response = await this.refreshTokenRequest;
      this.setTokens(response);
      return response;
    } finally {
      this.refreshTokenRequest = null;
    }
  }
  async signin(email: string, password: string): Promise<AuthResponse> {
    const response = await this.instance.post<AuthResponse>('v1/signin', { email, password });
    this.setTokens(response.data);
    return response.data; 
  }
  async signup(email: string, password: string): Promise<void> {
    const response = await this.instance.post<AuthResponse>('v1/signup', { email, password });
    this.setTokens(response.data);
  }

  // async logout() {
  //   const token = this.accessToken || getAccessToken();
    
  //   try {
  //     await this.instance.delete('/logout', {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       },
        
  //     });
      
  //     removeTokens();
  //     this.accessToken = ''; 
  //   this.refreshToken = ''; // Đảm bảo xóa cả refreshToken
  //   } catch (error) {
  //     console.error('Logout failed:', error);
  //     throw error;
  //   }
  // }
  
}

 const http = new Http().instance;
 export default http;
