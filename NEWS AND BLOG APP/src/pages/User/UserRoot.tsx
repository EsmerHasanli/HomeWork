import { Outlet } from "react-router-dom";
import Navbar from "../../components/User/Navbar/Navbar";

const UserRoot = () => {
  
  return (
    <>
        <Navbar/>
        <Outlet/>
    </>
  )
}

export default UserRoot