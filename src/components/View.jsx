import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTransactionData } from "../context/transactionTable";
import { formatter } from "../utils/helper";
const View = () => {
  const { id } = useParams();
  // params give id no. but we need index to fetch data
  const index = id - 1;
 const { transactionData } = useTransactionData();
  // const retrivedata = JSON.parse(localStorage.getItem("transactionForm"));
    const retrivedata = transactionData  ;
  return (
    <>
      <div className="container-fluid">
        <div class="container">
          <h2>Transaction</h2>
          {[retrivedata[index]].map((data, index) => (
            <>
              <div>
                <div>
                  <label>Date of your transaction:</label>
                  <span>{data.transactionDate.value}</span>
                </div>
                <div>
                  <label>Month year:</label>
                  <span>{data.monthYear.value}</span>
                </div>
                <div>
                  <label>Amount:</label>
                  <span>{formatter.format(data.transactionAmount.value)}</span>
                </div>
                <div>
                  <label>Transaction Type:</label>
                  <span>{data.transactionType.value}</span>
                </div>
                <div>
                  <label>From Acoount:</label>
                  <span>{data.fromAccount.value}</span>
                </div>
                <div>
                  <label>To Acoount:</label>
                  <span>{data.toAccount.value}</span>
                </div>
                <div>
                  <div>
                    <label>Receipt:</label>
                    <img
                      src={data.receipt.value}
                      width={70}
                      height={70}
                      alt=""
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <label>Notes:</label>
                    <span>{data.notes.value}</span>
                  </div>
                  <div></div>
                </div>
              </div>
            </>
          ))}
          <div>
            <Link class="button-30" to={`/transaction`} className="ViewBtn">
              View Transaction
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default View;
