import { useContext, useEffect, useState } from "react"
import { UseAppContext } from "../context/Context"
import loader from "../assets/200w.gif"

export default function AgregarProducto({empresa,dataEdit,popUpKey,setPopUpKey,popUpKeyProd2,setPopUpKeyProd2}){

    const {addObj,userLogin}=useContext(UseAppContext)

    const [dataProd,setDataProd]=useState({
        nombre:"",
        cantidad:"",
        precio:"",
        descripcion:"",
        img:"",
        id:""
    })
    const [sendForm,setSendForm]=useState(false)

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
        setSendForm(true)

        if(dataProd.nombre==="" || dataProd.cantidad==="" || dataProd.precio==="" || dataProd.descripcion==="" || dataProd.img===""){
            alert("COMPLETE LOS CAMPOS")
            setSendForm(false)
            return
        }
        
        if(dataEdit===undefined){
            await addObj(dataProd,true,empresa,popUpKey)

            alert("Producto creado")
        }else{
            let newArray = empresa.productos
            let newArray2 = userLogin.empresas

            newArray[popUpKeyProd2]=dataProd
            newArray2[popUpKey].productos=newArray

            await addObj(newArray2,false,empresa)

            alert("Producto editado")
        }

        document.getElementById("nombre").value=""
        document.getElementById("cantidad").value=""
        document.getElementById("precio").value=""
        document.getElementById("descripcion").value=""

        setSendForm(false)
        setPopUpKey("")
        setPopUpKeyProd2("")
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
                defaultValue={dataEdit!==undefined ? dataEdit.cantidad : ""}
                placeholder="Cantidad"
                id={"cantidad"}
                onChange={(e)=>updateData(e.target.id,e.target.value)}
            />
            <input 
                type="number" 
                defaultValue={dataEdit!==undefined ? dataEdit.precio : ""}
                placeholder="Precio"
                id={"precio"}
                onChange={(e)=>updateData(e.target.id,e.target.value)}
            />
            <input 
                type="text" 
                defaultValue={dataEdit!==undefined ? dataEdit.descripcion : ""}
                placeholder="Descripcion"
                id={"descripcion"}
                onChange={(e)=>updateData(e.target.id,e.target.value)}
            />
            {dataEdit!==undefined ? <img style={{width:"50px"}} src={dataEdit.img} alt="IMG" /> : 
                <input 
                    type="file" 
                    placeholder="IMAGEN"
                    id={"img"}
                    onChangeCapture={(e)=>updateData(e.target.id,e.target.files[0])}
                />
            }
            {sendForm ? 
                <img src={loader} alt="LOAD" />
                :
                <button>{dataEdit===undefined?"Crear Producto":"Editar Producto"}</button>
            }
        </form>
    )
}