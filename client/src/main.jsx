import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Index from './codigo_js/Pagínas/index.jsx';
import Criar_conta from './codigo_js/Pagínas/criar_conta.jsx';
import Menu from './codigo_js/Pagínas/menu.jsx';
import Dados__filme from './codigo_js/Pagínas/dados__filme.jsx';
import User__config from './codigo_js/Pagínas/user__config.jsx';
import Ajudar from './codigo_js/Pagínas/ajudar__comunitaria.jsx';
import Pagina_arquivo_nao_encontrado from './codigo_js/Pagínas/pagina_arquivo_nao_encontrado.jsx';
import jsonfile from 'jsonfile';
import { useState } from 'react';
import './index.css'
import { use } from 'react';

const map_pag = {
  "/menu.html": <Menu/>,
  "/dados__filme.html": <Dados__filme/>,
  "/user__config.html": <User__config/>,
  "/ajudar": <Ajudar/>
}

function Validacao()
{  
  // por padrão o useState começa com uma tela preta
  const [pag, setPag] = useState(<div className="tela_preta"></div>)
  const [config, setConfig] = useState(null);

  useEffect(() => {
    jsonfile.readFile("C:/Users/jacye/OneDrive/Escritorio/projeto_2/client/src/config__tests.json", (e, json) => {
      setConfig(json)
      console.log(json)
    })
  }, [])

  // Para fazer os testes comente a da linha 42 até a 49

  // Validando o token se o token for positivo ele pegar a 
  // url e colocar no mapeamento das pagínas
  // e renderizar se não ele voltar para a pagína de login
  fetch(`http://localhost:3000/validar_token?token=${localStorage.getItem("token")}`).then(dados => dados.json()).then(dados => {
    if (dados == true) {
      setPag(map_pag[window.location.pathname])

    } else {
      window.location.href = "/"
    }
  })

  // Retorna a pag do useState

  // Para fazer os testes comente a linha abaixo
  // return map_pag[window.location.pathname]

  return pag
}

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
    element: <Validacao/>
  },
  {
    path: "/dados__filme.html",
    element: <Validacao/>
  },
  {
    path: "/user__config.html",
    element: <Validacao/>
  },
  {
    path: "/ajudar",
    element: <Validacao/>
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
