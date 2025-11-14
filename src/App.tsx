import {
  BrowserRouter, Routes, Route,
} from "react-router-dom"
import { Header } from "./widgets"
import { Toaster } from "sonner"

import {
  Links
} from "./shared/constants/Menu.constants"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {
          Links.map(({
            to, page: Page
          }) => Page && <Route key={to} path={to} element={<Page />}></Route>)
        }
      </Routes>
      <Toaster position="top-right" richColors />
    </BrowserRouter>
  )
}

export default App
