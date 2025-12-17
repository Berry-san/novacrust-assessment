'use client';

import { createSlice } from '@reduxjs/toolkit';
import { sessionStorageName } from '@/config';

let sessionStorageState;
if (typeof window !== 'undefined') {
  sessionStorageState = sessionStorage.getItem(sessionStorageName);
}

interface UserState {}

const initialState: UserState = sessionStorageState
  ? {
      user: { ...JSON.parse(sessionStorageState) }
    }
  : {
      user: {
        firstName: '',
        lastName: '',
        isAuthenticated: false
      }
    };

const userServiceSlice = createSlice({
  name: 'userService',
  initialState,
  reducers: {}
});

export const {} = userServiceSlice.actions;

export default userServiceSlice.reducer;
