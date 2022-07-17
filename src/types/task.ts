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
  dashboardId: number;
  /**
   * @description bug or task
   */
  typeId: number;
  note: string;
}
