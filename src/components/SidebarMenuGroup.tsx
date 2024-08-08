type SidebarMenuGroupPropsType = {
  menuItem: {
    menuGroupName: string;
    items: {
      menuItemId: number;
      menuItemName: string;
    }[];
  };
};

export default function SidebarMenuGroup({
  menuItem,
}: SidebarMenuGroupPropsType) {
  return (
    <div key={menuItem.menuGroupName} className="flex flex-col gap-3 py-2">
      <p className="pr-16 text-end text-2xl text-[#A1A5B0]">
        {menuItem.menuGroupName}
      </p>
      <ul className="flex flex-col gap-2 text-lg text-[#d9d9d9]" role="list">
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
  );
}
