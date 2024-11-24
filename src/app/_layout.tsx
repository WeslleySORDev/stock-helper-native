import { Slot } from "expo-router";
import "../styles/globals.css";
import { StockCountProvider } from "../hooks/useStockCount";

export default function RootLayout() {
  return (
    <StockCountProvider>
      <Slot />
    </StockCountProvider>
  );
}
