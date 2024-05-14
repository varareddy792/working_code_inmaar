import React, { useContext, useEffect, useState } from 'react';
import logo from '../logo.svg'
import ReactModal from './ReactModal_Backup';
import ModalContent from './ModalContent';
import { useDispatch, useSelector } from 'react-redux';
import { getApplicants } from '../store/reducers/applicantsList';
import Modal from './Modal';
//import { ProfileContext } from './App';

const data = [
    {
        id: 1,
        imgSrc: logo,
        skill: ""
    },
    {
        id: 2,
        imgSrc: logo,
        skill: ""
    },
    {
        id: 3,
        imgSrc: logo,
        skill: ""
    },
]

const Profile = () => {
    const dispatch = useDispatch();

    const [users, setUsers] = useState([]);
    const [openModel, setOpenModel] = useState(false);
    const [currentProfile, setCurrentProfile] = useState("");
    //const [userSkill, setUserSkill] = useState("")

    //const { success, skills } = useSelector((state) => state.skillsAdded);
    const { applicants } = useSelector((state) => state.applicantsList);

    useEffect(() => {
        dispatch(getApplicants())
    }, [])

    useEffect(() => {
        setUsers(data)
    }, [applicants])

    // useEffect(() => {
    //     setOpenModel(false);
    //     //setUserSkill(skills)
    // }, [success])

    const handleEdit = (item) => {
        setCurrentProfile(item)
        setOpenModel(true);
    }

    const closeModal = () => {
        setOpenModel(false)
    }

    const updateProfile = (id, skill, allSkills) => {
        users.map((item, index) => {
            if (item?.id === id) {
                users[index].skill = skill
                users[index].allSkills = [...allSkills]
            }
        })
        setUsers(users)
    }

    return (
        <>
            <div className="h-[10%] w-full"></div>
            <div className="h-[90%] bg-[#FFF] grid grid-cols-12 gap-2">
                <div className="col-start-1 col-end-4 flex flex-col justify-center items-start">
                    {users?.map((item, index) => {
                        return (
                            <div className="border shadow border-[#E0E7FF] rounded-lg bg-white m-2 p-5">
                                <div className="bg-[#FFF] rounded-full p-1">
                                    <div className="border shadow border-[#E0E7FF] rounded-lg bg-white m-2 p-5">
                                        <img src={item.imgSrc} alt="profile" className="rounded-full w-full h-full" />
                                        <button
                                            type="submit"
                                            className={"rounded-3xl bg-green-500 text-white px-5 py-1.5"}
                                            onClick={() => handleEdit(item)}
                                        >
                                            Edit Profile
                                        </button><br/>
                                        <span>{item.skill}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    )
                    }
                </div>
            </div>
            {/* {
                openModel &&
                <ReactModal
                    isModalOpen={openModel}
                    setOpenModel={setOpenModel}
                    modalBody={
                        <ModalContent
                            currentProfile={currentProfile}
                            setCurrentProfile={setCurrentProfile}
                            users={users}
                            updateProfile={updateProfile}
                            closeModal={closeModal}
                        />
                    }
                />
            } */}
            {
        openModel &&
        <div className="col-start-2 col-end-6">
          <Modal
            isOpen={openModel}
            setIsOpen={setOpenModel}
            modalBody={
                <ModalContent
                currentProfile={currentProfile}
                setCurrentProfile={setCurrentProfile}
                users={users}
                updateProfile={updateProfile}
                closeModal={closeModal}
            />
            }
          />
        </div>
      }
        </>
    )
}

export default Profile;