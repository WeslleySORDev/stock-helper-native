import { Slot } from "expo-router";
import "../styles/globals.css";
import { StockProvider } from "../hooks/useStock";

export default function RootLayout() {
  return (
    <StockProvider>
      <Slot />
    </StockProvider>
  );
}
