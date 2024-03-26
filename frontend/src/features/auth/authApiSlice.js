import {apiSlice} from "../../app/api/apiSlice";
import {logOut, setCredentials} from "./authSlice";

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
        deleteFavorite:builder.mutation({
            query:credentials=>({
                url:'/favorites',
                method:'DELETE',
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
            query: ()=>('/favorites'),
            keepUnusedDataFor: 1,
        }),
        getMovies: builder.query({
            query: ()=>('/movies'),
        }),
        getUserData: builder.query({
            query:()=>('/user')
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data)
                    dispatch(logOut())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        refresh: builder.mutation({
            query: ()=>({
                url:'refresh',
                method:'GET'
            }),
            async onQueryStarted(arg,{dispatch,queryFulfilled}){
                try {
                    const {data} = await queryFulfilled
                    console.log(data);
                    const {token} = data
                    dispatch(setCredentials({token}))
                }catch (err){
                    console.log(err)
                }
            }
        })
    })
})

export const {
    useLoginMutation,
    useUpdatePasswordMutation,
    useGetUserFavoritesMutation,
    useUpdateUserDetailsMutation,
    useGetFavoritesQuery,
    useGetMoviesQuery,
    useGetUserDataQuery,
    useSendLogoutMutation,
    useRefreshMutation,
    useDeleteFavoriteMutation
} = authApiSlice;