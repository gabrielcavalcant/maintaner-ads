"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Column, Order, Tag } from "@/types";
import { Link } from "@/navigation";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/navigation";
import TablePaginationActions from "./TablePaginationActions";
import TableHead from "./TableHead";
import { Checkbox, Skeleton, makeStyles } from "@mui/material";
import TableRowsLoader from "./TableRowsLoader";
import SearchFilter from "../searchFilter/SearchFilter";
import CheckboxInput from "../inputs/CheckboxInput";

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number,
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface TableComponentProps {
  initialRowsPerPage?: number;
  columns: Column[];
  rows: any[];
  count: number;
  loading?: boolean;
  tagParamName?: string;
  orderParamName?: string;
  orderByParamName?: string;
  pageParamName?: string;
  onPageChange?: (newPage: number) => void;
  fakePagination?: boolean;
  fakePaginationDelay?: number;
  showSearch?: boolean;
}

export default function TableComponent({
  initialRowsPerPage = 15,
  columns,
  rows,
  count,
  orderParamName = "order",
  orderByParamName = "orderBy",
  loading = false,
  tagParamName = "tags",
  pageParamName = "page",
  onPageChange,
  fakePagination = true,
  fakePaginationDelay = 500,
  showSearch = true,
}: TableComponentProps) {
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [dense, setDense] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const order = (searchParams.get(orderParamName) || "asc") as Order;
  const pageParam = searchParams.get(pageParamName) || "";
  const page = parseInt(pageParam) || 0;
  const orderBy = searchParams.get(orderByParamName) || columns[0].id;
  const tags = searchParams.get(tagParamName);
  const router = useRouter();
  const [rowsData, setRowsData] = useState<any>([]);
  const [fakeLoading, setFakeLoading] = useState<boolean>(false);

  const getItemsForPage = useCallback(
    (
      items: any[],
      pageNumber: number,
      itemsPerPage: number,
      delay: number = fakePaginationDelay, // atraso padrão de 1000 milissegundos ou 1 segundo
    ) => {
      return new Promise<any[]>(resolve => {
        const startIndex = pageNumber * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const newData = items.slice(startIndex, endIndex);

        // Atrasa a resolução da promessa pelo tempo especificado em 'delay'
        setTimeout(() => {
          resolve(newData);
        }, delay);
      });
    },
    [fakePaginationDelay],
  );

  useEffect(() => {
    if (fakePagination) {
      setFakeLoading(true);
      const items = getItemsForPage(rows, page, initialRowsPerPage).then(
        response => {
          setRowsData(response as any);
          setFakeLoading(false);
        },
      );
    } else {
      setRowsData(rows);
    }
  }, [page, fakePagination, initialRowsPerPage, rows, getItemsForPage]);

  const updateUrl = (updatedPage: string, paramName: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(paramName, updatedPage);
    router.push(pathname + "?" + newSearchParams.toString());
  };

  const handlePageChange = async (newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
    updateUrl(newPage.toString(), pageParamName);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string,
  ) => {
    // Encontre a coluna correspondente
    const column = columns.find(c => c.id === property);

    // Prossiga somente se a coluna pode ser ordenada
    if (column?.canBeOrdered !== false) {
      const isAsc = orderBy === property && order === "asc";
      console.log(order);
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(orderParamName, isAsc ? "desc" : "asc");
      newSearchParams.set(orderByParamName, property);
      router.push(pathname + "?" + newSearchParams.toString());
    }
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map(n => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    handlePageChange(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    // setRowsPerPage(parseInt(event.target.value, 10));
    // handlePageChange(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, initialRowsPerPage - rowsData?.length) : 0;

  return (
    <Box sx={{ height: "auto" }}>
      {showSearch && (
        <SearchFilter properties={columns} paramName={tagParamName} />
      )}
      <Paper sx={{ width: "100%", mb: 1 }}>
        <TableContainer style={{ maxHeight: "60vh" }}>
          <Table
            stickyHeader
            sx={{ minWidth: 50 }}
            className="min-w-[650px]"
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <TableHead
              headCells={columns}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rowsData?.length}
            />
            <TableBody sx={{ overflowX: "scroll", maxHeight: 100 }}>
              {loading || fakeLoading ? (
                <TableRowsLoader
                  rowsNum={initialRowsPerPage}
                  columns={columns}
                />
              ) : (
                rowsData?.map((row: any, index: number) => {
                  return (
                    <TableRow key={row.id} className="hover:bg-gray-300">
                      {columns.map((column, index) => {
                        return (
                          <TableCell
                            className={
                              column.id == "actions"
                                ? `sticky right-0  bg-white border-r-[2px_solid_black]`
                                : ""
                            }
                            key={`${row.id}-${column.id}`}
                            title={row[column.id]}
                            sx={{
                              alignItems: "center",
                              justifyContent: "center",
                              overflow: "hidden", // Adiciona overflow escondido
                              textOverflow: "ellipsis", // Adiciona elipsis ao texto que ultrapassa o overflow
                              whiteSpace: "nowrap", // Evita que o texto quebre em linhas
                              maxWidth: 200, // Define uma largura máxima para a célula
                              ...column.sx,
                              paddingX: "1vw",
                              paddingY: "0.05vw",
                            }}
                            align={
                              row[column.id] === true ||
                              row[column.id] === false
                                ? "center"
                                : column.numeric
                                  ? "right"
                                  : "left"
                            }
                          >
                            {column.childrens ? (
                              <div className="flex gap-2">
                                {column.childrens.map((child, childIndex) => {
                                  return (
                                    <div
                                      className={`flex items-center `}
                                      key={childIndex}
                                    >
                                      <div className={column.className}>
                                        {column.formatInput
                                          ? column.formatInput(row[column.id])
                                          : row[column.id]}
                                      </div>
                                      {child.instance(row, column)}
                                    </div>
                                  );
                                })}
                              </div>
                            ) : row[column.id] === true ||
                              row[column.id] === false ? (
                              <div className="flex items-center justify-center w-14">
                                <CheckboxInput
                                  disabled={true}
                                  checked={row[column.id] === true}
                                />
                              </div>
                            ) : (
                              row[column.id]
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              )}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[initialRowsPerPage]}
          component="div"
          count={count}
          rowsPerPage={initialRowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
          labelDisplayedRows={({ from, to, count }) => {
            return "" + from + "-" + to + " de " + count;
          }}
        />
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Visualização densa"
      /> */}
    </Box>
  );
}
