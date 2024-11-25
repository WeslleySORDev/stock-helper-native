import { createContext, ReactNode, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface StockCountProviderProps {
  children: ReactNode;
}

type ProductType = {
  productName?: string;
  productCode: string;
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
  // updateStockCount: (stockId: string) => void;
  addProductToStockCount: (
    stockId: string,
    newProductCode: string,
    newProductName?: string
  ) => void;
  removeProductFromStockCount: (stockId: string, productCode: string) => void;
  updateProductAmountFromStockCount: (
    stockId: string,
    productCode: string,
    amount: number
  ) => void;
}

const StockCountContext = createContext<StockCountContextData>(
  {} as StockCountContextData
);

export function StockCountProvider({
  children,
}: StockCountProviderProps): JSX.Element {
  const [stockCountList, setStockCountList] = useState<StockCountType[]>([]);

  const createStockCount = (name: string) => {
    var copyStockCountList = [...stockCountList];
    const newStockCount: StockCountType = {
      stockId: uuidv4(),
      stockName: name,
      stockProducts: [],
    };
    copyStockCountList.push(newStockCount);
    setStockCountList(copyStockCountList);
  };

  const deleteStockCount = (stockId: string) => {
    var copyStockCountList = [...stockCountList];
    const findActualStockIndex = copyStockCountList.findIndex(
      (stock) => stock.stockId === stockId
    );
    if (findActualStockIndex === -1) {
      console.error(
        `Contagem de Estoque com o ID ${stockId} não encontrado no estoque.`
      );
      return;
    }

    copyStockCountList[findActualStockIndex].stockProducts.splice(
      findActualStockIndex,
      1
    );
    setStockCountList(copyStockCountList);
  };

  // const updateStockCount = (stockId: string) => {};

  const addProductToStockCount = (
    stockId: string,
    newProductCode: string,
    newProductName?: string
  ) => {
    var copyStockCountList = [...stockCountList];
    const findActualStockIndex = copyStockCountList.findIndex(
      (stock) => stock.stockId === stockId
    );

    if (findActualStockIndex === -1) {
      console.error(
        `Nenhuma contagem de estoque encontrada com o ID: ${stockId}`
      );
      return;
    }

    const productExists = copyStockCountList[
      findActualStockIndex
    ].stockProducts.find((product) => product.productCode === newProductCode);
    const currentAmount = productExists ? productExists.amount : 0;
    const amount = currentAmount + 1;

    if (productExists) {
      productExists.amount = amount;
    } else {
      const newProduct: ProductType = {
        productName: newProductName ? newProductName : undefined,
        productCode: newProductCode,
        amount: 1,
      };
      copyStockCountList[findActualStockIndex].stockProducts.push(newProduct);
    }

    setStockCountList(copyStockCountList);
  };

  const removeProductFromStockCount = (
    stockId: string,
    productCode: string
  ) => {
    var copyStockCountList = [...stockCountList];
    const findActualStockIndex = copyStockCountList.findIndex(
      (stock) => stock.stockId === stockId
    );

    if (findActualStockIndex === -1) {
      console.error(
        `Nenhuma contagem de estoque encontrada com o ID: ${stockId}`
      );
      return;
    }

    const findProductIndex = copyStockCountList[
      findActualStockIndex
    ].stockProducts.findIndex((product) => product.productCode === productCode);

    if (findProductIndex === -1) {
      console.error(
        `Produto com o ID ${productCode} não encontrado no estoque.`
      );
      return;
    }

    copyStockCountList[findActualStockIndex].stockProducts.splice(
      findProductIndex,
      1
    );
    setStockCountList(copyStockCountList);
  };

  const updateProductAmountFromStockCount = (
    stockId: string,
    productCode: string,
    amount: number
  ) => {
    if (!Number.isFinite(amount) || amount <= 0) {
      console.error("Quantidade inválida fornecida:", amount);
      return;
    }

    var copyStockCountList = [...stockCountList];
    const findActualStockIndex = copyStockCountList.findIndex(
      (stock) => stock.stockId === stockId
    );

    if (findActualStockIndex === -1) {
      console.error(
        `Nenhuma contagem de estoque encontrada com o ID: ${stockId}`
      );
      return;
    }

    const productExists = copyStockCountList[
      findActualStockIndex
    ].stockProducts.find((product) => product.productCode === productCode);

    if (!productExists) {
      console.error(
        `Produto com o ID ${productCode} não encontrado no estoque.`
      );
      return;
    }

    productExists.amount = amount;
    setStockCountList(copyStockCountList);
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
        // updateStockCount,
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
