import { createContext, ReactNode, useContext, useState } from "react";

interface StockProviderProps {
  children: ReactNode;
}

type ProductStockType = {
  productId: string;
  amount: number;
};

interface StockContextData {
  stock: ProductStockType[];
  addProduct: (productId: string) => Promise<void>;
  removeProduct: (productId: string) => void;
  updateProductAmount: ({ productId, amount }: ProductStockType) => void;
}

const StockContext = createContext<StockContextData>({} as StockContextData);

export function StockProvider({ children }: StockProviderProps): JSX.Element {
  const [stock, setStock] = useState<ProductStockType[]>([
    { productId: "ARL5112", amount: 5 },
    { productId: "ARL2245", amount: 3 },
    { productId: "S11954", amount: 1 },
    { productId: "S19523", amount: 2 },
    { productId: "S2143", amount: 8 },
  ]);

  const addProduct = async (newProductId: string) => {
    try {
      const updatedStock = [...stock];
      const productExists = updatedStock.find(
        (product) => product.productId === newProductId
      );
      const currentAmount = productExists ? productExists.amount : 0;
      const amount = currentAmount + 1;

      if (productExists) {
        productExists.amount = amount;
      } else {
        const newProduct = {
          productId: newProductId,
          amount: 1,
        };
        updatedStock.push(newProduct);
      }

      setStock(updatedStock);
    } catch {
      console.error("Erro na adição do produto");
    }
  };

  const removeProduct = (newProductId: string) => {
    try {
      const updatedStock = [...stock];
      const findIndex = updatedStock.findIndex(
        (product) => product.productId === newProductId
      );
      if (findIndex >= 0) {
        updatedStock.splice(findIndex, 1);
        setStock(updatedStock);
      } else {
        throw Error();
      }
    } catch {
      console.error("Erro na remoção do produto");
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: ProductStockType) => {
    try {
      if (amount <= 0) {
        return;
      }
      const updatedStock = [...stock];
      const productExists = updatedStock.find(
        (product) => product.productId === productId
      );

      if (productExists) {
        productExists.amount = amount;
        setStock(updatedStock);
      } else {
        throw Error();
      }
    } catch {
      console.error("Erro na alteração de quantidade do produto");
    }
  };

  return (
    <StockContext.Provider
      value={{ stock, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </StockContext.Provider>
  );
}

export function useStock(): StockContextData {
  const context = useContext(StockContext);
  return context;
}
