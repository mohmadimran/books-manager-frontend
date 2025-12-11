import { Routes, Route} from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import PrivateRoute from "./routes/privateRoutes";
import Navbar from "./component/navbar";
import Dashboard from "./pages/dashbord";

export default function App() {
  return (
    <div className="app">
      <Navbar />

      <main>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
