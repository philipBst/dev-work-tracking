import { useCallback, useRef, useState } from "react";
import { VStack, TableContainer } from "@chakra-ui/react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { format, isWithinInterval, differenceInHours } from "date-fns";
import { groupBy } from "lodash";

import { FilterForm, TracksTable } from "./components";

import { getAllTracks } from "./services/tracks.service";

import { Config, TableData } from "./types";
import { ITrack } from "./interfaces";
import {
  fillColumnGroupHeaders,
  filterTracksByDateAndProjects,
  getIntervalDates,
  getTimeGroupHeaders,
} from "./services/tracksfilter.service";

const preFetch = (() => getAllTracks())();

const initialTableData: TableData = { columns: [], data: [] };

const currentDate = format(new Date(), "yyyy-MM-dd").concat(
  "T",
  format(new Date(), "hh:mm")
);

const initialFilterConfig: Config = {
  start_time: currentDate,
  end_time: currentDate,
  frequency: "weekly",
  projects: [],
};

function App() {
  const [table, setTable] = useState<TableData>(initialTableData);
  const filterConfig = useRef<Config>(initialFilterConfig);

  const { getHeaderGroups, getRowModel } = useReactTable({
    columns: table.columns,
    data: table.data,
    getCoreRowModel: getCoreRowModel(),
  });

  const onFilter = useCallback(() => {
    const { start_time, end_time, frequency, projects } = filterConfig.current;
    if (!projects.length) {
      return;
    }
    const columns: any[] = [
      { header: "Name", accessorKey: "name" },
      { header: "Hourly Rate", accessorKey: "hourlyRate" },
    ];
    preFetch.then((tracks: ITrack[]) => {
      const start = new Date(start_time);
      const end = new Date(end_time);
      const filteredTracks = filterTracksByDateAndProjects(
        tracks,
        start,
        end,
        projects
      );
      const groupedByName = groupBy(filteredTracks, "workers");
      let intervals = getIntervalDates(start, end, frequency);
      const timeGroups: Record<string, Date | string>[] = getTimeGroupHeaders(
        intervals,
        end
      );
      timeGroups.forEach((timeGroup) => {
        columns.push({
          header: timeGroup.tag,
          columns: projects.map((project) => ({
            header: `${project}`,
            accessorKey: `${timeGroup.tag} ${project}`,
          })),
        });
      });
      const rows = [];
      for (const name in groupedByName) {
        let row: Record<string, string | number> = {
          name,
          hourlyRate: Math.floor(Math.random() * 1000),
        };
        const aggregatedHoursTotal = `Aggregated Hours Total`;
        row[aggregatedHoursTotal] = 0;
        const totalCostPerDev = "Cost Cost Per Dev";
        row[totalCostPerDev] = 0;
        projects.forEach((project) => {
          const allRelatedProjects = groupedByName[name].filter(
            (track) => track.project === project
          );
          const aggregatedHours = `Aggregated Hours ${project}`;
          row[aggregatedHours] = 0;
          const costPerProject = `Cost ${project}`;
          row[costPerProject] = 0;
          timeGroups.forEach((timeGroup) => {
            const key = `${timeGroup.tag} ${project}`;
            row[key] = 0;
            allRelatedProjects.forEach((track) => {
              if (
                isWithinInterval(new Date(track.start_time), {
                  start: timeGroup.start as Date,
                  end: timeGroup.end as Date,
                })
              ) {
                const hoursWorked = differenceInHours(
                  new Date(track.end_time),
                  new Date(track.start_time)
                );
                //@ts-ignore
                row[key] += hoursWorked;
                //@ts-ignore
                row[aggregatedHours] += hoursWorked;
                //@ts-ignore
                row[aggregatedHoursTotal] += hoursWorked;
                //@ts-ignore
                row[costPerProject] += hoursWorked * row.hourlyRate;
                //@ts-ignore
                row[totalCostPerDev] += hoursWorked * row.hourlyRate;
              }
            });
          });
        });
        rows.push(row);
      }
      if (rows.length > 0) {
        fillColumnGroupHeaders(columns, projects);
        setTable({
          columns,
          data: rows,
        });
      }
    });
  }, []);

  return (
    <VStack mt={10}>
      <FilterForm config={filterConfig} onFilter={onFilter} />
      <TableContainer maxWidth={1200}>
        <TracksTable
          getHeaderGroups={getHeaderGroups}
          getRowModel={getRowModel}
        />
      </TableContainer>
    </VStack>
  );
}

export default App;
