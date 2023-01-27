import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { usersReducer } from './slices/usersSlice';
import { albumsApi } from './apis/albumsApi';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumsApi.reducerPath]: albumsApi.reducer, // [] === Set reducerPath's property value here
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(albumsApi.middleware);
  }
});

setupListeners(store.dispatch);

export {
  useFetchAlbumsQuery,
  useAddAlbumMutation
} from './apis/albumsApi';
export * from './thunks/fetchUsers';
export * from './thunks/addUser';
export * from './thunks/removeUser';
