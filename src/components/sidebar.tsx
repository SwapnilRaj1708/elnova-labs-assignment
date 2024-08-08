import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { config } from "../apiConfig/User";
import { SidebarMenuItem, SidebarMenuItemsUpdated } from "../types/Sidebar";

export default function Sidebar() {
  const [menuItems, setMenuItems] = useState<SidebarMenuItemsUpdated[]>([]);

  const sidebarQuery = useQuery({
    queryKey: ["sidebar"],
    queryFn: () =>
      axios
        .get(
          "http://enl-qa.centralindia.cloudapp.azure.com/assignment/sidebarMenu/menuItems",
          config,
        )
        .then((res) => res),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (sidebarQuery.isSuccess) {
    // sidebarQuery.data.data has the data in array of objects example {menuGroupName: "Group Two", menuItemId: 2,menuItemName: "Menu Item 21"}. I want the data to be arranged as array of object as {menuGroupName: "Group Two", items: [ {menuItemId: 2,menuItemName: "Menu Item 21"} ] }
    if (menuItems.length === 0)
      setMenuItems(
        sidebarQuery.data.data.reduce(
          (acc: SidebarMenuItemsUpdated[], item: SidebarMenuItem) => {
            const index = acc.findIndex(
              (accItem) => accItem.menuGroupName === item.menuGroupName,
            );
            if (index === -1) {
              acc.push({
                menuGroupName: item.menuGroupName,
                items: [
                  {
                    menuItemId: item.menuItemId,
                    menuItemName: item.menuItemName,
                  },
                ],
              });
            } else {
              acc[index].items.push({
                menuItemId: item.menuItemId,
                menuItemName: item.menuItemName,
              });
            }
            return acc;
          },
          [],
        ),
      );
  }

  return (
    <aside className="h-full w-[34%] min-w-[213px] max-w-[300px] bg-[#191F2D] text-white">
      <p className="m-0 border-b border-b-[#5C6270] pb-3 pl-3 pr-16 pt-[16px] text-end text-3xl font-normal">
        Assignment
      </p>
      <div className="flex h-full max-h-[calc(100%_-_64.8px)] w-full flex-col gap-3 overflow-auto py-3">
        {sidebarQuery.isLoading && (
          <div className="flex flex-col gap-3 py-2">
            <p className="pr-16 text-end text-2xl text-[#A1A5B0]">
              Loading Sidebar
            </p>
          </div>
        )}
        {sidebarQuery.isSuccess &&
          menuItems.map((menuItem) => (
            <div
              key={menuItem.menuGroupName}
              className="flex flex-col gap-3 py-2"
            >
              <p className="pr-16 text-end text-2xl text-[#A1A5B0]">
                {menuItem.menuGroupName}
              </p>
              <ul
                className="flex flex-col gap-2 text-lg text-[#d9d9d9]"
                role="list"
              >
                {menuItem?.items.map((item) => (
                  <li
                    key={item.menuItemId}
                    className="cursor-pointer py-[6px] pr-20 text-end hover:bg-[#628ad654]"
                  >
                    {item.menuItemName}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        {sidebarQuery.isError && (
          <div className="flex flex-col gap-3 py-2">
            <p className="pr-16 text-end text-2xl text-[#A1A5B0]">
              Error loading sidebar items!
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
