import { combineReducers, Reducer } from 'redux'
import storage from 'redux-persist/lib/storage'
import authModule from 'src/modules/auth/slices'

const reducers = combineReducers({
  authModule
})

type ReducersType = ReturnType<typeof reducers>
export const rootReducer: Reducer<ReducersType> = (state, action) => {
  if (action.type === 'credentials/logout') {
    storage.removeItem('persist:vlife_credentials').then(() => window.location.reload())

    return reducers(undefined, action)
  }

  return reducers(state, action)
}
