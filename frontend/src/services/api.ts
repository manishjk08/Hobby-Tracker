import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/",
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// // Response interceptor .. Handle refresh token
 api.interceptors.response.use(
 (res) => res,
   async (error) => {
     const originalRequest = error.config;

     if (
       error.response?.status === 401 &&
       !originalRequest._retry &&
       !originalRequest.url.includes("refresh-token")
     ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/refresh-token",
          {},
          { withCredentials: true }
        );
        
         const newAccessToken = res.data.data.accessToken;
        
         // Update localStorage
         localStorage.setItem("accessToken", newAccessToken);
        
         // Update the authorization header for the retry
         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

         return api(originalRequest);
       } catch (err) {
         
         localStorage.removeItem('accessToken');
         localStorage.removeItem('user');
         
         window.location.href=('/login')
         return Promise.reject(err);
       }
     }

    return Promise.reject(error);
   }
 );

export default api;