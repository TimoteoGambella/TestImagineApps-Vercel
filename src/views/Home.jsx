import { useContext, useState } from "react"
import { UseAppContext } from "../context/Context"
import { useEffect } from "react"
import CrearEmpresas from "../components/CrearEmpresas"
import AgregarProducto from "../components/AgregarProducto"

export default function Home(){
    const {userLogin,deleteObj,sendMail}=useContext(UseAppContext)

    const [popUpKey,setPopUpKey]=useState("")
    const [popUpKey2,setPopUpKey2]=useState("")

    useEffect(() => {
        if(userLogin===""){
            window.location.replace("/")
        }
    }, [userLogin])

    const handleDelete=async(empresa)=>{
        let newArray= []
        for (const key in userLogin.empresas) {
            if (Number(key)!==empresa) {
                newArray.push(userLogin.empresas[key])
            }
        }
        await deleteObj(newArray)
        alert("EMPRESA ELIMINADA")
    }
    
    const handleDownload=()=>{
        window.open("https://drive.google.com/u/0/uc?id=1IL2RUB357RSjTjHXMf4th1x5qlKrJSkV&export=download")
    }

    return(
        <>
            {userLogin !=="" &&
                <div className="home-container">
                    <div className="crearEmpresa">
                        <p>{userLogin.admin?"USTED PUEDE CREAR EMPRESAS: ":"USTED NO PUEDE CREAR EMPRESAS"}</p>
                        {userLogin.admin &&
                            <CrearEmpresas/>
                        }
                    </div>
                    {userLogin.admin && userLogin.empresas.length!==0 && <p>Tus empresas</p>}
                    {userLogin.admin && userLogin.empresas.length===0 ? <p>NO TIENE EMPRESAS</p> :
                        <div className="editar">
                            {userLogin.empresas.map((obj,i)=>{
                                return(
                                    <div className="list" key={i}>
                                        <div className="empresa">
                                            <p>{obj.nombre} | NIT: {obj.nit}</p>
                                            <div>
                                                <p onClick={()=>handleDelete(i)}>ELIMINAR</p>
                                                <p onClick={()=>setPopUpKey(i)}>EDITAR</p>
                                                <p onClick={()=>setPopUpKey2(i)}>AGREGAR PRODUCTO</p>
                                            </div>
                                        </div>
                                        <div className="prods">
                                            {obj.productos.map((obj,i)=>{
                                                return(
                                                    <div key={i}>
                                                        {obj.nombre}
                                                        <img src={obj.img} alt="IMG" />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        {obj.productos.length!==0 &&
                                            <>
                                                <p className="inventario" onClick={()=>handleDownload()}>DESCARGAR INVENTARIO ({obj.nombre})</p>
                                                <p className="inventario" onClick={()=>sendMail()}>ENVIAR MAIL CON INVENTARIO ({obj.nombre})</p>
                                            </>
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
            }
            {popUpKey!=="" &&
                <div className="popUp">
                    <div className="edit">
                        <CrearEmpresas dataEdit={userLogin.empresas[popUpKey]} popUpKey={popUpKey}/>
                    </div>
                    <div className="fondo" onClick={()=>setPopUpKey("")}></div>
                </div>
            }
            {popUpKey2!=="" &&
                <div className="popUp">
                    <div className="edit">
                        <AgregarProducto empresa={userLogin.empresas[popUpKey2]} popUpKey={popUpKey2}/>
                    </div>
                    <div className="fondo" onClick={()=>setPopUpKey2("")}></div>
                </div>
            }
        </>
    )
}