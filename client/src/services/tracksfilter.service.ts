import {
  addMonths,
  addWeeks,
  format,
  isBefore,
  isWithinInterval,
  subDays,
} from "date-fns";

import { ITrack } from "../interfaces/ITrack.interface";
import { Filter } from "../types/Filter.type";

export const filterTracksByDateAndProjects = (
  tracks: ITrack[],
  start: Date,
  end: Date,
  selectedProjects: string[]
) =>
  tracks.filter((track) => {
    if (
      !isWithinInterval(new Date(track.start_time), {
        start,
        end,
      })
    ) {
      return false;
    }
    if (!selectedProjects.includes(track.project)) {
      return false;
    }
    return true;
  });

export const getIntervalDates = (start: Date, end: Date, frequency: Filter) => {
  let startInterval = start;
  let intervals: Date[] = [];
  while (isBefore(startInterval, end)) {
    intervals.push(startInterval);
    switch (frequency) {
      case "weekly":
        startInterval = addWeeks(startInterval, 1);
        break;
      case "bi-weekly":
        startInterval = addWeeks(startInterval, 2);
        break;
      case "monthly":
        startInterval = addMonths(startInterval, 1);
        break;
      case "bi-monthly":
        startInterval = addMonths(startInterval, 2);
        break;
      default:
        startInterval = addWeeks(startInterval, 1);
    }
  }
  return intervals;
};

export const getTimeGroupHeaders = (intervals: Date[], end_time: Date) => {
  const timeGroups: Record<string, Date | string>[] = [];
  intervals.forEach((interval, i) => {
    let tag: string;
    let start: Date = interval;
    let end: Date;
    if (i < intervals.length - 1) {
      end = subDays(intervals[i + 1], 1);
      tag = `${format(start, "MMM dd")} - ${format(end, "MMM dd")}`;
      timeGroups.push({
        tag,
        start,
        end,
      });
      return;
    }
    end = new Date(end_time);
    tag = `${format(start, "MMM dd")} - ${format(end, "MMM dd")}`;
    timeGroups.push({
      tag,
      start,
      end,
    });
  });
  return timeGroups;
};

export const fillColumnGroupHeaders = (columns: any[], projects: string[]) => {
  columns.push(
    {
      header: "Aggregated Hours",
      columns: [
        ...projects.map((project) => ({
          header: project,
          accessorKey: `Aggregated Hours ${project}`,
        })),
        { header: "Total", accessorKey: "Aggregated Hours Total" },
      ],
    },
    {
      header: "Cost",
      columns: [
        ...projects.map((project) => ({
          header: project,
          accessorKey: `Cost ${project}`,
        })),
        { header: "Cost Per Dev", accessorKey: "Cost Cost Per Dev" },
      ],
    }
  );
};
