import { Routes, Route } from 'react-router-dom'
import Index from '../presentation/pages/Index'
import NoPageFound from '../presentation/pages/NoPageFound'
import routes from './routes'

const AppRoutes= () => {
  return (
    <Routes>
      <Route path={routes.HOME} element={<Index />} />
      <Route path="*" element={<NoPageFound />} />
    </Routes>
  )
}

export default AppRoutes