import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react'

import Layout from './Layouts/Layout';

const FavoritesPage = lazy(()=> import('./Views/FavoritesPage'));
const IndexPage = lazy(()=> import('./Views/indexPage'));
export default function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<Layout/>}>            
                <Route path='/' element={
                  <Suspense fallback='Cargando...'>
                    <IndexPage/>
                  </Suspense>
                } index/>
                <Route path='/favoritos' element={
                  <Suspense fallback='Cargando'><FavoritesPage/></Suspense>
                } />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
