import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Table from "../pages/transaction/compomnents/Table";
import { Dropdown } from "../components/Dropdown";
import { groupArr } from "../utils/constant";
import { useTransactionData } from "../context/transactionTable";
import { useEffect } from "react";

const Transaction = () => {
  const navigate = useNavigate();
  const { transactionData, setTransactionData } = useTransactionData();

  const [transactionDatas,setTransactionDatas]=useState(transactionData);
  // const retrivedata = [...transactionDatas;
  const [groupby, setGroupby] = useState({});

  useEffect(() => {
    console.log("transa>>>>>>");
    console.log(transactionData);
    setTransactionDatas(transactionData);
  }, [transactionData]);

  const [groupVal, setGroupVal] = useState("");

  useEffect(() => {
    console.log("render effect");
    groupBy(groupVal);
  }, [transactionDatas]);

  const groupBy = (e) => {
    const gData = [...transactionDatas];

    let groupData = {};
    if (e.target) {
      if (transactionDatas) {
        let field = e.target.value;
        setGroupVal(field);
        console.log(field, "field");

        if (field === "none") {
          setGroupby(groupData);
        } else {
          gData.forEach((items) => {
            const item = items[field]?.value;
            groupData[item] = groupData[item] ?? [];
            groupData[item].push(items);
          });
          setGroupby(groupData);
          // setTransactionData(groupData)
        }
      }
    } else {
      if (e) {
        console.log(e, "GEROERT>>>>>>>>>>>>>>");
        gData.forEach((items) => {
          const item = items[e]?.value;
          groupData[item] = groupData[item] ?? [];
          groupData[item].push(items);
        });
        setGroupby(groupData);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("logindata");
    navigate("/public/login");
  };

  return (
    <>
      <div className="details">
        <>
          <label>Group By:</label>
          <select
            className="groupby"
            onChange={(e) => {
              groupBy(e);
            }}
          >
            <Dropdown for={groupArr} />
          </select>
        </>

        <div>{transactionDatas && <Table records={transactionDatas} />}</div>

        <button className="createBtn">
          <Link to={"/create"}>Create Transaction</Link>
        </button>

        <button className="logoutBtn" onClick={logout}>
          Logout
        </button>
        <div className="groupDetails">
          {Object.keys(groupby).map((d, index) => {
            if (d !== undefined) {
              return (
                <>
                  <h2>{d}</h2>
                  <Table records={groupby[d]} />
                </>
              );
            } else {
              <></>;
            }
          })}
        </div>
      </div>
    </>
  );
};
export default Transaction;
