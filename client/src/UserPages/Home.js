import React,{useEffect,useState} from 'react'
import imgimage_2 from '../images/image_2.jpg';
import imgimage_1 from '../images/image_1.jpg';
import imgimage_3 from '../images/image_3.jpg';
import imgbg_3 from '../images/bg_3.jpg';
import imgbg_2 from '../images/bg_2.jpg';
import imgbg_1 from '../images/bg_1.jpg';
import imgperson_1 from '../images/person_1.jpg';
import imgperson_4 from '../images/person_4.jpg';
import imgperson_3 from '../images/person_3.jpg';
import imgperson_2 from '../images/person_2.jpg';
import imgdoc_4 from '../images/doc-4.jpg';
import imgdoc_3 from '../images/doc-3.jpg';
import imgdoc_2 from '../images/doc-2.jpg';
import imgdoc_1 from '../images/doc-1.jpg';
import imgabout from '../images/about.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { height } from '@mui/system';
import '../styles/swiperPagination.css';
import { Parallax } from 'react-parallax';

const Home = () => {
    const [testimonials,setTestimonials]=useState([]);
    const [dentists,setDentists]=useState([]);
    const [procedures,setProcedures]=useState([]);
    const [randomUserMale, setRandomUserMale] = useState(null);
    const [randomUserMale2, setRandomUserMale2] = useState(null);
    const [randomUserFemale, setRandomUserFemale] = useState(null);
    const [randomUserFemale2, setRandomUserFemale2] = useState(null);
   useEffect(() => {
    
  document.querySelectorAll('.ftco-animate').forEach(el => {
    el.classList.add('ftco-animated');
    el.style.opacity = '1';
    el.style.visibility = 'visible';
  });
  console.log("hereinuse");
  const fetchData = async () => {
            const response=await fetch("http://localhost:5000/api/testimonial/fetchalltestimonials",{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json'
                    },
                  });
                  const json=await response.json()
                  console.log(json.data);
                  setTestimonials(json.data)
                  const response2=await fetch("http://localhost:5000/api/dentist/fetchalldentists",{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json'
                    },
                  });
                  const json2=await response2.json()
                  console.log(json2.data);
                  setDentists(json2.data)
                  const response3=await fetch("http://localhost:5000/api/procedure/fetchallprocedures",{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json'
                    },
                  });
                  const json3=await response3.json()
                  console.log(json3.data);
                  setProcedures(json3.data)
          };
          fetchData();
}, []);
useEffect(() => {
    
  const filteredUsers = dentists.filter(user => user.gender === 'male');

        // 2. Select a random element from the filtered list
        if (filteredUsers.length > 0) {
          const randomIndex = Math.floor(Math.random() * filteredUsers.length);
          setRandomUserMale(filteredUsers[randomIndex]);
          const randomIndex2 = Math.floor(Math.random() * filteredUsers.length);
          setRandomUserMale2(filteredUsers[randomIndex2]);
        }
        const filteredUsers2 = dentists.filter(user => user.gender === 'female');

        // 2. Select a random element from the filtered list
        if (filteredUsers2.length > 0) {
          const randomIndex3 = Math.floor(Math.random() * filteredUsers2.length);
          setRandomUserFemale(filteredUsers2[randomIndex3]);
          const randomIndex4 = Math.floor(Math.random() * filteredUsers2.length);
          setRandomUserFemale2(filteredUsers2[randomIndex4]);
        }
}, [dentists]);
    return (
        <>
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
                                <p className="con"><span>Free Call</span> <span>+1 234 456 78910</span></p>
                                <p className="con">198 West 21th Street, Suite 721 New York NY 10016</p>
                            </div>
                        </div>
                        <div className="col-md-4 order-md-3 d-flex topper mb-md-0 align-items-center">
                            <div className="icon d-flex justify-content-center align-items-center"><span className="icon-paper-plane"></span></div>
                            <div className="text pl-3 pl-md-3">
                                <p className="hr"><span>Open Hours</span></p>
                                <p className="time"><span>Mon - Sat:</span> <span>8:00am - 9:00pm</span> Sun: Closed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark ftco-navbar-light" id="ftco-navbar">
                <div className="container d-flex align-items-center">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="oi oi-menu"></span> Menu
                    </button>
                    <div className="collapse navbar-collapse" id="ftco-nav">
                        <ul className="navbar-nav m-auto">
                            <li className="nav-item active"><a href="index.html" className="nav-link pl-0">Home</a></li>
                            <li className="nav-item" style={{display:'none'}}><a href="about.html" className="nav-link">About</a></li>
                            <li className="nav-item"><a href="doctor.html" className="nav-link">Doctor</a></li>
                            <li className="nav-item"><a href="department.html" className="nav-link">Services</a></li>
                            <li className="nav-item" style={{display:'none'}}><a href="blog.html" className="nav-link">Blog</a></li>
                            <li className="nav-item" style={{display:'none'}}><a href="contact.html" className="nav-link">Contact</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
            

            <section className="home-slider" style={{height:"600px"}}> 
                <Swiper  loop={true}  autoplay={{
							delay: 3000,
							disableOnInteraction: false,
						}}
						modules={[Autoplay, Pagination]}
						pagination={{ clickable: true }}
                        
                        slidesPerView={1}
                        
						className="mySwiper1">
						<SwiperSlide>
                            <Parallax bgImage={imgbg_1} strength={300}>
      <div style={{ height: "600px" }}>
                {/* <div className="slider-item" style={{backgroundImage:`url(${imgbg_1})`,height:"600px",backgroundSize: 'cover'}}> */}
                    <div className="overlay"></div>
                    <div className="container">
                        <div className="row no-gutters slider-text align-items-center justify-content-end" data-scrollax-parent="true"  style={{height:"600px"}}>
                            <div className="col-md-6 text ftco-animate" data-swiper-parallax="-300">
                                <h1 className="mb-4">Helping Your <br/><span>Stay Happy One</span></h1>
                                <h3 className="subheading" style={{fontSize:"18px"}}>Everyday We Bring Hope and Smile to the Patient We Serve</h3>
                                <p><a href="#" className="btn btn-secondary px-4 py-3 mt-3">View our works</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                </Parallax>
</SwiperSlide>
<SwiperSlide>

                <div className="slider-item" style={{backgroundImage: `url(${imgbg_2})`,height:"600px",backgroundSize: 'cover'}}>
                    <div className="overlay"></div>
                    <div className="container">
                        <div className="row no-gutters slider-text align-items-center justify-content-end" data-scrollax-parent="true"  style={{height:"600px"}}>
                            <div className="col-md-6 text ftco-animate">
                                <h1 className="mb-4">Smile Makes <br/>A Lasting Impression</h1>
                                <h3 className="subheading" style={{fontSize:"18px"}}>Your Health is Our Top Priority with Comprehensive, Affordable medical.</h3>
                                <p><a href="#" className="btn btn-secondary px-4 py-3 mt-3">View our works</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                </SwiperSlide>
                </Swiper>
            </section> 

            <section className="ftco-section ftco-no-pt ftco-no-pb">
                <div className="container">
                    <div className="row no-gutters">
                        <div className="col-md-5 p-md-5 img img-2 mt-5 mt-md-0" style={{backgroundImage:`url(${imgabout})`}}>
                        </div>
                        <div className="col-md-7 wrap-about py-4 py-md-5 ftco-animate">
                            <div className="heading-section mb-5">
                                <div className="pl-md-5 ml-md-5 pt-md-5">
                                    <span className="subheading mb-2">Welcome to Dentista</span>
                                    <h2 className="mb-2" style={{fontSize: "32px"}}>Medical specialty concerned with the care of acutely ill hospitalized patients</h2>
                                </div>
                            </div>
                            <div className="pl-md-5 ml-md-5 mb-5">
                                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</p>
                                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
                                <div className="founder d-flex align-items-center mt-5">
                                    <div className="img" style={{backgroundImage: `url(${imgdoc_1})`}}></div>
                                    <div className="text pl-3">
                                        <h3 className="mb-0">Dr. Paul Foster</h3>
                                        <span className="position">CEO, Founder</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="ftco-section ftco-no-pt ftco-no-pb">
                <div className="container-fluid px-md-0">
                    <div className="row no-gutters">
                        <div className="col-md-3 d-flex align-items-stretch">
                            <div className="consultation w-100 text-center px-4 px-md-5">
                                <h3 className="mb-4">Dental Services</h3>
                                <p>A small river named Duden flows by their place and supplies</p>
                                <a href="#" className="btn-custom">See Services</a>
                            </div>
                        </div>
                        <div className="col-md-6 d-flex align-items-stretch">
                            <div className="consultation consul w-100 px-4 px-md-5">
                                <div className="text-center">
                                    <h3 className="mb-4">Free Consultation</h3>
                                </div>
                                <form action="#" className="appointment-form">
                                    <div className="row">
                                        <div className="col-md-12 col-lg-6 col-xl-4">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="First Name"/>
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-lg-6 col-xl-4">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Last Name"/>
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-lg-6 col-xl-4">
                                            <div className="form-group">
                                                <div className="form-field">
                                                    <div className="select-wrap">
                                                        <div className="icon"><span className="ion-ios-arrow-down"></span></div>
                                                        <select name="" id="" className="form-control">
                                                            <option value="">Department</option>
                                                            <option value="">Neurology</option>
                                                            <option value="">Cardiology</option>
                                                            <option value="">Dental</option>
                                                            <option value="">Ophthalmology</option>
                                                            <option value="">Other Services</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-lg-6 col-xl-4">
                                            <div className="form-group">
                                                <div className="input-wrap">
                                                    <div className="icon"><span className="ion-md-calendar"></span></div>
                                                    <input type="text" className="form-control appointment_date" placeholder="Date"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-lg-6 col-xl-4">
                                            <div className="form-group">
                                                <div className="input-wrap">
                                                    <div className="icon"><span className="ion-ios-clock"></span></div>
                                                    <input type="text" className="form-control appointment_time" placeholder="Time"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-lg-6 col-xl-4">
                                            <div className="form-group">
                                                <input type="submit" value="Appointment" className="btn btn-secondary py-2 px-4"/>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-3 d-flex align-items-stretch">
                            <div className="consultation w-100 text-center px-4 px-md-5">
                                <h3 className="mb-4">Find A Doctor</h3>
                                <p>A small river named Duden flows by their place and supplies</p>
                                <a href="#" className="btn-custom">Mee our doctor</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="ftco-section ftco-services">
                <div className="container">
                    <div className="row justify-content-center mb-5 pb-2">
                        <div className="col-md-8 text-center heading-section ftco-animate">
                            <span className="subheading">Services</span>
                            <h2 className="mb-4">Our Clinic Services</h2>
                            <p>Separated they live in. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 d-flex services align-self-stretch p-4 ftco-animate">
                            <div className="media block-6 d-block text-center">
                                <div className="icon d-flex justify-content-center align-items-center">
                                    <span className="flaticon-drilling"></span>
                                </div>
                                <div className="media-body p-2 mt-3">
                                    <h3 className="heading">{procedures[0]?.name}</h3>
                                    <p>{procedures[0]?.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 d-flex services align-self-stretch p-4 ftco-animate">
                            <div className="media block-6 d-block text-center">
                                <div className="icon d-flex justify-content-center align-items-center">
                                    <span className="flaticon-tooth"></span>
                                </div>
                                <div className="media-body p-2 mt-3">
                                    <h3 className="heading">{procedures[1]?.name}</h3>
                                    <p>{procedures[1]?.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 d-flex services align-self-stretch p-4 ftco-animate">
                            <div className="media block-6 d-block text-center">
                                <div className="icon d-flex justify-content-center align-items-center">
                                    <span className="flaticon-dental-floss"></span>
                                </div>
                                <div className="media-body p-2 mt-3">
                                    <h3 className="heading">{procedures[2]?.name}</h3>
                                    <p>{procedures[2]?.description}</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 d-flex services align-self-stretch p-4 ftco-animate">
                            <div className="media block-6 d-block text-center">
                                <div className="icon d-flex justify-content-center align-items-center">
                                    <span className="flaticon-shiny-tooth"></span>
                                </div>
                                <div className="media-body p-2 mt-3">
                                    <h3 className="heading">{procedures[3]?.name}</h3>
                                    <p>{procedures[3]?.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 d-flex services align-self-stretch p-4 ftco-animate">
                            <div className="media block-6 d-block text-center">
                                <div className="icon d-flex justify-content-center align-items-center">
                                    <span className="flaticon-dentist-chair"></span>
                                </div>
                                <div className="media-body p-2 mt-3">
                                    <h3 className="heading">{procedures[4]?.name}</h3>
                                    <p>{procedures[4]?.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 d-flex services align-self-stretch p-4 ftco-animate">
                            <div className="media block-6 d-block text-center">
                                <div className="icon d-flex justify-content-center align-items-center">
                                    <span className="flaticon-tooth-1"></span>
                                </div>
                                <div className="media-body p-2 mt-3">
                                    <h3 className="heading">{procedures[5]?.name}</h3>
                                    <p>{procedures[5]?.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 d-flex services align-self-stretch p-4 ftco-animate">
                            <div className="media block-6 d-block text-center">
                                <div className="icon d-flex justify-content-center align-items-center">
                                    <span className="flaticon-tooth-with-braces"></span>
                                </div>
                                <div className="media-body p-2 mt-3">
                                    <h3 className="heading">{procedures[6]?.name}</h3>
                                    <p>{procedures[6]?.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 d-flex services align-self-stretch p-4 ftco-animate">
                            <div className="media block-6 d-block text-center">
                                <div className="icon d-flex justify-content-center align-items-center">
                                    <span className="flaticon-decayed-tooth"></span>
                                </div>
                                <div className="media-body p-2 mt-3">
                                    <h3 className="heading">{procedures[7]?.name}</h3>
                                    <p>{procedures[7]?.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Parallax bgImage={imgbg_3} strength={300}>
            {/* <section className="ftco-section intro" style={{backgroundImage: `url(${imgbg_3})`}}> */}
            <section className="ftco-section intro">               
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h3 className="mb-4">We promised to take care our patients and we delivered.</h3>
                            <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country</p>
                        </div>
                    </div>
                </div>
            </section>
            </Parallax>
            <section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center mb-5 pb-2">
                        <div className="col-md-8 text-center heading-section ftco-animate">
                            <span className="subheading">Doctors</span>
                            <h2 className="mb-4">Our Qualified Doctors</h2>
                            <p>Separated they live in. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-lg-3 ftco-animate">
                            <div className="staff">
                                <div className="img-wrap d-flex align-items-stretch">
                                    <div className="img align-self-stretch" style={{backgroundImage: `url(${imgdoc_1})`}}></div>
                                </div>
                                <div className="text pt-3 text-center">
                                    <h3>Dr. {randomUserMale?.name}</h3>
                                    <span className="position mb-2">Dentist</span>
                                    <div className="faded">
                                        <p>I have specialization in {randomUserMale?.specialization} and I have {randomUserMale?.experienceLevel} years of experience.</p>
                                        <ul className="ftco-social text-center">
                                            <li className="ftco-animate"><a href="#" className="d-flex align-items-center justify-content-center"><span className="icon-twitter"></span></a></li>
                                            <li className="ftco-animate"><a href="#" className="d-flex align-items-center justify-content-center"><span className="icon-facebook"></span></a></li>
                                            <li className="ftco-animate"><a href="#" className="d-flex align-items-center justify-content-center"><span className="icon-google-plus"></span></a></li>
                                            <li className="ftco-animate"><a href="#" className="d-flex align-items-center justify-content-center"><span className="icon-instagram"></span></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 ftco-animate">
                            <div className="staff">
                                <div className="img-wrap d-flex align-items-stretch">
                                    <div className="img align-self-stretch" style={{backgroundImage: `url(${imgdoc_2})`}}></div>
                                </div>
                                <div className="text pt-3 text-center">
                                    <h3>Dr. {randomUserFemale?.name}</h3>
                                    <span className="position mb-2">Dentist</span>
                                    <div className="faded">
                                        <p>I have specialization in {randomUserFemale?.specialization} and I have {randomUserFemale?.experienceLevel} years of experience.</p>
                                        <ul className="ftco-social text-center">
                                            <li className="ftco-animate"><a href="#" className="d-flex align-items-center justify-content-center"><span className="icon-twitter"></span></a></li>
                                            <li className="ftco-animate"><a href="#" className="d-flex align-items-center justify-content-center"><span className="icon-facebook"></span></a></li>
                                            <li className="ftco-animate"><a href="#" className="d-flex align-items-center justify-content-center"><span className="icon-google-plus"></span></a></li>
                                            <li className="ftco-animate"><a href="#" className="d-flex align-items-center justify-content-center"><span className="icon-instagram"></span></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 ftco-animate">
                            <div className="staff">
                                <div className="img-wrap d-flex align-items-stretch">
                                    <div className="img align-self-stretch" style={{backgroundImage:  `url(${imgdoc_3})`}}></div>
                                </div>
                                <div className="text pt-3 text-center">
                                    <h3>Dr. {randomUserMale2?.name}</h3>
                                    <span className="position mb-2">Dentist</span>
                                    <div className="faded">
                                        <p>I have specialization in {randomUserMale2?.specialization} and I have {randomUserMale2?.experienceLevel} years of experience.</p>
                                        <ul className="ftco-social text-center">
                                            <li className="ftco-animate"><a href="#" className="d-flex align-items-center justify-content-center"><span className="icon-twitter"></span></a></li>
                                            <li className="ftco-animate"><a href="#" className="d-flex align-items-center justify-content-center"><span className="icon-facebook"></span></a></li>
                                            <li className="ftco-animate"><a href="#" className="d-flex align-items-center justify-content-center"><span className="icon-google-plus"></span></a></li>
                                            <li className="ftco-animate"><a href="#" className="d-flex align-items-center justify-content-center"><span className="icon-instagram"></span></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 ftco-animate">
                            <div className="staff">
                                <div className="img-wrap d-flex align-items-stretch">
                                    <div className="img align-self-stretch" style={{backgroundImage: `url(${imgdoc_4})`}}></div>
                                </div>
                                <div className="text pt-3 text-center">
                                    <h3>Dr. {randomUserFemale2?.name}</h3>
                                    <span className="position mb-2">Dentist</span>
                                    <div className="faded">
                                        <p>I have specialization in {randomUserFemale2?.specialization} and I have {randomUserFemale2?.experienceLevel} years of experience.</p>
                                        <ul className="ftco-social text-center">
                                            <li className="ftco-animate"><a href="#" className="d-flex align-items-center justify-content-center"><span className="icon-twitter"></span></a></li>
                                            <li className="ftco-animate"><a href="#" className="d-flex align-items-center justify-content-center"><span className="icon-facebook"></span></a></li>
                                            <li className="ftco-animate"><a href="#" className="d-flex align-items-center justify-content-center"><span className="icon-google-plus"></span></a></li>
                                            <li className="ftco-animate"><a href="#" className="d-flex align-items-center justify-content-center"><span className="icon-instagram"></span></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="ftco-section testimony-section bg-light" style={{height:'630px'}}>
                <div className="container" style={{height:'100%'}}>
                    <div className="row justify-content-center mb-5 pb-2">
                        <div className="col-md-8 text-center heading-section ftco-animate">
                            <span className="subheading">Testimonials</span>
                            <h2 className="mb-4">Our Patients Says About Us</h2>
                        </div>
                    </div>
                    <div className="row ftco-animate justify-content-center" style={{height:'58%'}}>
                        <div className="col-md-12">
                            <div className="carousel-testimony" style={{height:'100%'}}>
                                <Swiper  loop={true}  autoplay={{
							delay: 3000,
							disableOnInteraction: false,
						}}
						modules={[Autoplay, Pagination]}
						pagination={{ clickable: true }}
                        slidesPerView={3}
                        style={{height:'100%'}}
                        className="mySwiper2"
						>
						<SwiperSlide>
                            
                                <div className="item">
                                    <div className="testimony-wrap d-flex">
                                        <div className="user-img" style={{backgroundImage: `url(${imgperson_1})`}}>
                                        </div>
                                        <div className="text pl-4 bg-light">
                                            <span className="quote d-flex align-items-center justify-content-center">
                                                <i className="icon-quote-left"></i>
                                            </span>
                                            <p style={{minHeight: '120px'}}>{testimonials[0]?.comment}</p>
                                            <p className="name">{testimonials[0]?.patientName}</p>
                                            <span className="position">{testimonials[0]?.profession}</span>
                                        </div>
                                    </div>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className="item">
                                    <div className="testimony-wrap d-flex">
                                        <div className="user-img" style={{backgroundImage: `url(${imgperson_2})`}}>
                                        </div>
                                        <div className="text pl-4 bg-light">
                                            <span className="quote d-flex align-items-center justify-content-center">
                                                <i className="icon-quote-left"></i>
                                            </span>
                                            <p style={{minHeight: '120px'}}>{testimonials[1]?.comment}</p>
                                            <p className="name">{testimonials[1]?.patientName}</p>
                                            <span className="position">{testimonials[1]?.profession}</span>
                                        </div>
                                    </div>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className="item">
                                    <div className="testimony-wrap d-flex">
                                        <div className="user-img" style={{backgroundImage: `url(${imgperson_3})`}}>
                                        </div>
                                        <div className="text pl-4 bg-light">
                                            <span className="quote d-flex align-items-center justify-content-center">
                                                <i className="icon-quote-left"></i>
                                            </span>
                                            <p style={{minHeight: '120px'}}>{testimonials[2]?.comment}</p>
                                            <p className="name">{testimonials[2]?.patientName}</p>
                                            <span className="position">{testimonials[2]?.profession}</span>
                                        </div>
                                    </div>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className="item">
                                    <div className="testimony-wrap d-flex">
                                        <div className="user-img" style={{backgroundImage: `url(${imgperson_4})`}}>
                                        </div>
                                        <div className="text pl-4 bg-light">
                                            <span className="quote d-flex align-items-center justify-content-center">
                                                <i className="icon-quote-left"></i>
                                            </span>
                                            <p style={{minHeight: '120px'}}>{testimonials[3]?.comment}</p>
                                            <p className="name">{testimonials[3]?.patientName}</p>
                                            <span className="position">{testimonials[3]?.profession}</span>
                                        </div>
                                    </div>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className="item">
                                    <div className="testimony-wrap d-flex">
                                        <div className="user-img" style={{backgroundImage: `url(${imgperson_1})`}}>
                                        </div>
                                        <div className="text pl-4 bg-light">
                                            <span className="quote d-flex align-items-center justify-content-center">
                                                <i className="icon-quote-left"></i>
                                            </span>
                                            <p style={{minHeight: '120px'}}>{testimonials[4]?.comment}</p>
                                            <p className="name">{testimonials[4]?.patientName}</p>
                                            <span className="position">{testimonials[4]?.profession}</span>
                                        </div>
                                    </div>
                                </div>
                                </SwiperSlide>
                                </Swiper>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>
            <Parallax bgImage={imgbg_3} strength={300}>
            <section className="ftco-intro">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <h2>We Provide Free Dental Care Consultation</h2>
                            <p className="mb-0">Your Health is Our Top Priority with Comprehensive, Affordable medical.</p>
                            <p></p>
                        </div>
                        <div className="col-md-3 d-flex align-items-center">
                            <p className="mb-0"><a href="#" className="btn btn-secondary px-4 py-3">Free Consutation</a></p>
                        </div>
                    </div>
                </div>
            </section>
            </Parallax>
            <section className="ftco-section" style={{display:"none"}}>
                <div className="container">
                    <div className="row justify-content-center mb-5 pb-2">
                        <div className="col-md-8 text-center heading-section ftco-animate">
                            <span className="subheading">Pricing</span>
                            <h2 className="mb-4">Our Pricing</h2>
                            <p>Separated they live in. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 ftco-animate">
                            <div className="pricing-entry pb-5 text-center">
                                <div>
                                    <h3 className="mb-4">Basic</h3>
                                    <p><span className="price">$24.50</span> <span className="per">/ session</span></p>
                                </div>
                                <ul>
                                    <li>Diagnostic Services</li>
                                    <li>Professional Consultation</li>
                                    <li>Tooth Implants</li>
                                    <li>Surgical Extractions</li>
                                    <li>Teeth Whitening</li>
                                </ul>
                                <p className="button text-center"><a href="#" className="btn btn-primary px-4 py-3">Get Offer</a></p>
                            </div>
                        </div>
                        <div className="col-md-3 ftco-animate">
                            <div className="pricing-entry pb-5 text-center">
                                <div>
                                    <h3 className="mb-4">Standard</h3>
                                    <p><span className="price">$34.50</span> <span className="per">/ session</span></p>
                                </div>
                                <ul>
                                    <li>Diagnostic Services</li>
                                    <li>Professional Consultation</li>
                                    <li>Tooth Implants</li>
                                    <li>Surgical Extractions</li>
                                    <li>Teeth Whitening</li>
                                </ul>
                                <p className="button text-center"><a href="#" className="btn btn-primary px-4 py-3">Get Offer</a></p>
                            </div>
                        </div>
                        <div className="col-md-3 ftco-animate">
                            <div className="pricing-entry active pb-5 text-center">
                                <div>
                                    <h3 className="mb-4">Premium</h3>
                                    <p><span className="price">$54.50</span> <span className="per">/ session</span></p>
                                </div>
                                <ul>
                                    <li>Diagnostic Services</li>
                                    <li>Professional Consultation</li>
                                    <li>Tooth Implants</li>
                                    <li>Surgical Extractions</li>
                                    <li>Teeth Whitening</li>
                                </ul>
                                <p className="button text-center"><a href="#" className="btn btn-primary px-4 py-3">Get Offer</a></p>
                            </div>
                        </div>
                        <div className="col-md-3 ftco-animate">
                            <div className="pricing-entry pb-5 text-center">
                                <div>
                                    <h3 className="mb-4">Platinum</h3>
                                    <p><span className="price">$89.50</span> <span className="per">/ session</span></p>
                                </div>
                                <ul>
                                    <li>Diagnostic Services</li>
                                    <li>Professional Consultation</li>
                                    <li>Tooth Implants</li>
                                    <li>Surgical Extractions</li>
                                    <li>Teeth Whitening</li>
                                </ul>
                                <p className="button text-center"><a href="#" className="btn btn-primary px-4 py-3">Get Offer</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="ftco-section bg-light">
                <div className="container">
                    <div className="row justify-content-center mb-5 pb-2">
                        <div className="col-md-8 text-center heading-section ftco-animate">
                            <span className="subheading">Blog</span>
                            <h2 className="mb-4">Recent Blog</h2>
                            <p>Separated they live in. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 ftco-animate">
                            <div className="blog-entry">
                                <a href="blog-single.html" className="block-20 d-flex align-items-end justify-content-end" style={{backgroundImage: `url(${imgimage_1})`}}>
                                    <div className="meta-date text-center p-2">
                                        <span className="day">18</span>
                                        <span className="mos">September</span>
                                        <span className="yr">2019</span>
                                    </div>
                                </a>
                                <div className="text bg-white p-4">
                                    <h3 className="heading"><a href="#">Scary Thing That You Don’t Get Enough Sleep</a></h3>
                                    <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                    <div className="d-flex align-items-center mt-4">
                                        <p className="mb-0"><a href="#" className="btn btn-primary">Read More <span className="ion-ios-arrow-round-forward"></span></a></p>
                                        <p className="ml-auto mb-0">
                                            <a href="#" className="mr-2">Admin</a>
                                            <a href="#" className="meta-chat"><span className="icon-chat"></span> 3</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 ftco-animate">
                            <div className="blog-entry">
                                <a href="blog-single.html" className="block-20 d-flex align-items-end justify-content-end" style={{backgroundImage: `url(${imgimage_2})`}}>
                                    <div className="meta-date text-center p-2">
                                        <span className="day">18</span>
                                        <span className="mos">September</span>
                                        <span className="yr">2019</span>
                                    </div>
                                </a>
                                <div className="text bg-white p-4">
                                    <h3 className="heading"><a href="#">Scary Thing That You Don’t Get Enough Sleep</a></h3>
                                    <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                    <div className="d-flex align-items-center mt-4">
                                        <p className="mb-0"><a href="#" className="btn btn-primary">Read More <span className="ion-ios-arrow-round-forward"></span></a></p>
                                        <p className="ml-auto mb-0">
                                            <a href="#" className="mr-2">Admin</a>
                                            <a href="#" className="meta-chat"><span className="icon-chat"></span> 3</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 ftco-animate">
                            <div className="blog-entry">
                                <a href="blog-single.html" className="block-20 d-flex align-items-end justify-content-end" style={{backgroundImage: `url(${imgimage_3})`}}>
                                    <div className="meta-date text-center p-2">
                                        <span className="day">18</span>
                                        <span className="mos">September</span>
                                        <span className="yr">2019</span>
                                    </div>
                                </a>
                                <div className="text bg-white p-4">
                                    <h3 className="heading"><a href="#">Scary Thing That You Don’t Get Enough Sleep</a></h3>
                                    <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                    <div className="d-flex align-items-center mt-4">
                                        <p className="mb-0"><a href="#" className="btn btn-primary">Read More <span className="ion-ios-arrow-round-forward"></span></a></p>
                                        <p className="ml-auto mb-0">
                                            <a href="#" className="mr-2">Admin</a>
                                            <a href="#" className="meta-chat"><span className="icon-chat"></span> 3</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <footer className="ftco-footer ftco-bg-dark ftco-section" style={{padding:'6em 0 0 0'}}>
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-md">
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
                                    <li className="ftco-animate"><a href="#"><span className="icon-twitter"></span></a></li>
                                    <li className="ftco-animate"><a href="#"><span className="icon-facebook"></span></a></li>
                                    <li className="ftco-animate"><a href="#"><span className="icon-instagram"></span></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="ftco-footer-widget mb-5 ml-md-4">
                                <h2 className="ftco-heading-2">Links</h2>
                                <ul className="list-unstyled">
                                    <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2"></span>Home</a></li>
                                    <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2"></span>Doctor</a></li>
                                    <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2"></span>Services</a></li>
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
                        <div className="col-md">
                            <div className="ftco-footer-widget mb-5">
                                <h2 className="ftco-heading-2">Recent Blog</h2>
                                <div className="block-21 mb-4 d-flex">
                                    <a className="blog-img mr-4" style={{backgroundImage: `url(${imgimage_1})`}}></a>
                                    <div className="text">
                                        <h3 className="heading"><a href="#">Even the all-powerful Pointing has no control about</a></h3>
                                        <div className="meta">
                                            <div><a href="#"><span className="icon-calendar"></span> Sept. 20, 2019</a></div>
                                            <div><a href="#"><span className="icon-person"></span> Admin</a></div>
                                            <div><a href="#"><span className="icon-chat"></span> 19</a></div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="block-21 mb-5 d-flex" style={{display:"none"}}>
                                    <a className="blog-img mr-4" style={{backgroundImage: `url(${imgimage_2})`}}></a>
                                    <div className="text">
                                        <h3 className="heading"><a href="#">Even the all-powerful Pointing has no control about</a></h3>
                                        <div className="meta">
                                            <div><a href="#"><span className="icon-calendar"></span> Sept. 20, 2019</a></div>
                                            <div><a href="#"><span className="icon-person"></span> Admin</a></div>
                                            <div><a href="#"><span className="icon-chat"></span> 19</a></div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="ftco-footer-widget mb-5">
                                <h2 className="ftco-heading-2">Opening Hours</h2>
                                <h3 className="open-hours pl-4"><span className="ion-ios-time mr-3"></span>We are open 24/6</h3>
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
                                    Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="icon-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
                                    </p>
                            </div>
                        </div>
                    </div>
            </footer>



            
            {/* <div id="ftco-loader" className="show fullscreen"><svg className="circular" width="48px" height="48px"><circle className="path-bg" cx="24" cy="24" r="22" fill="none" strokeWidth="4" stroke="#eeeeee" /><circle className="path" cx="24" cy="24" r="22" fill="none" strokeWidth="4" strokeMiterlimit="10" stroke="#F96D00" /></svg></div> */}

        </>
    )
}

export default Home
