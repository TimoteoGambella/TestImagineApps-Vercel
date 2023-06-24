import { useContext, useEffect, useState } from "react"
import { UseAppContext } from "../context/Context"

export default function AgregarProducto({empresa,dataEdit,popUpKey}){

    const {addObj,userLogin}=useContext(UseAppContext)

    const [dataProd,setDataProd]=useState({
        nombre:"",
        cantidad:"",
        precio:"",
        descripcion:"",
        img:"",
        id:""
    })

    useEffect(() => {
        if(dataEdit!==undefined){
            setDataProd(dataEdit)
        }
    }, [dataEdit])

    const updateData=(key,data)=>{
        setDataProd({...dataProd,[key]:data})
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()

        if(dataProd.nombre==="" || dataProd.cantidad==="" || dataProd.precio==="" || dataProd.descripcion==="" || dataProd.img===""){
            alert("COMPLETE LOS CAMPOS")
            return
        }
        
        if(dataEdit===undefined){
            await addObj(dataProd,true,empresa,popUpKey)

            alert("Producto creado")
        }else{
            // let newArray = empresa.productos
            // newArray[popUpKey]=dataProd
            // // await addObj(dataProd,false,empresa)
            // console.log(newArray)

            alert("Producto editado")
        }
    }

    return(
        <form className="formEmpresa" onSubmit={(e)=>handleSubmit(e)}>
            <h2>{empresa.nombre}</h2>
            <input 
                type="text" 
                defaultValue={dataEdit!==undefined ? dataEdit.nombre : ""}
                placeholder="Nombre producto"
                id={"nombre"}
                onChange={(e)=>updateData(e.target.id,e.target.value)}
            />
            <input 
                type="number" 
                defaultValue={dataEdit!==undefined ? dataEdit.direccion : ""}
                placeholder="Cantidad"
                id={"cantidad"}
                onChange={(e)=>updateData(e.target.id,e.target.value)}
            />
            <input 
                type="number" 
                defaultValue={dataEdit!==undefined ? dataEdit.nit : ""}
                placeholder="Precio"
                id={"precio"}
                onChange={(e)=>updateData(e.target.id,e.target.value)}
            />
            <input 
                type="text" 
                defaultValue={dataEdit!==undefined ? dataEdit.telefono : ""}
                placeholder="Descripcion"
                id={"descripcion"}
                onChange={(e)=>updateData(e.target.id,e.target.value)}
            />
            {dataEdit!==undefined ? <p>La foto no puede ser editada</p> : 
                <input 
                    type="file" 
                    placeholder="IMAGEN"
                    id={"img"}
                    onChangeCapture={(e)=>updateData(e.target.id,e.target.files[0])}
                />
            }
            
            <button>{dataEdit===undefined?"Crear Producto":"Editar Producto"}</button>
        </form>
    )
}