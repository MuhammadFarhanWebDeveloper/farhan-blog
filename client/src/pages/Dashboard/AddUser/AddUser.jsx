import React from "react";

const AddUser = () => {
  return (
    <div className="m-2 w-1/2 mx-auto rounded border h-fit ">
      <h1 className="text-center text-2xl font-bold">Add User</h1>
      <form
        className="w-full flex justify-around p-2 flex-wrap items-center"
      >
        <div className="w-full p-3">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className="bg-gray-900 w-full p-2 rounded"
          />
        </div>
        <div className="w-full p-3">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="bg-gray-900 w-full p-2 rounded"
          />
        </div>
        <div className="w-full p-3">
          <input
            type="file"
            name="image"
            id="image"
            className="bg-gray-900 w-full p-2 rounded"
          />
        </div>
        <div className="w-1/2 p-3">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="bg-gray-900 w-full p-2 rounded"
          />
        </div>

        <div className="w-1/2 p-3">
          <select
            name="isAdmin"
            className="bg-gray-900 w-full p-2 rounded"
            id="isAdmin"
          >
            <option value="default">Is Admin</option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>


        <div className="w-full p-3 my-3">
          <button className="bg-blue-900 w-full p-2 rounded">Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
