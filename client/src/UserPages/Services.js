import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import UserFooter from '../components/UserFooter'
import UserHeader from '../components/UserHeader'
import { Parallax } from 'react-parallax';
import imgbg_1 from '../images/bg_1.jpg';
import imgdept_1 from '../images/dept-1.jpg';
import imgdept_2 from '../images/dept-2.jpg';
import imgdept_3 from '../images/dept-3.jpg';
import imgdept_4 from '../images/dept-4.jpg';
import imgdept_5 from '../images/dept-5.jpg';
import imgdept_6 from '../images/dept-6.jpg';
import imgdept_7 from '../images/dept-7.jpg';
import imgdept_8 from '../images/dept-8.jpg';

const Services = () => {
  const [procedures, setProcedures] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {

      navigate("/");
      return;
    }
    document.querySelectorAll('.ftco-animate').forEach(el => {
      el.classList.add('ftco-animated');
      el.style.opacity = '1';
      el.style.visibility = 'visible';
    });
    console.log("hereinuse");
    const fetchData = async () => {

      const response3 = await fetch("http://localhost:5000/api/procedure/fetchallprocedures", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json' ,
            'auth-token':localStorage.getItem('token')
        },
      });
      const json3 = await response3.json()
      console.log(json3.data);
      setProcedures(json3.data)
    };
    fetchData();
  }, []);
  return (
    <div>
      <UserHeader />
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark ftco-navbar-light" id="ftco-navbar">
        <div class="container d-flex align-items-center">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="oi oi-menu"></span> Menu
          </button>
          <div class="collapse navbar-collapse" id="ftco-nav">
            <ul class="navbar-nav m-auto">
              <li className="nav-item"><Link to="/home" className="nav-link pl-0">Home</Link></li>
              <li className="nav-item" style={{ display: 'none' }}><a href="about.html" className="nav-link">About</a></li>
              <li className="nav-item"><Link to="/doctor" className="nav-link">Doctor</Link></li>
              <li className="nav-item active"><Link to="/services" className="nav-link">Services</Link></li>
              <li className="nav-item"><Link to="/admin" className="nav-link">Dashboard</Link></li>
              <li className="nav-item" style={{ display: 'none' }}><a href="blog.html" className="nav-link">Blog</a></li>
              <li className="nav-item" style={{ display: 'none' }}><a href="contact.html" className="nav-link">Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>
      <Parallax bgImage={imgbg_1} strength={300}>
        <section class="hero-wrap hero-wrap-2">
          <div class="overlay"></div>
          <div class="container">
            <div class="row no-gutters slider-text align-items-center justify-content-center">
              <div class="col-md-9 ftco-animate text-center">
                <h1 class="mb-2 bread">Our Services</h1>
                <p class="breadcrumbs"><span class="mr-2"><a href="index.html">Home <i class="ion-ios-arrow-forward"></i></a></span> <span>Services <i class="ion-ios-arrow-forward"></i></span></p>
              </div>
            </div>
          </div>
        </section>
      </Parallax>

      <section class="ftco-section ftco-services">
        <div class="container">
          <div class="row">
            <div class="col-md-4 d-flex services align-self-stretch p-4 ftco-animate">
              <div class="media block-6 d-block">
                <div class="img w-100" style={{ backgroundImage: `url(${imgdept_1})` }}></div>
                <div class="media-body p-2 mt-3">
                  <h3 class="heading">{procedures[0]?.name}</h3>
                  <p>{procedures[0]?.description}</p>
                </div>
              </div>
            </div>
            <div class="col-md-4 d-flex services align-self-stretch p-4 ftco-animate">
              <div class="media block-6 d-block">
                <div class="img w-100" style={{ backgroundImage: `url(${imgdept_2})` }}></div>
                <div class="media-body p-2 mt-3">
                  <h3 class="heading">{procedures[1]?.name}</h3>
                  <p>{procedures[1]?.description}</p>
                </div>
              </div>
            </div>
            <div class="col-md-4 d-flex services align-self-stretch p-4 ftco-animate">
              <div class="media block-6 d-block">
                <div class="img w-100" style={{ backgroundImage: `url(${imgdept_3})` }}></div>
                <div class="media-body p-2 mt-3">
                  <h3 class="heading">{procedures[2]?.name}</h3>
                  <p>{procedures[2]?.description}</p>
                </div>
              </div>
            </div>

            <div class="col-md-4 d-flex services align-self-stretch p-4 ftco-animate">
              <div class="media block-6 d-block">
                <div class="img w-100" style={{ backgroundImage: `url(${imgdept_4})` }}></div>
                <div class="media-body p-2 mt-3">
                  <h3 class="heading">{procedures[3]?.name}</h3>
                  <p>{procedures[3]?.description}</p>
                </div>
              </div>
            </div>
            <div class="col-md-4 d-flex services align-self-stretch p-4 ftco-animate">
              <div class="media block-6 d-block">
                <div class="img w-100" style={{ backgroundImage: `url(${imgdept_5})` }}></div>
                <div class="media-body p-2 mt-3">
                  <h3 class="heading">{procedures[4]?.name}</h3>
                  <p>{procedures[4]?.description}</p>
                </div>
              </div>
            </div>
            <div class="col-md-4 d-flex services align-self-stretch p-4 ftco-animate">
              <div class="media block-6 d-block">
                <div class="img w-100" style={{ backgroundImage: `url(${imgdept_6})` }}></div>
                <div class="media-body p-2 mt-3">
                  <h3 class="heading">{procedures[5]?.name}</h3>
                  <p>{procedures[5]?.description}</p>
                </div>
              </div>
            </div>
            <div class="col-md-4 d-flex services align-self-stretch p-4 ftco-animate">
              <div class="media block-6 d-block">
                <div class="img w-100" style={{ backgroundImage: `url(${imgdept_7})` }}></div>
                <div class="media-body p-2 mt-3">
                  <h3 class="heading">{procedures[6]?.name}</h3>
                  <p>{procedures[6]?.description}</p>
                </div>
              </div>
            </div>
            <div class="col-md-4 d-flex services align-self-stretch p-4 ftco-animate">
              <div class="media block-6 d-block">
                <div class="img w-100" style={{ backgroundImage: `url(${imgdept_8})` }}></div>
                <div class="media-body p-2 mt-3">
                  <h3 class="heading">{procedures[7]?.name}</h3>
                  <p>{procedures[7]?.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <UserFooter />
    </div>
  )
}

export default Services
