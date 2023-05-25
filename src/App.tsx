import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import GlobalStyle, { Container } from './styles'

import store from './store'
import Home from './pages/Home'
import Register from './pages/Cadastro'

const route = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/new',
    element: <Register />
  }
])
function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Container>
        <RouterProvider router={route}></RouterProvider>
      </Container>
    </Provider>
  )
}

export default App
