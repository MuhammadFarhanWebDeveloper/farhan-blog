import { useSelector } from "react-redux";
import UpdateUser from "../../components/UpdateUser";
import UserTable from "./components/PostsTable";
function UserProfile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="">
      <div className="w-full  min-h-[50vh]  flex flex-col justify-center items-center">
        <h1 className="text-center text-2xl font-bold mb-4">Posts</h1>
        <UserTable />
      </div>
      <UpdateUser />
    </div>
  );
}

export default UserProfile;
