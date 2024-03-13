import {apiSlice} from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        login: builder.mutation({
            query:credentials =>({
                url: '/login', //might have to change it to /login, not sure what it does!!
                method:'POST',
                body:{...credentials}
            })
        }),
        updatePassword: builder.mutation({
            query:credentials =>({
                url: '/updatePassword', //might have to change it to /login, not sure what it does!!
                method:'PATCH',
                body:{...credentials}
            })
        }),
        getUserFavorites: builder.mutation({
            query:credentials =>({
                url: '/favorites', //might have to change it to /login, not sure what it does!!
                method:'POST',
                body:{...credentials}
            })
        }),
        updateUserDetails: builder.mutation({
            query: credentials =>({
                url:'/updateUserDetails',
                method: 'PATCH',
                body:{...credentials}
            })
        }),
        getFavorites: builder.query({
            query: ()=>('/favorites')
        })
    })
})

export const {
    useLoginMutation,
    useUpdatePasswordMutation,
    useGetUserFavoritesMutation,
    useUpdateUserDetailsMutation,
    useGetFavoritesQuery
} = authApiSlice;