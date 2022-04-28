import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import ExamplePage from "./pages/ExamplePage";
import Login from "./pages/LoginPage";
import { createRoot } from "react-dom/client";
import CreateAccount from "./pages/CreateAccount";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
	<Routes>
      <Route path="/example-page" element={<ExamplePage />} />
  </Routes>
  <Routes>
      <Route path="/login" element={<Login />} />
   </Routes>
   <Routes>
      <Route path="/create-account" element={<CreateAccount />} />
   </Routes>
  </BrowserRouter>
);