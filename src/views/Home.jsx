import { useContext, useState } from "react"
import { UseAppContext } from "../context/Context"
import { useEffect } from "react"
import CrearEmpresas from "../components/CrearEmpresas"
import AgregarProducto from "../components/AgregarProducto"
import Swal from "sweetalert2"

export default function Home(){
    const {userLogin,deleteObj,sendMail,allProds}=useContext(UseAppContext)

    const [popUpKey,setPopUpKey]=useState("")
    const [popUpKey2,setPopUpKey2]=useState("")

    const [popUpKeyProd2,setPopUpKeyProd2]=useState("")

    useEffect(() => {
        if(userLogin===""){
            window.location.replace("/")
        }
    }, [userLogin])

    const handleDelete=async(empresa,prod)=>{
        await Swal.fire({
            title: '¿Eliminar empresa/producto?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'YES',
            denyButtonText: `NO`,
          }).then(async(result) => {
            if (result.isDenied || result.isDismissed) {
              return
            }else{
                let newArray= []
                let newProds=[]
        
                let newArray2=userLogin
                if(prod!==undefined){
                    newArray=userLogin.empresas[empresa]
                    for (const key in userLogin.empresas[empresa].productos) {
                        if (Number(key)!==prod) {
                            newProds.push(userLogin.empresas[empresa].productos[key])
                        }
                    }
                    newArray.productos=newProds
                    newArray2.empresas[empresa]=newArray
                    await deleteObj(newArray2.empresas)
                }else{
                    for (const key in userLogin.empresas) {
                        if (Number(key)!==empresa) {
                            newArray.push(userLogin.empresas[key])
                        }
                    }
                    await deleteObj(newArray)
                }
                alert(prod!==undefined?"PRODUCTO ELIMINADO":"EMPRESA ELIMINADA")
            }
          })

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
                    {userLogin.admin && userLogin.empresas.length!==0 && <p style={{fontSize:"35px"}}>Tus empresas</p>}
                    {userLogin.admin && userLogin.empresas.length===0 ? <p>NO TIENES EMPRESAS</p> :
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
                                        <div className="listaProductos">
                                            {obj.productos.map((obj,ii)=>{
                                                return(
                                                    <div key={ii} style={{display:"flex",justifyContent:"space-between"}}>
                                                        {obj.nombre}
                                                        <img src={obj.img} alt="IMG" />
                                                        <p onClick={()=>handleDelete(i,ii)}>ELIMINAR</p>
                                                        <p onClick={()=>{setPopUpKey2(i);setPopUpKeyProd2(ii)}}>EDITAR</p>
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
                    <p style={{fontSize:"35px",marginTop:"60px"}}>TODOS los productos</p>
                    <div className="listaProductos">
                        {allProds.map((obj,i)=>{
                            return(
                                <div key={i}>
                                    <p>{obj.nombre}</p>
                                    <p>${obj.precio}</p>
                                    <p>Cantidad: {obj.cantidad}</p>
                                    <p>Descripcion: {obj.descripcion}</p>
                                    
                                    <img src={obj.img} alt="IMG" />
                                </div>
                            )
                        })}
                    </div>
                </div>
            }
            {popUpKey!=="" &&
                <div className="popUp">
                    <div className="edit">
                        <CrearEmpresas setPopUpKey={setPopUpKey} dataEdit={userLogin.empresas[popUpKey]} popUpKey={popUpKey}/>
                    </div>
                    <div className="fondo" onClick={()=>setPopUpKey("")}></div>
                </div>
            }
            {popUpKey2!=="" &&
                <div className="popUp">
                    <div className="edit">
                        <AgregarProducto setPopUpKey={setPopUpKey2} setPopUpKeyProd2={setPopUpKeyProd2} popUpKeyProd2={popUpKeyProd2} dataEdit={userLogin.empresas[popUpKey2].productos[popUpKeyProd2]} empresa={userLogin.empresas[popUpKey2]} popUpKey={popUpKey2}/>
                    </div>
                    <div className="fondo" onClick={()=>{
                        setPopUpKey2("")
                        setPopUpKeyProd2("")
                        document.getElementById("nombre").value=""
                        document.getElementById("cantidad").value=""
                        document.getElementById("precio").value=""
                        document.getElementById("descripcion").value=""
                    }}></div>
                </div>
            }
        </>
    )
}