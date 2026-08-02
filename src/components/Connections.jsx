import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";


const Connections = () => {
    const dispatch = useDispatch()
    const connections = useSelector((store)=> store.connections)
    const fetchConnections = async ()=>{
      try{  
      const res = await axios.get(BASE_URL + "/user/connections",{withCredentials : true})
      dispatch(addConnections(res?.data?.data))
      }
      catch(err){
        console.log(err)
      }
    }
    
    useEffect(()=>{
        fetchConnections()
    },[])

    if(!connections) return;

    if(connections.length === 0) return <h1 className='flex justify-center my-10'> No connections found </h1>

return (
  <div className="min-h-[calc(100vh-80px)] bg-base-200 px-4 py-10">
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-10 text-center text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Your Connections 🤝
      </h1>

      <div className="space-y-6">
        {connections.map((connection) => {
          const { _id, firstname, lastname, photourl, age, gender, about } =
            connection;
            console.log(photourl)

          return (
            <div
              key={_id}
              className="card bg-base-100 border border-base-300 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="card-body">
                <div className="flex flex-col items-center gap-6 sm:flex-row">
                  <div className="avatar">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        alt="photo"
                        className="object-cover"
                        src={photourl}
                      />
                    </div>
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-2xl font-bold">
                      {firstname + " " + lastname}
                    </h2>

                    {age && gender && (
                      <div className="badge badge-primary badge-outline mt-2">
                        {age + ", " + gender}
                      </div>
                    )}

                    <p className="mt-3 text-base-content/70 leading-relaxed">
                      {about}
                    </p>
                  </div>

                  
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);
};
export default Connections;