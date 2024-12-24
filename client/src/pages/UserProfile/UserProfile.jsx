import { useSelector } from "react-redux";
import UpdateUser from "../../components/UpdateUser";
import PostsTable from "./components/PostsTable";
import { Outlet } from "react-router-dom";
import NavListItem from "../../components/Navbar/NavListItem";
function UserProfile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="">
      <ul className="w-full flex justify-center items-center gap-7 h-10 bg-gray-600">
      <NavListItem title={"Posts"} path={"/user/dashboard"}/>
      <NavListItem title={"Update User Info"} path={"/user/dashboard/update-user-info"}/>
      </ul>
      <div className="w-full ">
        <Outlet />
        {/* <h1 className="text-center text-2xl font-bold mb-4">Posts</h1> */}
        {/* <UserTable /> */}
      </div>
      {/* <UpdateUser /> */}
    </div>
  );
}

export default UserProfile;
