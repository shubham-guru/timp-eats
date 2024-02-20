import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Index from '../presentation/pages/Index';
import Cart from '../presentation/pages/Cart';
import CheckOut from '../presentation/pages/CheckOut';
import routes from './routes'

const AppRoutes= () => {

  const LayoutPage = React.lazy(() => import("../presentation/pages/LayoutPage"));
  const NoPageFound = React.lazy(() => import("../presentation/pages/NoPageFound"));

  return (
    <Routes>
      <Route path={routes.HOME} element={<Suspense fallback=""><LayoutPage Children={<Index />} /></Suspense>} />
      <Route path={routes.CART} element={<Suspense fallback=""><LayoutPage Children={<Cart />} /></Suspense>} />
      <Route path={routes.CHECKOUT} element={<Suspense fallback=""><LayoutPage Children={<CheckOut />} /></Suspense>} />
      <Route path="*" element={<NoPageFound />} />
    </Routes>
  )
}

export default AppRoutes