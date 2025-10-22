import ExchangePage from "./pages/ExchangePage"

import {
  BrowserRouter, Routes, Route
} from "react-router-dom"
import { Header } from "./widgets"
import ServerContextProvider from "./shared/contexts/ServerContext"
import { ShopPage } from "./pages"

function App() {
  return (
    <ServerContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ExchangePage />}></Route>
          <Route path="/shop" element={<ShopPage />}></Route>
        </Routes>
      </BrowserRouter>
    </ServerContextProvider>
  )
}

export default App
