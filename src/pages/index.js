import Header from "../components/Header";
import TabMenu from "../components/TabMenu";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home";
import AllProducts from "./AllProducts";
import Sellers from "./Sellers";
import Join from "./Join";
import Confirmation from "./Confirmation";
import DetailProduct from "./DetailProduct";
import {getProducts} from '../features/products/productsSlice'
import {useDispatch} from 'react-redux'
import { useEffect } from "react";
function Main() {
  // const dispatch = useDispatch()
  // useEffect(()=>{
  //   dispatch(getProducts())
  // },[])
  return (
    <BrowserRouter>
        <Header/>
        <div className={'mt-12 lg:mt-24 mb-20 lg:px-24'}>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/products/view/:id" element={<DetailProduct/>}/>
            <Route path="/products" element={<AllProducts/>}/>
            <Route path="/products/:category" element={<AllProducts/>}/>
            <Route path="/sellers" element={<Sellers/>}/>
            <Route path="/join" element={<Join/>}/>
            <Route path="/konfirmasi" element={<Confirmation/>}/>
        </Routes>
        </div>
        <TabMenu/>
    </BrowserRouter>
  );
}

export default Main;
