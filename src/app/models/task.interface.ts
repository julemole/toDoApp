export interface ITask {
  id?: number;
  name: string;
  completed?: boolean;
  category_id: number;
  category_name?: string;
}

export interface ICategory {
  id?: number;
  name: string;
}
