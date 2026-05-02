import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import UserFooter from '../components/UserFooter'
import UserHeader from '../components/UserHeader'
import imgdoc_8 from '../images/doc-8.jpg';
import imgdoc_7 from '../images/doc-7.jpg';
import imgdoc_6 from '../images/doc-6.jpg';
import imgdoc_5 from '../images/doc-5.jpg';
import imgdoc_4 from '../images/doc-4.jpg';
import imgdoc_3 from '../images/doc-3.jpg';
import imgdoc_2 from '../images/doc-2.jpg';
import imgdoc_1 from '../images/doc-1.jpg';
import imgbg_1 from '../images/bg_1.jpg';
import { Parallax } from 'react-parallax';

const Doctor = () => {
    const [dentists, setDentists] = useState([]);
    const [randomUserMale, setRandomUserMale] = useState(null);
    const [randomUserMale2, setRandomUserMale2] = useState(null);
    const [randomUserMale3, setRandomUserMale3] = useState(null);
    const [randomUserMale4, setRandomUserMale4] = useState(null);
    const [randomUserFemale, setRandomUserFemale] = useState(null);
    const [randomUserFemale2, setRandomUserFemale2] = useState(null);
    const [randomUserFemale3, setRandomUserFemale3] = useState(null);
    const [randomUserFemale4, setRandomUserFemale4] = useState(null);
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

            const response2 = await fetch("http://localhost:5000/api/dentist/fetchalldentists", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json' ,
            'auth-token':localStorage.getItem('token')
                },
            });
            const json2 = await response2.json()
            console.log(json2.data);
            setDentists(json2.data)

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
            const randomIndex3 = Math.floor(Math.random() * filteredUsers.length);
            setRandomUserMale3(filteredUsers[randomIndex3]);
            const randomIndex4 = Math.floor(Math.random() * filteredUsers.length);
            setRandomUserMale4(filteredUsers[randomIndex4]);
        }
        const filteredUsers2 = dentists.filter(user => user.gender === 'female');

        // 2. Select a random element from the filtered list
        if (filteredUsers2.length > 0) {
            const randomIndex5 = Math.floor(Math.random() * filteredUsers2.length);
            setRandomUserFemale(filteredUsers2[randomIndex5]);
            const randomIndex6 = Math.floor(Math.random() * filteredUsers2.length);
            setRandomUserFemale2(filteredUsers2[randomIndex6]);
            const randomIndex7 = Math.floor(Math.random() * filteredUsers2.length);
            setRandomUserFemale3(filteredUsers2[randomIndex7]);
            const randomIndex8 = Math.floor(Math.random() * filteredUsers2.length);
            setRandomUserFemale4(filteredUsers2[randomIndex8]);
        }
    }, [dentists]);
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
                            <li className="nav-item active"><Link to="/doctor" className="nav-link">Doctor</Link></li>
                            <li className="nav-item"><Link to="/services" className="nav-link">Services</Link></li>
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
                                <h1 class="mb-2 bread">Our Dentist</h1>
                                <p class="breadcrumbs"><span class="mr-2"><a href="index.html">Home <i class="ion-ios-arrow-forward"></i></a></span> <span>Doctors <i class="ion-ios-arrow-forward"></i></span></p>
                            </div>
                        </div>
                    </div>
                </section>
            </Parallax>
            <section class="ftco-section">
                <div class="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-3 ftco-animate">
                            <div className="staff">
                                <div className="img-wrap d-flex align-items-stretch">
                                    <div className="img align-self-stretch" style={{ backgroundImage: `url(${imgdoc_1})` }}></div>
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
                                    <div className="img align-self-stretch" style={{ backgroundImage: `url(${imgdoc_2})` }}></div>
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
                                    <div className="img align-self-stretch" style={{ backgroundImage: `url(${imgdoc_3})` }}></div>
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
                                    <div className="img align-self-stretch" style={{ backgroundImage: `url(${imgdoc_4})` }}></div>
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
                        <div className="col-md-6 col-lg-3 ftco-animate">
                            <div className="staff">
                                <div className="img-wrap d-flex align-items-stretch">
                                    <div className="img align-self-stretch" style={{ backgroundImage: `url(${imgdoc_5})` }}></div>
                                </div>
                                <div className="text pt-3 text-center">
                                    <h3>Dr. {randomUserMale3?.name}</h3>
                                    <span className="position mb-2">Dentist</span>
                                    <div className="faded">
                                        <p>I have specialization in {randomUserMale3?.specialization} and I have {randomUserMale?.experienceLevel} years of experience.</p>
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
                                    <div className="img align-self-stretch" style={{ backgroundImage: `url(${imgdoc_6})` }}></div>
                                </div>
                                <div className="text pt-3 text-center">
                                    <h3>Dr. {randomUserFemale3?.name}</h3>
                                    <span className="position mb-2">Dentist</span>
                                    <div className="faded">
                                        <p>I have specialization in {randomUserFemale3?.specialization} and I have {randomUserFemale?.experienceLevel} years of experience.</p>
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
                                    <div className="img align-self-stretch" style={{ backgroundImage: `url(${imgdoc_7})` }}></div>
                                </div>
                                <div className="text pt-3 text-center">
                                    <h3>Dr. {randomUserMale4?.name}</h3>
                                    <span className="position mb-2">Dentist</span>
                                    <div className="faded">
                                        <p>I have specialization in {randomUserMale4?.specialization} and I have {randomUserMale2?.experienceLevel} years of experience.</p>
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
                                    <div className="img align-self-stretch" style={{ backgroundImage: `url(${imgdoc_8})` }}></div>
                                </div>
                                <div className="text pt-3 text-center">
                                    <h3>Dr. {randomUserFemale4?.name}</h3>
                                    <span className="position mb-2">Dentist</span>
                                    <div className="faded">
                                        <p>I have specialization in {randomUserFemale4?.specialization} and I have {randomUserFemale2?.experienceLevel} years of experience.</p>
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
            <UserFooter />
        </div>
    )
}

export default Doctor
