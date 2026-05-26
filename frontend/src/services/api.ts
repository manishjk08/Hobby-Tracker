import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/",
  withCredentials: true,
});

// Request interceptor - read token directly from localStorage
api.interceptors.request.use(
  (config) => {
    // Read token directly from localStorage instead of Redux store
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// // Response interceptor - handle token refresh
// api.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       !originalRequest.url.includes("refresh-token")
//     ) {
//       originalRequest._retry = true;

//       try {
//         const res = await axios.post(
//           "http://localhost:5000/api/auth/refresh-token",
//           {},
//           { withCredentials: true }
//         );
        
//         const newAccessToken = res.data.accessToken;
        
//         // Update localStorage
//         localStorage.setItem("accessToken", newAccessToken);
        
//         // Update the authorization header for the retry
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

//         // Note: Don't dispatch to Redux here since we can't access store
//         // Instead, you'll need to handle the token update in your app
//         // We'll create a solution for this below

//         return api(originalRequest);
//       } catch (err) {
//         // Clear localStorage on refresh failure
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('user');
//         // You can also dispatch a logout action here if needed
//         // But since we can't access store, we'll handle it differently
//         return Promise.reject(err);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default api;