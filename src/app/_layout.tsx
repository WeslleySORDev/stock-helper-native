import { Stack } from "expo-router";
import { StockCountProvider } from "../hooks/useStockCount";
import "../styles/globals.css";
import "react-native-get-random-values";

export default function RootLayout() {
  return (
      <StockCountProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="stockCount/[stockId]"
            options={{ title: "Contagem de Estoque" }}
          />
        </Stack>
      </StockCountProvider>
  );
}
