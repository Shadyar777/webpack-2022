import { AsyncThunk, configureStore } from '@reduxjs/toolkit'
import { persistStore, Persistor } from 'redux-persist'
import { rootReducer } from '@/store/rootReducer'
import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/src/getDefaultMiddleware'

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    })
})

if (process.env.NODE_ENV === 'development' && (module as any).hot) {
  ;(module as any).hot.accept('../rootReducer', () => {
    const newRootReducer = require('../rootReducer').default
    store.replaceReducer(newRootReducer)
  })
}

const persistor: Persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof store.getState>
export type AppDispatch = AppStore['dispatch']

export type ThunkApiConfig = {
  state: RootState
  dispatch: AppDispatch
  rejectValue: unknown
}

export type AppThunk<Returned = void, ThunkArg = void> = AsyncThunk<
  Returned,
  ThunkArg,
  ThunkApiConfig
>

export { store, persistor }
