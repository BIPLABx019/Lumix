import { Outlet } from "react-router"

const AppLayout = () => {
  return (
    <div className="p-32"><Outlet/></div>
  )
}

export default AppLayout