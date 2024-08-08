export type SidebarMenuItem = {
  menuGroupName: string;
  menuItemId: number;
  menuItemName: string;
};

export type SidebarMenuItemsChanged = {
  menuGroupName: string;
  items: { menuItemId: number; menuItemName: string }[];
};
