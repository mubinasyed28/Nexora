import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    sendOtp,
    verifyOtp,
    createUser
} from "./authApi"

const initialState = {
    loggedInUserToken: null,
    status: 'idle',
    error: null,
    userChecked: false,
    signupSuccess: false,
    // forgotPassActive: "Email",
    popup: {
      visible: false,
      message: '',
      duration: 3000, // Default duration
      type: 'success', // Can be 'success' or 'error'
    },
};

export const sendOtpAsync = createAsyncThunk(
    "users/sendOtp", 
    async (data, { rejectWithValue }) => {
    try {
      const response = await sendOtp(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });
  
  export const verifyOtpAsync = createAsyncThunk(
    "auth/verifyOtp", 
    async (data,{ rejectWithValue }) => {
    try {
      const response = await verifyOtp(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });
  
  export const createUserAsync = createAsyncThunk(
    'user/createUser',
    async ({fullName, phoneNumber}, { rejectWithValue }) => {
      try {
        // console.log({fullName, phoneNumber});
        const response = await createUser({fullName, phoneNumber});
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

export const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        showPopup: (state, action) => {
            state.popup = {
              visible: true,
              message: action.payload.message,
              duration: action.payload.duration || 3000,
              type: action.payload.type || 'success',
            };
          },
          hidePopup: (state) => {
            state.popup = {
              visible: false,
              message: '',
              duration: 3000,
              type: 'success',
            };
          },  
    },
    extraReducers: (builder) => {
        builder
        .addCase(sendOtpAsync.pending, (state) => {
          state.status = "loading";
          state.error = null;
        })
        .addCase(sendOtpAsync.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.popup = {
            visible: true,
            message: 'OTP Sent Successfully!',
            duration: 3000,
            type: 'success',
          };
        })
        .addCase(sendOtpAsync.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
          state.popup = {
            visible: true,
            message: `Error Sending OTP: ${action.payload}`,
            duration: 3000,
            type: 'error',
          };
        })
        .addCase(verifyOtpAsync.pending, (state) => {
          state.status = "loading";
          state.error = null;
        })
        .addCase(verifyOtpAsync.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.popup = {
            visible: true,
            message: 'Email Verified Successfully!',
            duration: 3000,
            type: 'success',
          };
        })
        .addCase(verifyOtpAsync.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
          state.popup = {
            visible: true,
            message: `Email Verification Failed: ${action.payload}`,
            duration: 3000,
            type: 'error',
          };
        })
          .addCase(createUserAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(createUserAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.popup = {
              visible: true,
              message: 'User created successfully!',
              duration: 3000,
              type: 'success',
            };
            state.signupSuccess = true;
          })
          .addCase(createUserAsync.rejected, (state, action) => {
            state.status = 'idle';
            state.popup = {
              visible: true,
              message: `User creation failed: ${action.payload}`,
              duration: 3000,
              type: 'error',
            };
          })
    }
})

export const selectPopup = (state) => state.auth.popup;
export const selectStatus = (state) => state.auth.status
export const selectSignupStatus = (state) => state.auth.signupSuccess;
export const { showPopup, hidePopup } = authSlice.actions;

export default authSlice.reducer;