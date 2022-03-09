import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import {authServices} from '../features/users/authSlice'
export default function useAuth(){
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(authServices())
    },[])
    const {auth,token,authLoading,login} = useSelector(state => state.auth)
    useEffect(()=>{
        dispatch(authServices)
    },[])
    return {token: token, login: login, auth:auth,authLoading:authLoading}
}