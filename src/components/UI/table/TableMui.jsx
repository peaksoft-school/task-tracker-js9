import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

export default function TableMui({ column, rows }) {
   return (
      <TableContainer
         style={{ width: '100%', padding: '1rem 2rem 0rem 2rem' }}
         component={Paper}
      >
         <Table aria-label="customized table">
            <TableHead
               style={{
                  borderBottom: '2px solid #D7D7D7',
               }}
            >
               <TableRow>
                  {column.map((column) => (
                     <StyledTableCell
                        key={`header-${column.key}`}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                     >
                        <TableHeaderStyled>{column.heading}</TableHeaderStyled>
                     </StyledTableCell>
                  ))}
               </TableRow>
            </TableHead>

            <TableBody>
               {rows.map((row, rowIndex) => (
                  <StyledTableRow key={row.id}>
                     {column.map((column) => {
                        if (column.render) {
                           return (
                              <StyledTableCell key={column.key}>
                                 {column.render(row)}
                              </StyledTableCell>
                           )
                        }
                        const value = column.index
                           ? rowIndex + 1
                           : row[column.key]
                        if (column.key === 'name') {
                           return (
                              <StyledTableCell
                                 key={`row-${column.key}`}
                                 align={column.align}
                              >
                                 <TableBodyTitleStyled>
                                    {value}
                                 </TableBodyTitleStyled>
                              </StyledTableCell>
                           )
                        }
                        return (
                           <StyledTableCell
                              key={`row-${column.key}`}
                              align={column.align}
                           >
                              {value}
                           </StyledTableCell>
                        )
                     })}
                  </StyledTableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   )
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
   [`&.${TableHead}`]: {
      color: theme.palette.common.white,
   },
   [`&.${TableBody}`]: {
      fontSize: 14,
   },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
   '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
   },
}))

const TableHeaderStyled = styled('h3')`
   color: #000;
   font-family: CarePro;
   font-size: 0.9rem;
   font-style: normal;
   font-weight: bold;
   line-height: normal;
   height: 2rem;
   display: flex;
   align-items: flex-end;
`

const TableBodyTitleStyled = styled('span')`
   color: #000;
   font-family: CarePro;
   font-size: 1rem;
   font-style: normal;
   font-weight: bold;
   line-height: normal;
   height: 3.4rem;
   display: flex;
   align-items: center;
   text-decoration: underline;
   cursor: pointer;
   color: #0073de;
`
