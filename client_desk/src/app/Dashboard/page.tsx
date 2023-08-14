import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  ChipProps,
} from "@nextui-org/react";
// Import the icons if available
// import { EditIcon } from "./EditIcon";
// import { DeleteIcon } from "./DeleteIcon";
// import { EyeIcon } from "./EyeIcon";
// import { columns, users } from "./data";

// Define the statusColorMap
const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

// Define the User type based on the data structure
type User = typeof users[0];

export default function App() {
  const renderCell = React.useCallback(
    (user: User, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof User];

      switch (columnKey) {
        // Handle each column case
        // ...

        // Commented out icon-related code
        // ...

        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column: typeof columns[number]) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={users}>
        {(item: User) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell key={columnKey}>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}