// import { RouterProvider } from 'react-router-dom'
// import { ToastContainer } from 'react-toastify'
// import { Provider } from 'react-redux'
// import { ThemeProvider } from '@mui/material'
// import { theme } from './assets/styles/theme'
// import { routes } from './routes/AppProvider'
// import { store } from './store'

import { AssigneeSection } from './components/UI/assignee/AssigneeSection'

function App() {
   return (
      // <Provider store={store}>
      //    <ToastContainer />
      //    <ThemeProvider theme={theme}>
      //       <RouterProvider router={routes} />
      //    </ThemeProvider>
      // </Provider>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
         <AssigneeSection />
      </div>
   )
}
export default App
