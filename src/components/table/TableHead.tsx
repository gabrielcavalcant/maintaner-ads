// import { Order } from "@/types";
// import {
//   Box,
//   TableCell,
//   TableHead as Head,
//   TableRow,
//   TableSortLabel,
// } from "@mui/material";
// import { visuallyHidden } from "@mui/utils";

// interface EnhancedTableProps {
//   numSelected: number;
//   onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
//   onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   order: Order;
//   orderBy: string;
//   rowCount: number;
//   headCells: any[];
// }

// export default function TableHead({
//   onSelectAllClick,
//   order,
//   orderBy,
//   numSelected,
//   rowCount,
//   onRequestSort,
//   headCells,
// }: EnhancedTableProps) {
//   const createSortHandler =
//     (property: string) => (event: React.MouseEvent<unknown>) => {
//       onRequestSort(event, property);
//     };

//   return (
//     <Head>
//       <TableRow>
//         {headCells.map(headCell => (
//           <TableCell
//             className=""
//             key={headCell.id}
//             align={headCell.numeric ? "right" : "left"}
//             padding={headCell.disablePadding ? "none" : "normal"}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               className=""
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : "asc"}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <Box component="span" sx={{ ...visuallyHidden }}>
//                   {order === "desc" ? "sorted descending" : "sorted ascending"}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </Head>
//   );
// }
