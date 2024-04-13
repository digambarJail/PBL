import React, { useEffect, useState } from "react";
import './contacts.css'
import linkedinLogo from './images/icons8-linkedin.svg';
import gmaillogo from './images/icons8-gmail.svg';
import digambar from '../images/digambar.png';
import aarya from '../images/aarya.png'
import prathamesh from '../images/prathamesh.jpeg'
import nikunj from '../images/nikunj.jpg'

const ContactUs = () => {

    return (
        <div className="bg-white dark:bg-[#121212] pt-[100px] pb-20">
            <h1 className="text-5xl font-[bold] text-black dark:text-[rgba(255,255,255,0.7)] text-center mb-[30px]">Our Team</h1>
        <div className="flex flex-wrap justify-center gap-5 pb-5"> {/* Apply a container class */}
            <div className="bg-slate-100 dark:bg-[#1a1a1a]  shadow-[0_8px_16px_rgba(0,0,0,0.5)] flex flex-col items-center w-[300px] relative p-5 rounded-[10px]">
                {<img src={prathamesh} alt="User 1" className="w-[120px] h-[120px] object-cover mb-5 rounded-[50%] border-[3px] border-solid border-[#333]" />}
                <p className="text-xl font-semibold">Prathamesh Khanna</p>
                <p>PICT Pune</p>
                <p>IT Dept</p>
                <a href="https://www.linkedin.com/in/prathamesh-khanna-1ba320258/" target="_blank" rel="noopener noreferrer">
                    <img src={linkedinLogo} alt="LinkedIn" className="linkedin-icon mt-4 absolute ml-5" style={{ width: '35px', height: '35px' }} />
                </a>
                <a href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=prathameshkhanna@gmail.com" target="_blank" rel="noopener noreferrer">
                    <img src={gmaillogo} alt="LinkedIn" className="gmail-icon mt-4 mr-20" style={{ width: '35px', height: '35px' }} />
                </a>
            </div>
            <div className="bg-slate-100 dark:bg-[#1a1a1a]  shadow-[0_8px_16px_rgba(0,0,0,0.5)] flex flex-col items-center w-[300px] relative p-5 rounded-[10px]">
                {<img src={digambar} alt="User 2" className="w-[120px] h-[120px] object-cover mb-5 rounded-[50%] border-[3px] border-solid border-[#333]" />}
                <p className="text-xl font-semibold ">Digambar Jail</p>
                <p>PICT Pune</p>
                <p>IT Dept</p>
                <a href="https://www.linkedin.com/in/digambar-jail-114b20254/" target="_blank" rel="noopener noreferrer">
                    <img src={linkedinLogo} alt="LinkedIn" className="linkedin-icon absolute mt-4 ml-5" style={{ width: '35px', height: '35px' }} />
                </a>
                <a href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=ddjail2004@gmail.com" target="_blank" rel="noopener noreferrer">
                    <img src={gmaillogo} alt="LinkedIn" className="linkedin-icon mr-16 mt-4" style={{ width: '35px', height: '35px' }} />
                </a>
            </div>
            <div className="bg-slate-100 dark:bg-[#1a1a1a]  shadow-[0_8px_16px_rgba(0,0,0,0.5)] flex flex-col items-center w-[300px] relative p-5 rounded-[10px]">
                {<img src={nikunj} alt="User 3" className="w-[120px] h-[120px] object-cover mb-5 rounded-[50%] border-[3px] border-solid border-[#333]" />}
                <p className="text-xl font-semibold ">Nikunj Kadu</p>
                <p>PICT Pune</p>
                <p>IT Dept</p>
                <a href="https://www.linkedin.com/in/nikunj-kadu-45a3b7292/" target="_blank" rel="noopener noreferrer">
                    <img src={linkedinLogo} alt="LinkedIn" className="linkedin-icon absolute mt-4 ml-5" style={{ width: '35px', height: '35px' }} />
                </a>
                <a href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=nikunjkadu19@gmail.com" target="_blank" rel="noopener noreferrer">
                    <img src={gmaillogo} alt="LinkedIn" className="linkedin-icon mr-16 mt-4" style={{ width: '35px', height: '35px' }} />
                </a>
            </div>
            <div className="bg-slate-100 dark:bg-[#1a1a1a]  shadow-[0_8px_16px_rgba(0,0,0,0.5)] flex flex-col items-center w-[300px] relative p-5 rounded-[10px]">
                {<img src={aarya} alt="User 4" className="w-[120px] h-[120px] object-cover mb-5 rounded-[50%] border-[3px] border-solid border-[#333]" />}
                <p className="text-xl font-semibold ">Aarya Joshi</p>
                <p>PICT Pune</p>
                <p>IT Dept</p>
                <a href="https://www.linkedin.com/in/aarya-joshi-4912b2293/" target="_blank" rel="noopener noreferrer">
                    <img src={linkedinLogo} alt="LinkedIn" className="linkedin-icon absolute mt-4 ml-5" style={{ width: '35px', height: '35px' }} />
                </a>
                <a href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=ajoshi652004@gmail.com" target="_blank" rel="noopener noreferrer">
                    <img src={gmaillogo} alt="LinkedIn" className="linkedin-icon mr-16 mt-4" style={{ width: '35px', height: '35px' }} />
                </a>
            </div>
        </div>
        </div>
    );
};

export default ContactUs;
