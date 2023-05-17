import  Auth from './auth/Auth';
import Unauth from './auth/Unauth';
import "./assets/styles/transaction.css";
import { BrowserRouter, Route, Routes,Navigate} from "react-router-dom";
import TableContext from "./context/transactionTable";

const  App = ()=> {
 
  return (
    <TableContext>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<YupValidations/>} /> */}
          <Route path="/public/*" element={<Unauth />} />
          <Route path="/*" element={<Auth />} />
          <Route path="/*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </TableContext>
  );
}

export default App;
