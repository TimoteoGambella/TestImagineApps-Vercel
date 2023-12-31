import { useContext, useEffect, useState } from "react"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { UseAppContext } from "../context/Context";
import { useNavigate } from "react-router-dom";
import loader from "../assets/200w.gif"

export default function Login(){
    const navigate=useNavigate()

    const {checkUser}=useContext(UseAppContext)

    const [show,setShow]=useState(false)
    const [sendForm,setSendForm]=useState(false)

    const [login,setLogin]=useState({
        email:"",
        password:""
    })

    const handleSubmit = async(e)=>{
        e.preventDefault()
        
        if(login.email==="" || login.password===""){
            alert("COMPLETE LOS CAMPOS")
            return
        }
        setSendForm(true)
        
        checkUser(login).then((res)=>{
            if(res.status==="success"){
                navigate("/home")
            }else{
                setSendForm(false)
            }
        })
    }

    return(
        <div className="login-container">
            <div className="aclaraciones">
                <h1>Aclaraciones</h1>
                <p>1- Si el usuario NO existe, se crea automaticamente y te loguea. Se loguea con modalidad "Externo".</p>
                <p>2- Usuario administrador: timi.gambella@hotmail.com - timoG</p>
                <p>3- Debido al tiempo tiempo disponible, No esta aprovechado al 100% los componentes y el CSS.</p>
                <p>4- Ya existen productos y empresas cargadas de "prueba"</p>
            </div>
            <div className="contenedor">
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <input type="email" placeholder="Email" onChangeCapture={(e)=>{
                        setLogin({...login,email:e.target.value})
                    }}/>
                    <div>
                        <input type={show?"text":"password"} placeholder="Contraseña" onChangeCapture={(e)=>{
                        setLogin({...login,password:e.target.value})
                    }}>
                        </input>
                        {show ?
                            <VisibilityOffIcon onClick={()=>setShow(!show)}/>
                            :
                            <VisibilityIcon onClick={()=>setShow(!show)}/>
                        }
                    </div>
                    
                    {!sendForm ?
                        <button>INICIAR SESION</button>
                        :
                        <img src={loader} alt="LOAD" />
                    }
                </form>
            </div>
        </div>
    )
}