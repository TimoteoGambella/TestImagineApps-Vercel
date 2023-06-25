import { createContext, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore, getDocs, query, collection, where, addDoc, doc, setDoc } from 'firebase/firestore';
import emailjs from '@emailjs/browser';

export const UseAppContext = createContext();

const firebaseConfig = {
    apiKey:process.env.FirebaseKey,
    authDomain: "test-imagineapps.firebaseapp.com",
    projectId: "test-imagineapps",
    storageBucket: "test-imagineapps.appspot.com",
    messagingSenderId: "127613956726",
    appId: "1:127613956726:web:5bb14cec2b433ace186557"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app)

export default function AppContext({children}){

    const [userLogin,setUserLogin]=useState("")
    const [allProds,setAllProds]=useState([])

    useEffect(() => {
        getAllProds()
    }, [])

    const getAllProds=async()=>{
        const collectionsData = await getDocs(query(collection(db, "users")));
        let array = []
        for (const key in collectionsData.docs) {
            for (const key2 in collectionsData.docs[key].data().empresas) {
                for (const key3 in collectionsData.docs[key].data().empresas[key2].productos) {
                    array.push(collectionsData.docs[key].data().empresas[key2].productos[key3])
                }
            }
        }
        setAllProds(array)
    }

    const checkUser=async(data)=>{
        const collectionsData = await getDocs(query(collection(db, "users"), where("email","==",data.email)));
        if(collectionsData.docs.length===0){
            const user= {
                ...data,
                empresas:[],
                admin:false
            }
            const newUser = await addDoc(collection(db, "users"), user);
            if(newUser.id){
                alert("USUARIO CREADO")
                setUserLogin({...user,id:newUser.id})
                return({status:"success", message:"newUser",data:{id:newUser.id,data:user}})
            }
        }else{
            setUserLogin({...collectionsData.docs[0].data(),id:collectionsData.docs[0].id})
            return {status:"success", message:"login", id: collectionsData.docs[0].id, data:collectionsData.docs[0].data()}
        }
    }

    const addObj=async(data,foto,empresa,empresaId)=>{
        const user =  doc(db, 'users', userLogin.id);
        if(foto){
            let urlFoto = await addFoto(data)
            if(empresa.productos.length===0){
                data.id=0
            }else{
                data.id=empresa.productos[empresa.productos.length-1].id+1
            }
            data.img=urlFoto

            let newProds=empresa.productos.concat(data)
            let newEmpresa={...empresa,productos:newProds}

            let newArrayEmpresas=userLogin.empresas
            newArrayEmpresas[empresaId]=newEmpresa

            setUserLogin({...userLogin, empresas:newArrayEmpresas})

            await setDoc(user, { empresas: newArrayEmpresas }, { merge: true })

            getAllProds()
            return {status:"success", message:"add"}
        }else{
    
            await setDoc(user, { empresas: data }, { merge: true })
            setUserLogin({...userLogin, empresas:data})
            
            getAllProds()
            return {status:"success", message:"add"}
        }
    }

    const deleteObj=async(data)=>{
        const user =  doc(db, 'users', userLogin.id);

        setUserLogin({...userLogin, empresas:data})

        await setDoc(user, { empresas: data }, { merge: true })

        getAllProds()
        return {status:"success", message:"delete"}
    }

    const addFoto = async(data)=>{console.log(data)
        
        const fotosProds = ref(storage, `${data.nombre}${data.id}`);
        await uploadBytes(fotosProds,data.img);
        getAllProds()
        return await getDownloadURL(ref(storage,`${data.nombre}${data.id}`))
    }

    const sendMail=()=>{
        emailjs.send('service_xd5z5ch', "template_4x0n3pa", {
            pdf:"ACA IRIA EL PDF",
            toMail:userLogin.email
        },'EtNdfQu1yjfSB4fDT')
        .then(function(response) {
            alert("MAIL ENVIADO")
            return(true)
            }, function(error) {
            alert("OCURRIO UN ERROR")
            return(false)
            }
        )
    }
    return(
        <UseAppContext.Provider value={{ checkUser, addObj, deleteObj, sendMail, userLogin, allProds }}>
            {children}
        </UseAppContext.Provider>
    )
}