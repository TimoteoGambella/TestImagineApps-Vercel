import { useContext, useEffect, useState } from "react"
import validarNIT from 'validar-nit-gt'
import { UseAppContext } from "../context/Context"

export default function CrearEmpresas({dataEdit,popUpKey}){

    const {addObj,userLogin}=useContext(UseAppContext)

    const [dataEmpresa,setDataEmpresa]=useState({
        nombre:"",
        nit:"",
        direccion:"",
        telefono:"",
        productos:[]
    })

    useEffect(() => {
        if(dataEdit!==undefined){
            setDataEmpresa(dataEdit)
        }
    }, [dataEdit])


    const updateData=(key,data)=>{
        setDataEmpresa({...dataEmpresa,[key]:data})
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()

        if(dataEmpresa.nombre==="" || dataEmpresa.nit==="" || dataEmpresa.direccion==="" || dataEmpresa.telefono===""){
            alert("COMPLETE LOS CAMPOS")
            return
        }
        
        if(!validarNIT(dataEmpresa.nit) && !validarNIT(dataEmpresa.nit, {limpiar: true}).resultado){
            alert("FORMATO DE NIT INVALIDO")
            return
        }

        if(dataEdit===undefined){
            let newArray = userLogin.empresas.concat(dataEmpresa)
            await addObj(newArray)

            alert("Empresa creada")
        }else{
            let newArray = userLogin.empresas
            newArray[popUpKey]=dataEmpresa
            await addObj(newArray)

            alert("Empresa editada")
        }
    }

    return(
        <form className="formEmpresa" onSubmit={(e)=>handleSubmit(e)}>
            <input 
                type="text" 
                defaultValue={dataEdit!==undefined ? dataEdit.nombre : ""}
                placeholder="Nombre de la empresa"
                id={"nombre"}
                onChange={(e)=>updateData(e.target.id,e.target.value)}
            />
            <input 
                type="text" 
                defaultValue={dataEdit!==undefined ? dataEdit.direccion : ""}
                placeholder="Direccion"
                id={"direccion"}
                onChange={(e)=>updateData(e.target.id,e.target.value)}
            />
            <input 
                type="text" 
                defaultValue={dataEdit!==undefined ? dataEdit.nit : ""}
                placeholder="NIT"
                id={"nit"}
                onChange={(e)=>updateData(e.target.id,e.target.value)}
            />
            <input 
                type="number" 
                defaultValue={dataEdit!==undefined ? dataEdit.telefono : ""}
                placeholder="Telefono"
                id={"telefono"}
                onChange={(e)=>updateData(e.target.id,e.target.value)}
            />

            <button>{dataEdit===undefined?"Crear Empresa":"Editar Empresa"}</button>
        </form>
    )
}