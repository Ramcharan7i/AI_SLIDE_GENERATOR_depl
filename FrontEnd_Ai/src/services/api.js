
import axios from "axios"

export const generateSlides = async(topic,slides,token)=>{

  const res = await axios.post(
      `http://localhost:8000/generate?topic=${topic}&slides=${slides}`,
      {},
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
  )

  return res.data
}
