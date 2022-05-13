import { useState } from "react"
import axios from "axios"

export default function ProTest (){
    const [name,setName] = useState("")
    const [file,setFile] = useState([])
    console.log(name)
    

    function onFileChange(e){
        console.log(e)
        setFile(e)
    }

    function upload (event){
      event.preventDefault()
        const data = new FormData();
      data.append("name",name)
      for (let index = 0; index < file.length; index++) {
          data.append("file", file[index]);
        setName("")
        setFile([])
      }

      axios.post(/* "https://httpbin.org/anything" */"http://localhost:3001/test",data)
      .then(res=>console.log(res))
      .catch(err =>console.log(err))
  }

    return(
        <>
        <form action="#">
            <span>Name</span>
            <input type="text" name="name" onChange={event =>{const{value}=event.target; setName(value)}}/>
        <input className="inputs" accept="image/png,image/jpg,image/jpeg" multiple={true} type='file' name="file"
        onChange={(e)=>onFileChange(e.target.files)}/>
        <button onClick={upload}>
            Upload
        </button>
        </form>
        </>
    )
}