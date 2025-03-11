import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: '/api/v1', // Backend API base URL
    withCredentials: true, // Include cookies in requests
});

axiosInstance.interceptors.response.use(
    (response) => response, // Pass successful responses
    async (error) => {
      // if (error.response?.status === 401) { // Handle 401 Unauthorized errors
      //   try {
      //     const accessToken = await refreshAccessToken(); // Refresh the token
      //     error.config.headers['Authorization'] = `Bearer ${accessToken}`; // Update the token in the headers
      //     return axiosInstance(error.config); // Retry the original request with the new token
      //   } catch (err) {
      //     console.error('Token refresh failed:', err.message);
      //     throw err; // Reject if token refresh fails
      //   }
      // }
      return Promise.reject(error.response.data); // Pass all other errors
    }
);

export function sendOtp(data) {
    return axiosInstance.post("/users/send-otp", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  
  export function verifyOtp(data) {
    return axiosInstance.post("/users/verify-otp", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  
  export function createUser({fullName, phoneNumber}) {
    // console.log({fullName, phoneNumber});
    return axiosInstance.post('/users/register', {fullName, phoneNumber}, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  export default axiosInstance;