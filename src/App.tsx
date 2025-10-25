import ExchangePage from "./pages/exchange-page"

import {
  BrowserRouter, Routes, Route
} from "react-router-dom"
import { Header } from "./widgets"
  import { ShopPage } from "./pages"
import { Toaster } from "sonner"

function App() {
  return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ExchangePage />}></Route>
          <Route path="/shop" element={<ShopPage />}></Route>
        </Routes>
        <Toaster position="top-right" richColors />
      </BrowserRouter>
  )
}

export default App
