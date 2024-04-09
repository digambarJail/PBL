import React, { useEffect, useState } from "react";
import './contacts.css'
import linkedinLogo from './images/icons8-linkedin.svg';
import gmaillogo from './images/icons8-gmail.svg';

const ContactUs = () => {
    const [user1, setUser1] = useState({});
    const [user2, setUser2] = useState({});
    const [user3, setUser3] = useState({});
    const [user4, setUser4] = useState({});

    useEffect(() => {
        const getDetails1 = async () => {
            try {
                const url = `/api/user/65f1f14d8004f96cbd47dc4f`;
                const res = await fetch(url);
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message);
                }
                // console.log(data)
                setUser1(data.data[0]);
                console.log(user1)
            } catch (err) {
                console.log(err);
            }
        };

        const getDetails2 = async () => {
            try {
                const url = `/api/user/66137583befd265f6d516515`;
                const res = await fetch(url);
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message);
                }
                setUser2(data.data[0]);
                console.log(user2)
            } catch (err) {
                console.log(err);
            }
        };

        const getDetails3 = async () => {
            try {
                const url = `/api/user/6613762a48c7053a80577d55`;
                const res = await fetch(url);
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message);
                }
                setUser3(data.data[0]);
                console.log(user3)
            } catch (err) {
                console.log(err);
            }
        };

        const getDetails4 = async () => {
            try {
                const url = `/api/user/6612dfa3dab80ee9151c24dd`;
                const res = await fetch(url);
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message);
                }
                setUser4(data.data[0]);
                console.log(user4)
            } catch (err) {
                console.log(err);
            }
        };

        getDetails1();
        getDetails2();
        getDetails3();
        getDetails4();
    }, []);

    return (
        <div className="background-wrapper">
        <div className="user-container"> {/* Apply a container class */}
            <div className="user-info">
                {user1.profilePicture && <img src={user1.profilePicture} alt="User 1" className="user-img" />} {/* Apply class to img */}
                <p className="user-name">Prathamesh Khanna</p>
                <p>PICT Pune</p>
                <p>IT Dept</p>
                <a href="https://www.linkedin.com/in/prathamesh-khanna-1ba320258/" target="_blank" rel="noopener noreferrer">
                    <img src={linkedinLogo} alt="LinkedIn" className="linkedin-icon mt-4 absolute ml-5" style={{ width: '35px', height: '35px' }} />
                </a>
                <a href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=prathameshkhanna@gmail.com" target="_blank" rel="noopener noreferrer">
                    <img src={gmaillogo} alt="LinkedIn" className="gmail-icon mt-4 mr-20" style={{ width: '35px', height: '35px' }} />
                </a>
            </div>
            <div className="user-info">
                {user2.profilePicture && <img src={user2.profilePicture} alt="User 2" className="user-img" />}
                <p className="user-name">Digambar Jail</p>
                <p>PICT Pune</p>
                <p>IT Dept</p>
                <a href="https://www.linkedin.com/in/digambar-jail-114b20254/" target="_blank" rel="noopener noreferrer">
                    <img src={linkedinLogo} alt="LinkedIn" className="linkedin-icon absolute mt-4 ml-5" style={{ width: '35px', height: '35px' }} />
                </a>
                <a href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=ddjail2004@gmail.com" target="_blank" rel="noopener noreferrer">
                    <img src={gmaillogo} alt="LinkedIn" className="linkedin-icon mr-16 mt-4" style={{ width: '35px', height: '35px' }} />
                </a>
            </div>
            <div className="user-info">
                {user3.profilePicture && <img src={user3.profilePicture} alt="User 3" className="user-img" />}
                <p className="user-name">Nikunj Kadu</p>
                <p>PICT Pune</p>
                <p>IT Dept</p>
                <a href="https://www.linkedin.com/in/nikunj-kadu-45a3b7292/" target="_blank" rel="noopener noreferrer">
                    <img src={linkedinLogo} alt="LinkedIn" className="linkedin-icon absolute mt-4 ml-5" style={{ width: '35px', height: '35px' }} />
                </a>
                <a href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=nikunjkadu19@gmail.com" target="_blank" rel="noopener noreferrer">
                    <img src={gmaillogo} alt="LinkedIn" className="linkedin-icon mr-16 mt-4" style={{ width: '35px', height: '35px' }} />
                </a>
            </div>
            <div className="user-info">
                {user4.profilePicture && <img src={user4.profilePicture} alt="User 4" className="user-img" />}
                <p className="user-name">Aarya Joshi</p>
                <p>PICT Pune</p>
                <p>IT Dept</p>
                <a href="https://www.linkedin.com/in/aarya-joshi-4912b2293/" target="_blank" rel="noopener noreferrer">
                    <img src={linkedinLogo} alt="LinkedIn" className="linkedin-icon absolute mt-4 ml-5" style={{ width: '35px', height: '35px' }} />
                </a>
                <a href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=dethridrr@gmail.com" target="_blank" rel="noopener noreferrer">
                    <img src={gmaillogo} alt="LinkedIn" className="linkedin-icon mr-16 mt-4" style={{ width: '35px', height: '35px' }} />
                </a>
            </div>
        </div>
        </div>
    );
};

export default ContactUs;
