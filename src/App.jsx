import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import PricingPage from "./pages/PricingPage";
import HomePage from "./pages/HomePage";
import PageNotFond from "./pages/PageNotFond";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="product" element={<ProductPage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="*" element={<PageNotFond />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
