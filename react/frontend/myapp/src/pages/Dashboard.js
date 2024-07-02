import { useEffect, useState } from "react"
import { UserDetailsApi } from "../services/Api"
import NavBar from "../components/NavBar";
import { isAuthenticated, logout } from "../services/Auth";
import { useNavigate,Navigate } from "react-router-dom";
export default function DashboardPage() {
    const navigate= useNavigate();

    const [user,setUser] = useState({name:"",email:"",localId:""})

    useEffect(()=>{
        if(isAuthenticated()){
            UserDetailsApi().then((response)=>{
               
                setUser({
                    name:response.data.users[0].displayName,
                    email:response.data.users[0].email,
                    localId:response.data.users[0].localId,
                })
            })
        }
    },[])














    const logoutUser=()=>{
        logout();
        navigate('/login')
    }
 if(!isAuthenticated()) {
  return <Navigate to="/login"/>
 }
        





    return(
        <div>
        <NavBar logoutUser={logoutUser}/>
        <main role="main" className="container mt-5">
            <div className="container">
              <div className="text-center mt-5">
                <h3>Dashboard page</h3>
                <p className="text-bold " >Hi Unnamed user, your Firebase ID is %localID%</p>
              </div>
            </div>
        </main>
        </div>
        )
}