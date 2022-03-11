import { configureStore } from '@reduxjs/toolkit'
import campaignReducer from '../store/features/campaign/campaignSlice';

export const store = configureStore({
  reducer: {
    campaigns: campaignReducer
  },
})
