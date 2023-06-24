import { useState } from "react"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Login(){

    const [show,setShow]=useState(false)

    return(
        <div className="login-container">
            <div className="contenedor">
                <form>
                    <input type="text" placeholder="Usuario"/>
                    <div>
                        <input type={show?"text":"password"} placeholder="Contraseña">
                        </input>
                        {show ?
                            <VisibilityOffIcon onClick={()=>setShow(!show)}/>
                            :
                            <VisibilityIcon onClick={()=>setShow(!show)}/>
                        }
                    </div>

                    <button>INICIAR SESION</button>
                </form>
            </div>
        </div>
    )
}