import TableMui from './components/UI/table/TableMui'

function App() {
   const data = [
      {
         id: 1,
         name: 'Leanne Graham',
         username: 'Bret',
         email: 'Sincere@april.biz',
         icon: <Star />,
         address: {
            street: 'Kulas Light',
            suite: 'Apt. 556',
            city: 'Gwenborough',
         },
      },
   ]

   const column = [
      { heading: 'Name', key: 'name' },
      { heading: 'Email', key: 'email' },
      { heading: 'City', key: 'username' },
   ]
   return (
      <div>
         <TableMui column={column} rows={data} />
         Task Trecker js-9
      </div>
   )
}
export default App
