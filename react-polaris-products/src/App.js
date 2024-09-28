import React from "react";
import { AppProvider } from "@shopify/polaris";
import ProductGrid from "./components/ProductGrid";
import "@shopify/polaris/build/esm/styles.css";

function App() {
  return (
    <AppProvider i18n={{}}>
      <div style={{ padding: "20px" }}>
        <ProductGrid />
      </div>
    </AppProvider>
  );
}

export default App;
