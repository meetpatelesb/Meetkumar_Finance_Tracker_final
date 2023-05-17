import React, {  createContext, useState, useContext } from "react";
import { defaultTransactionData } from "../utils/constant";

const transactionContext = createContext({});
export const useTransactionData = () =>  useContext(transactionContext);
const TableContext = ({ children }) => {
  const [transactionData, setTransactionData] = useState(
    defaultTransactionData
  );
  return (
    <>
      <transactionContext.Provider
        value={{ transactionData, setTransactionData }}
      >
        {children}
      </transactionContext.Provider>
    </>
  );
};
export default TableContext;
