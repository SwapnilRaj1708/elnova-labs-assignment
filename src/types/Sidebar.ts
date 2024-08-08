export type SidebarMenuItem = {
  menuGroupName: string;
  menuItemId: number;
  menuItemName: string;
};

export type SidebarMenuItemsUpdated = {
  menuGroupName: string;
  items: { menuItemId: number; menuItemName: string }[];
};
