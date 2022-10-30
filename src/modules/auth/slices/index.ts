import { combineReducers } from '@reduxjs/toolkit'
import credentials from '@/modules/auth/slices/credentials'
import auth from '@/modules/auth/slices/auth'

export default combineReducers({
  credentials,
  auth
})
