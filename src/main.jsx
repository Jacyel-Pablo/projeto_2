import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import Index from './codigo_js/Pagínas/index.jsx';
import Criar_conta from './codigo_js/Pagínas/criar_conta.jsx';
import Menu from './codigo_js/Pagínas/menu.jsx';
import Dados__filme from './codigo_js/Pagínas/dados__filme.jsx';
import User__config from './codigo_js/Pagínas/user__config.jsx';
import Modo_dev from './codigo_js/Pagínas/modo_dev.jsx';
import Pagina_arquivo_nao_encontrado from './codigo_js/Pagínas/pagina_arquivo_nao_encontrado.jsx';
import './index.css'

const rotas = createBrowserRouter([
  {
    path: "/",
    element: <Index/>
  },
  {
    path: "/criar_conta.html",
    element: <Criar_conta/>
  },
  {
    path: "/menu.html",
    element: <Menu/>
  },
  {
    path: "/dados__filme.html",
    element: <Dados__filme/>
  },
  {
    path: "/user__config.html",
    element: <User__config/>
  },
  {
    path: "/.dev",
    element: <Modo_dev/>
  },
  {
    path: "*",
    element: <Pagina_arquivo_nao_encontrado/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={rotas}/>
  </StrictMode>,
)
