import "../assets/styles/transaction.css";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { MonthArr, TransactionTypeArr, AccountArr } from "../utils/constant";
import { Dropdown } from "./Dropdown";

const TransactionForm = () => {
  const { id } = useParams();
  const index = id - 1;
  const updateData = JSON.parse(localStorage.getItem("transactionForm"));
  const formDetails = {
    monthYear: {
      value: "",
      error: "",
    },
    transactionDate: {
      value: "",
      error: "",
    },
    transactionType: {
      value: "",
      error: "",
    },
    fromAccount: {
      value: "",
      error: "",
    },
    toAccount: {
      value: "",
      error: "",
    },
    transactionAmount: {
      value: "",
      error: "",
    },
    receipt: {
      value: "",
      error: "",
    },
    notes: {
      value: "",
      error: "",
    },
  };

  const [data, setData] = useState(formDetails);
  const [isDate, setDate] = useState(false);
  const [isMonth, setMonth] = useState(false);
  const [isAmount, setAmount] = useState(false);
  const [isFromAcc, setFromAcc] = useState(false);
  const [isToAcc, setToAcc] = useState(false);
  const [isNote, setNote] = useState(false);
  const [isReceipt, setReceipt] = useState(false);
  const [isType, setType] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    for (const key in updateData) {
      if (key && parseInt(updateData[key]?.id) === parseInt(id)) {
        setData(updateData[key]);
        break;
      }
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // onchange functions
  const DateHandler = (e) => {
    const date = e;
    if (date) {
      setData((prev) => ({
        ...prev,
        transactionDate: {
          ...prev.transactionDate,
          value: date,
          error: "",
        },
      }));
      setDate(true);
    } else {
      setData((prev) => ({
        ...prev,
        transactionDate: {
          ...prev.transactionDate,
          error: "date is Requierd!!",
        },
      }));
      setDate(false);
    }
  };

  const MonthHandler = (e) => {
    const month = e;
    if (month) {
      if (month === "Select") {
        setData((prev) => ({
          ...prev,
          monthYear: {
            ...prev.monthYear,
            error: "Month is Required!!",
          },
        }));
        setMonth(false);
      } else {
        setData((prev) => ({
          ...prev,
          monthYear: {
            ...prev.monthYear,
            value: month,
            error: "",
          },
        }));
        setMonth(true);
      }
    } else {
      setData((prev) => ({
        ...prev,
        monthYear: {
          ...prev.monthYear,
          error: "Month is Required!!",
        },
      }));
      setMonth(false);
    }
  };

  const TypeHandler = (e) => {
    const type = e;
    if (type) {
      if (type === "Select") {
        setData((prev) => ({
          ...prev,
          transactionType: {
            ...prev.transactionType,
            error: "type is Required!!",
          },
        }));
      } else {
        setType(false);
        setData((prev) => ({
          ...prev,
          transactionType: {
            ...prev.transactionType,
            value: type,
            error: "",
          },
        }));
        setType(true);
      }
    } else {
      setData((prev) => ({
        ...prev,
        transactionType: {
          ...prev.transactionType,
          error: "type is Required!!",
        },
      }));
      setType(false);
    }
  };

  const FromActHandler = (e) => {
    const FromAcc = e;
    if (FromAcc) {
      if (FromAcc === "Select") {
        setData((prev) => ({
          ...prev,
          fromAccount: {
            ...prev.fromAccount,
            error: "Account is Required!!",
          },
        }));
        setFromAcc(false);
      } else {
        setData((prev) => ({
          ...prev,
          fromAccount: {
            ...prev.fromAccount,
            value: FromAcc,
            error: "",
          },
        }));
        setFromAcc(true);
      }
    } else {
      setData((prev) => ({
        ...prev,
        fromAccount: {
          ...prev.fromAccount,
          error: "Account is Required",
        },
      }));
      setFromAcc(false);
    }
  };

  const toActHandler = (e) => {
    const ToAcc = e;
    if (ToAcc) {
      if (ToAcc === "Select") {
        setData((prev) => ({
          ...prev,
          toAccount: {
            ...prev.toAccount,
            error: "Account is Required!!",
          },
        }));
        setToAcc(false);
      } else {
        setData((prev) => ({
          ...prev,
          toAccount: {
            ...prev.toAccount,
            value: ToAcc,
            error: "",
          },
        }));
        setToAcc(true);
      }
    } else {
      setData((prev) => ({
        ...prev,
        toAccount: {
          ...prev.toAccount,
          error: "Account is Required!!",
        },
      }));
      setToAcc(false);
    }
  };

  const AmountHandler = (e) => {
    const value = e;
    setData((prev) => ({
      ...prev,
      transactionAmount: {
        ...prev.transactionAmount,
        value: value,
      },
    }));

    if (value) {
      if (value.length < 2) {
        setData((prev) => ({
          ...prev,
          transactionAmount: {
            ...prev.transactionAmount,
            error: "Amount is too short!!",
          },
        }));
        setAmount(false);
      } else {
        setData((prev) => ({
          ...prev,
          transactionAmount: {
            ...prev.transactionAmount,
            value: value,
            error: "",
          },
        }));
        setAmount(true);
      }
    } else {
      setData((prev) => ({
        ...prev,
        transactionAmount: {
          ...prev.transactionAmount,
          error: "amount is Required!!",
        },
      }));
      setAmount(false);
    }
  };

  const ReceiptHandler = (e) => {
    if (e) {
      if (e?.target?.type === "file") {
        if (e?.target?.files[0]?.size > 10000) {
          setData((prev) => ({
            ...prev,
            receipt: {
              ...prev.receipt,
              error: "Image is too large",
            },
          }));
          setReceipt(false);
        } else {
          let freader = new FileReader();
console.log(e?.target?.files[0]);
          freader.readAsDataURL(e?.target?.files[0]);

          freader.addEventListener("load", () => {
            const receiptPhoto = freader.result;
            console.log(receiptPhoto);
            setData((prev) => ({
              ...prev,
              receipt: {
                ...prev.receipt,
                value: receiptPhoto,
                error: "",
              },
            }));
            setReceipt(true);
          });
        }
      }
    } else {
      setData((prev) => ({
        ...prev,
        receipt: {
          ...prev.receipt,
          error: "Receipt is Required!!",
        },
      }));
      setReceipt(false);
    }
  };

  const NotesHandler = (e) => {
    const notes = e;

    setData((prev) => ({
      ...prev,
      notes: {
        ...prev.notes,
        value: notes,
      },
    }));

    if (notes.trim()) {
      if (notes.trim().length > 250 || notes.trim().length < 3) {
        setData((prev) => ({
          ...prev,
          notes: {
            ...prev.notes,
            error: "Notes is Required!!",
          },
        }));
        setNote(false);
      } else {
        setData((prev) => ({
          ...prev,
          notes: {
            ...prev.notes,
            error: "",
          },
        }));
        setNote(true);
      }
    } else {
      setData((prev) => ({
        ...prev,
        notes: {
          ...prev.notes,
          error: "Notes is Required!!",
        },
      }));
      setNote(false);
    }
  };

  const removeImage = () => {

    setData((prev) => ({
      ...prev,
      receipt: {
        ...prev.receipt,
        value: "",
      },
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    AmountHandler(data.transactionAmount.value);
    DateHandler(data.transactionDate.value);
    TypeHandler(data.transactionType.value);
    FromActHandler(data.fromAccount.value);
    toActHandler(data.toAccount.value);
    NotesHandler(data.notes.value);
    MonthHandler(data.monthYear.value);
    ReceiptHandler(data.receipt.value);

    console.log(
      isAmount,
      isDate,
      isFromAcc,
      isMonth,
      isNote,
      isReceipt,
      isToAcc,
      isType
    );

    if (
      isAmount &&
      isDate &&
      isFromAcc &&
      isMonth &&
      isNote &&
      isReceipt &&
      isToAcc &&
      isType
    ) {
      if (localStorage.getItem("transactionForm")) {
        const retrivedata = JSON.parse(localStorage.getItem("transactionForm"));

        if (id) {
          for (const e in retrivedata) {
            if (parseInt(retrivedata[e].id) === parseInt(id)) {
              data["id"] = id;
              retrivedata[e] = data;
            }
          }
        } else {
          const prevDataIndex = Object.keys(retrivedata).length - 1;

          const prevId = retrivedata[prevDataIndex]["id"];
          data["id"] = parseInt(prevId) + 1;

          retrivedata.push(data);
        }

        localStorage.setItem("transactionForm", JSON.stringify(retrivedata));
      } else {
        data["id"] = 1;

        localStorage.setItem("transactionForm", JSON.stringify([data]));
      }
      navigate("/transaction");
    } else {
      console.log("error existed");
    }
  };
  return (
    <>
      <div className="form">
        <form onSubmit={submitHandler} method="POST">
          <label className="label">Transaction Date:</label>
          <div className="input">
            <input
              type="date"
              id="date"
              name="transactionDate"
              value={data.transactionDate.value}
              onChange={(e) => {
                DateHandler(e.target.value);
              }}
              onClick={() => {
                const newdate = new Date();
                var year = newdate.getFullYear();
                var month = newdate.getMonth() + 1;
                var day = newdate.getDate();
                if (month < 10) {
                  month = "0" + month;
                }
                if (day < 10) {
                  day = "0" + day;
                }

                var limit = `${year}-${month}-${day}`;

                document.getElementById("date").setAttribute("max", limit);
              }}
            ></input>
            <span>{data.transactionDate.error}</span>
          </div>
          <br></br>
          <label className="label">Month Year:</label>

          <div className="input">
            <select
              name="monthYear"
              value={data.monthYear.value}
              id=""
              onChange={(e) => {
                MonthHandler(e.target.value);
              }}
            >
              <option value="select" selected>
                Select
              </option>

              {MonthArr.map((month) => {
                return (
                  <option value={`${month} 2023`}>{`${month} 2023`}</option>
                );
              })}
            </select>
            <span>{data.monthYear.error}</span>
          </div>
          <br></br>
          <label className="label">Transaction Type:</label>
          <div className="input">
            <select
              name="transactionType"
              value={data.transactionType.value}
              onChange={(e) => {
                TypeHandler(e.target.value);
              }}
            >
              <option value="select" selected>
                Select
              </option>
              <Dropdown for={TransactionTypeArr} />
            </select>
            <span>{data.transactionType.error}</span>
          </div>
          <br></br>

          <label className="label">From Account:</label>
          <div className="input">
            <select
              name="fromAccount"
              value={data.fromAccount.value}
              onChange={(e) => {
                FromActHandler(e.target.value);
              }}
            >
              <option value="select" selected>
                Select
              </option>
              <Dropdown for={AccountArr} />
            </select>
            <span>{data.fromAccount.error}</span>
          </div>
          <br></br>

          <label className="label">To Account: </label>
          <div className="input">
            <select
              name="toAccount"
              value={data.toAccount.value}
              onChange={(e) => {
                toActHandler(e.target.value);
              }}
            >
              <option value="select" selected>
                Select
              </option>
              <Dropdown for={AccountArr} />
            </select>
            <span>{data.toAccount.error}</span>
          </div>
          <br></br>
          <label className="label">Amount:</label>
          <div className="input">
            <input
              type="text"
              name="transactionAmount"
              value={data.transactionAmount.value}
              onChange={(e) => {
                AmountHandler(e.target.value);
              }}
            ></input>
            <span>{data.transactionAmount.error}</span>
          </div>
          <br></br>
          <label className="label">Receipt:</label>
          <div className="input">
            {data.receipt.value ? (
              <>
                <img src={data.receipt.value} width={50} height={50} alt="" />
                <span onClick={removeImage} className="cross">
                  X
                </span>
              </>
            ) : (
              <>
                <input
                  type="file"
                  name="receipt"
                  alt="Receipt is not found"
                  value={data.receipt.value}
                  onChange={(e) => {
                    ReceiptHandler(e);
                  }}
                ></input>
                <span onClick={removeImage} className="cross">
                  X
                </span>
              </>
            )}

            <span>{data.receipt.error}</span>
          </div>
          <br></br>
          <label className="label">Notes:</label>
          <div className="input">
            <textarea
              cols="30"
              rows="6"
              name="notes"
              value={data.notes.value}
              onChange={(e) => {
                NotesHandler(e.target.value);
              }}
            ></textarea>
            <span>{data.notes.error}</span>
          </div>

          <button type="submit" className="submitBtn">
            Submit
          </button>

          <Link to={`/transaction`} className="showTrn">
            Show Transaction
          </Link>
        </form>
      </div>
    </>
  );
};

export default TransactionForm;
