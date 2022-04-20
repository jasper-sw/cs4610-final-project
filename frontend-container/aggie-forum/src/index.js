import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import ExamplePage from "./pages/ExamplePage";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
	<Routes>
      <Route path="/example-page" element={<ExamplePage />} />
    </Routes>
  </BrowserRouter>
);