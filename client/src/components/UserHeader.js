import React,{useEffect,useState} from 'react'

const UserHeader = () => {
    const [settings,setSettings]=useState([]);
    const [address,setAddress]=useState("");
    const [phoneNumber,setPhoneNumber]=useState("");
    const [days,setDays]=useState("");
    const [time,setTime]=useState("");
    const [dayClosed,setDayClosed]=useState("");
    useEffect(() => {
    const fetchData = async () => {
            const response=await fetch("http://localhost:5000/api/setting/fetchallsettings",{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json' ,
            'auth-token':localStorage.getItem('token')
                    },
                  });
                  const json=await response.json()
                  console.log(json.data);
                  setSettings(json.data)
                  
          };
          fetchData();
}, []);
useEffect(() => {
    settings.forEach((setting, index) => {

        if(setting.key=='address')
        {
            setAddress(setting.value)
        }
        else if(setting.key=='phone_number')
        {
            setPhoneNumber(setting.value)
        }
        else if(setting.key=='office_hours'){
            console.log("hereintime");
            const words = setting.value.split(" ");
            console.log(words);
            setDays(words[0]+' '+words[1]+' '+words[2])
            setTime(words[3]+' '+words[4]+' '+words[5])
            setDayClosed(words[6]+' '+words[7])
        }
});
}, [settings]);

  return (
       <div className="py-md-5 py-4 border-bottom">
                <div className="container">
                    <div className="row no-gutters d-flex align-items-start align-items-center px-3 px-md-0">
                        <div className="col-md-4 order-md-2 mb-2 mb-md-0 align-items-center text-center">
                            <a className="navbar-brand" href="index.html">Dentista<span>Dental Clinic</span></a>
                        </div>
                        <div className="col-md-4 order-md-1 d-flex topper mb-md-0 mb-2 align-items-center text-md-right">
                            <div className="icon d-flex justify-content-center align-items-center order-md-last">
                                <span className="icon-map"></span>
                            </div>
                            <div className="pr-md-4 pl-md-0 pl-3 text">
                                <p className="con"><span>Free Call</span> <span>{phoneNumber}</span></p>
                                <p className="con">{address}</p>
                            </div>
                        </div>
                        <div className="col-md-4 order-md-3 d-flex topper mb-md-0 align-items-center">
                            <div className="icon d-flex justify-content-center align-items-center"><span className="icon-paper-plane"></span></div>
                            <div className="text pl-3 pl-md-3">
                                <p className="hr"><span>Open Hours</span></p>
                                <p className="time"><span>{days}</span> <span>{time}</span> {dayClosed}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  )
}

export default UserHeader
