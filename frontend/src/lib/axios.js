import axios from 'axios';
import React from 'react'


export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001/api',
    withCredentials:true,// Include cookies and auth headers in cross-origin requests for authentication.
  });