import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { CredentialsState } from '@/modules/auth/types/interfaces'

/**
 * Initial State
 */

const initialState: CredentialsState = {
  accessToken: '',
  refreshToken: '',
  expiresIn: 0,
  refreshExpiresIn: 0,
  refreshTokenExpDate: '',
  tokenType: '',
  sessionState: '',
  scope: ''
}

/**
 * Slice
 */

const credentialsSlice = createSlice({
  name: 'credentials',
  initialState,
  reducers: {
    auth: (state, action: PayloadAction<CredentialsState>) => action.payload,
    logout: () => initialState
  }
})

export const { auth, logout } = credentialsSlice.actions
export default persistReducer(
  {
    storage,
    key: 'vlife_credentials',
    version: 1
  },
  credentialsSlice.reducer
)
