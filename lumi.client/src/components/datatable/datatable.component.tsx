import { DataTableProps } from '@/types/components';
import { Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { useEffect, useState } from 'react';
import { Icons } from '../icons/icons.component';
import { EIcons } from '../icons/icons.enum';
import { MobileCardDataTable } from './mobile.datatable.subcomponent';

export default function DataTable<T extends { id: number }>({
  columns,
  size = 10,
  total = 0,
  data = [],
  page,
  handleChangePage,
  handleChangeOrder,
  loading = false
}: DataTableProps<T>) {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof T>(columns?.[0]?.key);
  const [tableData, setTableData] = useState<T[]>(data || []);
  const [currentPage, setCurrentPage] = useState(page || 1);

  useEffect(() => {
    setTableData(data || []);
  }, [data]);

  const handleRequestSort = (property: keyof T) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);

    handleChangeOrder?.(isAsc ? 'desc' : 'asc', property);
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span>Carregando...</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <Paper
          sx={{
            width: '100%',
            mb: 2,
            borderRadius: '12px',
            boxShadow: 'none'
          }}
        >
          <TableContainer sx={{ borderRadius: '1rem', border: 0 }}>
            <Table size="small" sx={{ minWidth: 650, border: 0 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#004d40' }}>
                  {columns.map(({ key, label, sortable }) => (
                    <TableCell key={String(key)} sx={{ color: 'white', fontWeight: 600, py: 2, border: 0 }} align="left">
                      {sortable ? (
                        <TableSortLabel
                          active={orderBy === key}
                          direction={order}
                          IconComponent={() => <Icons icon={EIcons.ORDER} color="white" />}
                          onClick={() => handleRequestSort(key)}
                          sx={{ color: 'white', '&.Mui-active': { color: 'white' } }}
                        >
                          {label}
                        </TableSortLabel>
                      ) : (
                        label
                      )}
                    </TableCell>
                  ))}
                  {/* <TableCell sx={{ color: 'white', fontWeight: 600 }} align="center">
            Ações
          </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff',
                      '&:last-child td, &:last-child th': { border: 0 }
                    }}
                  >
                    {columns.map(({ key, customRender }) => (
                      <TableCell key={String(key)}>{customRender ? customRender(row) : (row[key] as any)}</TableCell>
                    ))}
                    {/* <TableCell align="center">
              <IconButton>
                <EditIcon fontSize="small" />
              </IconButton>
            </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div className="flex md:justify-between flex-col md:flex-row gap-4 items-center p-2 md:p-2">
            <p className="text-sm">
              Mostrando {data?.length} de {total} items
            </p>
            <Pagination
              count={Math.ceil(total / size)}
              page={currentPage}
              onChange={(_event, newPage) => {
                handleChangePage?.((newPage || 1) - 1);
                setCurrentPage(newPage);
              }}
              showFirstButton
              color="standard"
              showLastButton
              sx={{ display: 'flex', justifyContent: 'right', mt: 2 }}
            />
          </div>
        </Paper>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden">
        <MobileCardDataTable<T> tableData={tableData} columns={columns} />
        <Pagination
          count={Math.ceil(total / size)}
          page={currentPage}
          onChange={(_event, newPage) => {
            handleChangePage?.((newPage || 1) - 1);
            setCurrentPage(newPage);
          }}
          showFirstButton
          color="standard"
          showLastButton
          sx={{ display: 'flex', justifyContent: 'right', mt: 2 }}
        />
      </div>
    </div>
  );
}
