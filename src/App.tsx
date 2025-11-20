import {
  BrowserRouter
} from "react-router-dom"
import { Toaster } from "sonner"
import Header from "./widgets/header/Header"
import { AppRoutes } from "./shared/routes/AppRoutes"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRoutes />
      <Toaster position="top-right" richColors />
    </BrowserRouter>
  )
}

export default App
