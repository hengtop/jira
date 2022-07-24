export interface DashboardType {
  id: number;
  name: string;
  projectId: number;
}

export interface SortProps {
  /**
   * 要重新排序的itemId
   */
  fromId: number;
  /**
   * 目标ItemId
   */
  referenceId: number;
  /**
   * 放在目标的前面还是后边
   */
  type: "before" | "after";
}
