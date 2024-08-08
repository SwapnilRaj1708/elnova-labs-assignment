import Sidebar from "./components/sidebar";
import { Route, Routes } from "react-router-dom";
import AllUsersDashboard from "./pages/AllUsersDashboard";
import UserDashboard from "./pages/UserDashboard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { config } from "./apiConfig/User";

function App() {
  const dashboardNumberQuery = useQuery({
    queryKey: ["dashboardNumber"],
    queryFn: () =>
      axios
        .get(
          "http://enl-qa.centralindia.cloudapp.azure.com/assignment/dashboard/dashboardNumber",
          config,
        )
        .then((res) => res),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <div className="flex h-dvh max-h-dvh w-full">
      <Sidebar />
      <div className="h-full w-full bg-gradient-to-b from-[#EFEFE3] to-[#E4EBF5]">
        <div className="min-h-16 border-b border-b-[#5C6270] pb-3 pl-9 pt-6 text-xl font-medium">
          {dashboardNumberQuery.isLoading && "Loading Dashboard"}
          {dashboardNumberQuery.isSuccess &&
            dashboardNumberQuery.data.data.dashboardNumber}
          {dashboardNumberQuery.isError && "Error loading dashboard number!"}
        </div>
        <Routes>
          <Route index element={<AllUsersDashboard />} />
          <Route path="/user/:userId" element={<UserDashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
