import { Route,Routes,Navigate,useNavigate } from 'react-router-dom';
import Registration from '../components/Registration';
import Login from '../components/Login';
import { useEffect } from 'react';

const Unauth = () => {
  const token = JSON.parse(localStorage.getItem("logindata"));
  const navigate = useNavigate();
  useEffect(()=>{
    if (token) {
      navigate("/transaction");
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <>
      {!token && (
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </>
  );
}

export default Unauth;



