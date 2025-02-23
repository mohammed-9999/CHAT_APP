// In this file, we define a state and a function that can be used in different components.
import { create } from 'zustand'
import { axiosInstance } from '../lib/axios';

export const useAuthStore=create((set) => ({
    authUser: null,
    isSigninUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");//fetch the data

            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });

        } finally {
            set({ isCheckingAuth: false });
        }
    }
}));
