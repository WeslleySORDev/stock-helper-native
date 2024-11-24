import { createContext, ReactNode, useContext, useState } from "react";

interface StockCountProviderProps {
  children: ReactNode;
}

type ProductType = {
  productName?: string;
  productId: string;
  amount: number;
};

type StockCountType = {
  stockName: string;
  stockId: string;
  stockProducts: ProductType[];
};

interface StockCountContextData {
  stockCountList: StockCountType[];
  createStockCount: (name: string) => void;
  deleteStockCount: (stockId: string) => void;
  updateStockCount: (stockId: string) => void;
  addProductToStockCount: (stockId: string) => void;
  removeProductFromStockCount: (stockId: string) => void;
  updateProductAmountFromStockCount: (stockId: string, amount: number) => void;
}

const StockCountContext = createContext<StockCountContextData>(
  {} as StockCountContextData
);

export function StockCountProvider({
  children,
}: StockCountProviderProps): JSX.Element {
  const [stockCountList, setStockCountList] = useState<StockCountType[]>([]);

  const createStockCount = (name: string) => {};

  const deleteStockCount = (stockId: string) => {};

  const updateStockCount = (stockId: string) => {};

  const addProductToStockCount = async (newProductId: string) => {
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

  const removeProductFromStockCount = (newProductId: string) => {
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

  const updateProductAmountFromStockCount = async ({
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
    <StockCountContext.Provider
      value={{
        stockCountList,
        addProductToStockCount,
        removeProductFromStockCount,
        updateProductAmountFromStockCount,
        createStockCount,
        deleteStockCount,
        updateStockCount,
      }}
    >
      {children}
    </StockCountContext.Provider>
  );
}

export function useStockCount(): StockCountContextData {
  const context = useContext(StockCountContext);
  return context;
}
