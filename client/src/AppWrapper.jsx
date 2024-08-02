import { Outlet } from "react-router-dom";
function AppWrapper() {
  return (
    <div className="">
        <main
          className={` min-h-screen px-5 py-5`}
        >
          <Outlet />
        </main>
    </div>
  );
}

export default AppWrapper;
