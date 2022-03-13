import Header from "../components/Header";
import TabMenu from "../components/TabMenu";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home";
import AllProducts from "./AllProducts";
import Sellers from "./Sellers";
import Join from "./Join";
import Confirmation from "./Confirmation";
import DetailProduct from "./DetailProduct";
import Checkout from "./Checkout";
import {useDispatch,useSelector} from 'react-redux'
import { useEffect } from "react";
import { auth_status } from "../features/users/authSlice";
import useAuth from "../hooks/useAuth";
import PrivateRoute from "../hooks/PrivateRoute";
import UserProfile from "./UserProfile";
import NotFound from "./NotFound";
import ForgetPassword from "./ForgetPassword";
import ResetPassword from "./ResetPassword";
function Main() {
    const dispatch = useDispatch()
  const {error} = useSelector(state => state.auth)
  const {token,auth,authLoading,login} = useAuth()
  useEffect(()=>{
    if(login) dispatch(auth_status())
  },[])
  return (
    <BrowserRouter>
        <Header token={token} auth={auth}/>
        <div className={'mt-12 lg:mt-24 mb-20 lg:px-24'}>
        {login&&<div className="bg-green-500 text-white font-semibold px-3 py-1 rounded-md text-center mb-10">Anda berhasil Masuk</div>}
        {error&&<div className='bg-rose-700 text-white px-3 py-1 rounded-md text-center mb-10'>Email atau Password anda Salah</div>}
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/products/view/:product" element={<DetailProduct/>}/>
            <Route path="/products" element={<AllProducts/>}/>
            <Route path="/products/:category" element={<AllProducts/>}/>
            <Route path="/sellers" element={<Sellers/>}/>
            <Route path="/join" element={<Join/>}/>
            <Route path="/konfirmasi" element={<Confirmation/>}/>
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/resetpassword/verification/:token" element={<ResetPassword/>} />
            <Route path="/userprofile" element={
              <PrivateRoute>
                <UserProfile token={token} auth={auth} />
              </PrivateRoute>
            } />
            <Route path="/forgetpassword" element={<ForgetPassword/>} />
            <Route path="/*" element={<NotFound/>} />
        </Routes>
        </div>
        <TabMenu token={token}/>
    </BrowserRouter>
  );
}

export default Main;
