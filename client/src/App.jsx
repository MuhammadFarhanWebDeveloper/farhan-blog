import Navbar from "./components/Navbar/Navbar";
import AppWrapper from "./AppWrapper";
import { useEffect, useState } from "react";
import { signInSuccess  } from "./redux/user/userSlice";
import { useDispatch } from "react-redux";
import TopLoadingBar from "./components/TopLoadingBar";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const dispetch = useDispatch();
  const [loading, setloading] = useState(true)
  useEffect(() => {
    const getUserDetail = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/getone`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        if (!data.success) {
          setloading(false);
          return;
        }
        dispetch(signInSuccess(data.user));
      } catch (error) {
        console.log(error);
      }finally{
        setloading(false)
      }
    };
    getUserDetail();
  }, []);

  if(loading){
    return <LoadingScreen />
  }
  
  return (
    <>
    <TopLoadingBar />
      <Navbar  />
      <AppWrapper />
    </>
  );
}

export default App;
