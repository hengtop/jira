import type { SortProps } from "./dashboard";
export interface TaskType {
  id: number;
  name: string;
  /**
   * @description 经办人
   */
  processorId: number;
  projectId: number;
  /**
   * @description 任务组
   */
  epicId: number;
  kanbanId: number;
  /**
   * @description bug or task
   */
  typeId: number;
  note: string;
}

export interface SortPropsTask extends SortProps {
  fromKanbanId?: number;
  toKanbanId?: number;
}
