import { Outlet } from "react-router-dom"
import { SideBar } from "../components/SideBar"

export const ProfileLayout = () => {
    return (
        <div className="row m-0">
            <div className="col-2 p-0">
                <SideBar />
            </div>
            <div className="col-10">
                <Outlet />
            </div>
        </div>
    )
}