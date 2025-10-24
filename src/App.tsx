import ExchangePage from "./pages/ExchangePage"

import {
  BrowserRouter, Routes, Route
} from "react-router-dom"
import { Header } from "./widgets"
import ServerContextProvider from "./shared/contexts/ServerContext"
import { ShopPage } from "./pages"
import { Toaster } from "sonner"

function App() {
  return (
    <ServerContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ExchangePage />}></Route>
          <Route path="/shop" element={<ShopPage />}></Route>
        </Routes>
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </ServerContextProvider>
  )
}

export default App
