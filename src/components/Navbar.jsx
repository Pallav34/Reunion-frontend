import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context, server } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";


const NavBar = () => {
  const { isAuthenticated,setIsAuthenticated,loading,setLoading } =
    useContext(Context);

  const logoutHandler = async ()=>{
    setLoading(true);
      try{
       await axios.get(`${server}/auth/logout`,{
         withCredentials:true,
       });
       toast.success("Logged Out");
       setIsAuthenticated(false);
       setLoading(false);
      }catch(error){
        toast.error(error.response.data.message);
        setIsAuthenticated(true);
        setLoading(false);
      }
   }
  return (
    <nav className="bg-gray-500 p-4">
    <div className="container mx-auto flex items-center justify-between">
      <div className="text-white text-2xl font-bold">Reunion.</div>
      <div>
        {isAuthenticated ? (
          <button
            onClick={logoutHandler}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-300 ease-in-out"
          >
            Logout
          </button>
        ) : (
          <div>
            <Link to='/signup' className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-md mr-2 transition-colors duration-300 ease-in-out">
              Sign Up
            </Link>
            <Link to='/login' className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-md transition-colors duration-300 ease-in-out">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  </nav>
  );
};

export default NavBar;
