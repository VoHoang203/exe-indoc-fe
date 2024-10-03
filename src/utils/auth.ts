export const saveAccessToken =(access_token:string)=>{ localStorage.setItem("access_token", access_token)}

export const removeAccessToken =()=>{localStorage.removeItem("access_token")}

export const getAccessToken = ()=>{return localStorage.getItem("access_token")|| ''}
// Thêm các hàm mới cho refresh token
export const saveRefreshToken = (refresh_token: string) => {
      localStorage.setItem("refresh token", refresh_token);
  };
  
  export const removeRefreshToken = () => {
    localStorage.removeItem("refresh token");
  };
  
  export const getRefreshToken = () => {
    return localStorage.getItem("refresh token") || '';
  };
  
  // Hàm tiện ích để lưu cả access token và refresh token
  export const saveTokens = (access_token: string, refresh_token: string) => {
    saveAccessToken(access_token);
    saveRefreshToken(refresh_token);
  };
  
  // Hàm tiện ích để xóa cả access token và refresh token
  export const removeTokens = () => {
    localStorage.removeItem("userInfo")
    removeAccessToken();
    removeRefreshToken();
  };
