import Button from "../components/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { config } from "../apiConfig/User";
import { User } from "../types/Users";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export default function AllUsersDashboard() {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState<
    User | Record<string, never>
  >({});

  const allUsersQuery = useQuery({
    queryKey: ["allUsers"],
    queryFn: () =>
      axios
        .get(
          "http://enl-qa.centralindia.cloudapp.azure.com/assignment/user/userInfo/allUsers",
          config,
        )
        .then((res) => res),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  function handleSelectUser(user: User) {
    if (user.userId === selectedUser.userId) setSelectedUser({});
    else setSelectedUser(user);
  }

  function handleShowDetails() {
    navigate(`/user/${selectedUser.userId}`);
  }

  return (
    <main className="h-full max-h-[calc(100%_-_64.8px)] overflow-auto bg-[#CEDAE054] px-9 py-4">
      <div className="flex flex-col items-end justify-start">
        <h2 className="w-full rounded-t-lg border-b-2 border-black bg-white pb-2 pt-[10px] text-center text-xl font-bold shadow">
          All Users
        </h2>
        {allUsersQuery.isLoading && (
          <div className="w-full bg-white py-10 text-center text-xl font-semibold text-[#909090]">
            Loading All Users
          </div>
        )}
        {allUsersQuery.isSuccess && (
          <table className="mb-4 w-full bg-white text-center text-xl font-semibold text-black shadow">
            <thead>
              <tr className="rounded border-b-2 border-black">
                <th className="py-1">ID</th>
                <th className="py-1">First Name</th>
                <th className="py-1">Middle Name</th>
                <th className="py-1">Last Name</th>
              </tr>
            </thead>
            <tbody>
              {allUsersQuery.data.data.map((user: User) => (
                <tr
                  key={user.userId}
                  onClick={() => handleSelectUser(user)}
                  className={twMerge(
                    "cursor-pointer",
                    "rounded",
                    "text-[#909090]",
                    "hover:bg-slate-200",
                    selectedUser?.userId === user.userId ? "bg-slate-300" : "",
                    selectedUser?.userId === user.userId
                      ? "hover:bg-slate-300"
                      : "",
                  )}
                >
                  <td className="py-1">{user.userId}</td>
                  <td className="py-1">{user.firstName}</td>
                  <td className="py-1">
                    {user.middleName ? user.middleName : "-"}
                  </td>
                  <td className="py-1">{user.lastName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {allUsersQuery.isError && (
          <div className="w-full bg-white py-10 text-center text-xl font-semibold text-[#909090]">
            Error loading all users!
          </div>
        )}
        {allUsersQuery.isSuccess && (
          <Button
            disabled={!Object.keys(selectedUser).length}
            tooltipOnDisabled="Select a user first"
            onClick={handleShowDetails}
          >
            Show Details
          </Button>
        )}
      </div>
    </main>
  );
}
