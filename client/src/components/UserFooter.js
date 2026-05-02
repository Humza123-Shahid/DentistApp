import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
import imgimage_1 from '../images/image_1.jpg';
const UserFooter = () => {
    const [settings,setSettings]=useState([]);
    const [socials,setSocials]=useState([]);
     const [serviceDuration,setServiceDuration]=useState("24/6");
     const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
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
                 const response2=await fetch("http://localhost:5000/api/social/fetchallsocials",{
                        method:'GET',
                        headers:{
                            'Content-Type':'application/json' ,
            'auth-token':localStorage.getItem('token')
                        },
                      });
                      const json2=await response2.json()
                      console.log(json2.data);
                      setSocials(json2.data)
                      
              };
              fetchData();
    }, []);
    useEffect(() => {
        settings.forEach((setting, index) => {
    
             if(setting.key=='office_hours'){
                console.log("hereintime");
                const words = setting.value.split(" ");
               
                
                if(words[0]+words[1]+words[2]=="Mon-Fri:"){
                    setServiceDuration("24/5")
                }
            }
    });
    }, [settings]);
    useEffect(() => {
    const facebook = socials.find((d) => d.platformName == "Facebook");
    const instagram = socials.find((d) => d.platformName == "Instagram");
    const twitter = socials.find((d) => d.platformName == "Twitter");
    
    setFacebookLink(facebook?.url);
    setInstagramLink(instagram?.url);
    setTwitterLink(twitter?.url);
    
  }, [socials]);
  return (
    
      <footer className="ftco-footer ftco-bg-dark ftco-section" style={{padding:'6em 0 0 0'}}>
                      <div className="container">
                          <div className="row mb-5 text-center">
                              <div className="col-md" style={{textAlign:'start'}}>
                                  <div className="ftco-footer-widget mb-5">
                                      <h2 className="ftco-heading-2 logo">Dentista</h2>
                                      <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                  </div>
                                  <div className="ftco-footer-widget mb-5">
                                      {/* <h2 className="ftco-heading-2">Have a Questions?</h2>
                                      <div className="block-23 mb-3">
                                          <ul>
                                              <li><span className="icon icon-map-marker"></span><span className="text">203 Fake St. Mountain View, San Francisco, California, USA</span></li>
                                              <li><a href="#"><span className="icon icon-phone"></span><span className="text">+2 392 3929 210</span></a></li>
                                              <li><a href="#"><span className="icon icon-envelope"></span><span className="text">info@yourdomain.com</span></a></li>
                                          </ul>
                                      </div> */}
      
                                      <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-3">
                                          <li className="ftco-animate"><a target="_blank" href={twitterLink}><span className="icon-twitter"></span></a></li>
                                          <li className="ftco-animate"><a target="_blank" href={facebookLink}><span className="icon-facebook"></span></a></li>
                                          <li className="ftco-animate"><a target="_blank" href={instagramLink}><span className="icon-instagram"></span></a></li>
                                      </ul>
                                  </div>
                              </div>
                              <div className="col-md " style={{textAlign:'center'}}>
                                  <div className="ftco-footer-widget mb-5 ml-md-4">
                                      <h2 className="ftco-heading-2">Links</h2>
                                      <ul className="list-unstyled">
                                          <li><Link to="/" onClick={() => window.scrollTo(0, 0)}><span className="ion-ios-arrow-round-forward mr-2"></span>Home</Link></li>
                                          <li style={{marginLeft:'3px'}}><Link to="/doctor" onClick={() => window.scrollTo(0, 0)}><span className="ion-ios-arrow-round-forward mr-2"></span>Doctor</Link></li>
                                          <li style={{marginLeft:'9px'}}><Link to="/services" onClick={() => window.scrollTo(0, 0)}><span className="ion-ios-arrow-round-forward mr-2"></span>Services</Link></li>
                                          <li  style={{display:"none"}}><a href="#"><span className="ion-ios-arrow-round-forward mr-2"></span>Deparments</a></li>
                                          <li  style={{display:"none"}}><a href="#"><span className="ion-ios-arrow-round-forward mr-2"></span>Contact</a></li>
                                      </ul>
                                  </div>
                                  <div className="ftco-footer-widget mb-5 ml-md-4" style={{display:"none"}}>
                                      <h2 className="ftco-heading-2">Services</h2>
                                      <ul className="list-unstyled">
                                          <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2"></span>Neurolgy</a></li>
                                          <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2"></span>Dentist</a></li>
                                          <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2"></span>Ophthalmology</a></li>
                                          <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2"></span>Cardiology</a></li>
                                          <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2"></span>Surgery</a></li>
                                      </ul>
                                  </div>
                              </div>
                              
                              <div className="col-md " style={{textAlign:'end'}}>
                                  <div className="ftco-footer-widget mb-5">
                                      <h2 className="ftco-heading-2">Opening Hours</h2>
                                      <h3 className="open-hours pl-4"><span className="ion-ios-time mr-3"></span>We are open {serviceDuration}</h3>
                                  </div>
                                  <div className="ftco-footer-widget mb-5" style={{display:"none"}}>
                                      <h2 className="ftco-heading-2">Subscribe Us!</h2>
                                      <form action="#" className="subscribe-form">
                                          <div className="form-group">
                                              <input type="text" className="form-control mb-2 text-center" placeholder="Enter email address"/>
                                                  <input type="submit" value="Subscribe" className="form-control submit px-3"/>
                                                  </div>
                                              </form>
                                          </div>
                                  </div>
                              </div>
                              <div className="row">
                                  <div className="col-md-12 text-center">
      
                                      <p>
                                          Copyright &copy;{new Date().getFullYear()} All rights reserved
                                          </p>
                                  </div>
                              </div>
                          </div>
                  </footer>
  )
}

export default UserFooter
