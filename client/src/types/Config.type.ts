import { Filter } from "./Filter.type";

export type Config = {
  start_time: string;
  end_time: string;
  frequency: Filter;
  projects: string[];
};
