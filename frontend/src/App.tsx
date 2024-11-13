import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/login/LoginPage"
import RegisterPage from "./pages/singin/RegisterPage"
import PrivateRoute from "./utils/PrivateRouter"
import Attack from "./pages/attack/Attack"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/"  element={<LoginPage/>}>
        </Route>
        <Route path="/register"  element={<RegisterPage/>}>
        </Route>
        <Route path="/attack"  element={<PrivateRoute component={<Attack/>}/>}>
        </Route>
      </Routes>
      {/* <LoginPage/> */}
    </div>
  )
}

export default App