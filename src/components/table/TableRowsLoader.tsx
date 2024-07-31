import { Column } from "@/types";
import { Skeleton, TableCell, TableRow } from "@mui/material";

interface TableRowsLoaderProps {
  rowsNum: number;
  columns: Column[];
}

export default function TableRowsLoader({
  rowsNum,
  columns,
}: TableRowsLoaderProps) {
  return (
    <>
      {Array.from({ length: rowsNum }, (_, rowIndex) => (
        <TableRow key={`row-${rowIndex}`}>
          {columns.map((column, index) => (
            <TableCell
              sx={{
                alignItems: "center",
                overflowX: "auto",
                ...column.sx,
                paddingX: "1vw",
                paddingY: "0.28vw",
              }}
              key={`cell-${rowIndex}-${column.id}`} // cada célula precisa de uma chave única
            >
              {column.id === "actions" ? (
                <div className="flex items-center">
                  {column.childrens?.map((child, index) => (
                    <Skeleton
                      key={index}
                      animation="wave"
                      variant="circular"
                      className="h-full w-auto aspect-square"
                    />
                  ))}
                </div>
              ) : (
                <Skeleton animation="wave" variant="text" />
              )}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
