import Button from "../components/Button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { config } from "../apiConfig/User";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function UserDashboard() {
  const { userId } = useParams();
  const userQuery = useQuery({
    queryKey: ["user", userId],
    queryFn: () =>
      axios
        .get(
          `http://enl-qa.centralindia.cloudapp.azure.com/assignment/user/userInfo/${userId}`,
          config,
        )
        .then((res) => res),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <main className="h-full max-h-[calc(100%_-_64.8px)] overflow-auto bg-[#CEDAE054] px-9 py-4">
      <div className="flex flex-col items-start justify-start">
        <Link to="/">
          <Button className="mb-6 flex gap-4">
            <FaArrowLeft /> All Users
          </Button>
        </Link>
        {userQuery.isLoading && (
          <div className="flex w-full max-w-[500px] flex-col gap-4 bg-white py-6">
            <div className="flex w-full gap-10">
              <p className="w-full text-center font-semibold">
                Loading User Data
              </p>
            </div>
          </div>
        )}
        {userQuery.isSuccess && (
          <div className="flex w-full max-w-[500px] flex-col gap-4 bg-white py-6">
            <div className="flex w-full gap-10">
              <p className="w-[140px] text-end font-semibold">User ID</p>
              <p>{userQuery.data.data.userId}</p>
            </div>
            <div className="flex w-full gap-10">
              <p className="w-[140px] text-end font-semibold">Salutation</p>
              <p>{userQuery.data.data.salutation}</p>
            </div>
            <div className="flex w-full gap-10">
              <p className="w-[140px] text-end font-semibold">Full Name</p>
              <p>{`${userQuery.data.data.firstName} ${userQuery.data.data.middleName ? `${userQuery.data.data.middleName} ` : ""}${userQuery.data.data.lastName}`}</p>
            </div>
          </div>
        )}
        {userQuery.isError && (
          <div className="flex w-full max-w-[500px] flex-col gap-4 bg-white py-6">
            <div className="flex w-full gap-10">
              <p className="w-full text-center font-semibold">
                Error loading user data!
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
