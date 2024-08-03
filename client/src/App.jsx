import Navbar from "./components/Navbar/Navbar";
import AppWrapper from "./AppWrapper";
import ThemeProvider from "./components/ThemeProvider";
import { useEffect, useState } from "react";
import { signInSuccess } from "./redux/user/userSlice";
import { useDispatch } from "react-redux";

function App() {
  const [loading, setloading] = useState(true);

  const dispetch = useDispatch();
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
        setloading(false);
      } catch (error) {
        setloading(false);
        console.log(error);
      }
    };
    getUserDetail();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <ThemeProvider>
      <Navbar />
      <AppWrapper />
    </ThemeProvider>
  );
}

export default App;
