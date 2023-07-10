import { useEffect, useState } from 'react'
import TableMui from './components/UI/table/TableMui'
// import { TableUi } from './components/UI/table/TableUi'

function App() {
   const [table, setTable] = useState([])

   useEffect(()=>{
      axios('https://jsonplaceholder.typicode.com/users')
   })

   const column = [
      { field: 'id', header: '#' },
      { field: 'name', header: 'Name' },
      { field: 'address', header: 'address' },
   ]

   return (
      <div>
         {/* <TableUi columns={columns} />
         <TableUi columns={rows} /> */}
         <TableMui rows={rows} column={column} />
         Task Tracker js-9
      </div>
   )
}

export default App
