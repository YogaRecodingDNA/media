// API CONFIGURATION --> also check index.jsx
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

// DEV ONLY!!!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const albumsApi = createApi({ // returns set of auto generated hooks + a slice and thunks
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({ // preconfigured version of fetch --> albumsApi.useFetchAlbumsQuery()
    baseUrl: 'http://localhost:3005',
    fetchFn: async (...args) => {
      // Remove for production
      await pause(1000);
      return fetch(...args);
    }
  }),
  endpoints(builder) {
    return { // Configuration
      fetchAlbums: builder.query({ // Template decides name of hook
        providesTags: (result, error, user) => { // 3rd arg is whatever's passed to "THIS" hook
          return [{ type: 'Album', id: user.id }];
        },
        query: (user) => { // user object / data from server / contains id, name, etc.
          return {
            url: '/albums', // path --> baseUrl/albums
            params: {
              userId: user.id
            },
            method: 'GET'
          };
        },
      }),
      addAlbum: builder.mutation({
        invalidatesTags: (result, error, user) => { // 3rd arg is whatever's passed to "THIS" hook
          return [{ type: 'Album', id: user.id }];
        },
        query: (user) => {
          return {
            url: '/albums',
            method: 'POST',
            body: {
              userId: user.id,
              title: faker.commerce.productName()
            }
          };
        }
      })
    };
  },
});

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation
} = albumsApi;
export { albumsApi };