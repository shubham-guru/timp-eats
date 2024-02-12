import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import NoPageFound from '../presentation/pages/NoPageFound'
import routes from './routes'

const AppRoutes= () => {

  const Index = React.lazy(() => import("../presentation/pages/Index"));
  const Cart = React.lazy(() => import("../presentation/pages/Cart"));

  return (
    <Routes>
      <Route path={routes.HOME} element={<Suspense fallback=""><Index /></Suspense>} />
      <Route path={routes.CART} element={<Suspense fallback=""><Cart /></Suspense>} />
      <Route path="*" element={<NoPageFound />} />
    </Routes>
  )
}

export default AppRoutes