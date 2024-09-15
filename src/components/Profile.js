import React, { useState } from 'react';
import './Profile.css';
import AccountInformation from '../components/AccountInformation';
import PersonalInformation from '../components/PersonalInformation'
import AccountManagement from '../components/AccountManagement';
import HelpAndSupport from './HelpAndSupport';
import { useUser } from '../components/UserContextProvider';

function Profile() {
    const [activeSection, setActiveSection] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [content, setContent] = useState("");
    const user = useUser();


    const handleContent = (section) => {
        if (section == "account") {
            setContent("Account Information Box Open");
        }
        else if (section == "personal") {
            setContent("Personal Information Box Open");
        }
        else if (section == "management") {
            setContent("Account Management Box Open");
        }
        else {
            setContent("Help And Support Box Open");
        }
    }

    const handleSectionClick = (section) => {
        if (activeSection === section) {
            // Close the currently open section
            setIsVisible(false);
            setTimeout(() => {
                setActiveSection(null); // Reset active section after closing
            }, 500); // Delay should match the transition duration
        } else {
            // Close current section if any
            setIsVisible(false);
            setTimeout(() => {
                setActiveSection(section);
                handleContent(section);
                setIsVisible(true); // Open the new section after closing the old one
            }, 500); // Delay should match the transition duration
        }
    };

    return (
        <div className='profile-main-container'>
            <div className='profile-nav-list'>
                <div className='profile-picture'>
                    <img src={user.profilePic} alt='Profile' />
                </div>
                <h2>{user.firstName + " " + user.lastName}</h2>
                <div className='profiles-options'>
                    <ul>
                        <li onClick={() => handleSectionClick('account')}>AI</li>
                        <li onClick={() => handleSectionClick('personal')}>PI</li>
                        <li onClick={() => handleSectionClick('management')}>AM</li>
                        <li onClick={() => handleSectionClick('support')}>H&S</li>
                    </ul>
                </div>
            </div>
            <div className={`profile-set-and-get-area ${isVisible ? 'show' : 'hide'}`}>
                    {(activeSection=="account") && (<AccountInformation/>)}
                    {(activeSection=="personal") && (<PersonalInformation/>)}
                    {(activeSection=="management") && (<AccountManagement/>)}
                    {(activeSection=="support") && (<HelpAndSupport/>)}
            </div>
        </div>
    );
}

export default Profile;
