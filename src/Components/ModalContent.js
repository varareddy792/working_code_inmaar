import { useContext, Fragment, useEffect, useState } from 'react';
import logo from '../logo.svg';
//import { skills } from './store/reducers/skillsAdded';
//import { useDispatch } from 'react-redux';
import Cookies from "js-cookie";
import { Menu, Transition } from '@headlessui/react';
import { PiDotsThreeVerticalBold } from 'react-icons/pi';
//import { ProfileContext } from './App';

const ModalContent = ({ currentProfile, users, closeModal, updateProfile, setCurrentProfile }) => {
    //const { avatars, updateSkill } = useContext(ProfileContext);
    //const dispatch = useDispatch();

    const [skill, setSkill] = useState(currentProfile?.skill);
    const [rating, setRating] = useState("")

    const [skillError, setSkillError] = useState("");
    const [ratingError, setRatingError] = useState("");

    const [searchVal, setSearchVal] = useState("")

    const [selectType, setSelectType] = useState("skill");
    const [allSkills, setAllSkills] = useState(currentProfile?.allSkills ? currentProfile?.allSkills : []);
    const [isRowClicked, setIsRowClicked] = useState([]);
    const [rowObj, setRowObj] = useState({})

    const handleRowDataChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value
        setSkillError("")
        setRatingError("")
        setRowObj({ ...rowObj, [name]: value });
    }

    const handleClickEditRow = (rowId, item) => {
        isRowClicked[rowId] === undefined ? (isRowClicked[rowId] = true) : isRowClicked[rowId] = !isRowClicked[rowId];
        setIsRowClicked([...isRowClicked])
        setRowObj({ skill: item?.skill, rating: item?.rating })
        Cookies.set("rowClickId", rowId);
        Cookies.set("rowClickVal", isRowClicked[rowId]);
    }

    const handleSelectChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setSelectType(value)
        setSkill("");
        setRating("")
    }

    const handleSkillChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setSearchVal(value)
    }

    const handleAddSkill = () => {
        let data = {
            skill: "",
            rating: ""
        }
        setAllSkills([...allSkills, data]);
        setRowObj("")
    }

    const handleSave = (index) => {
        console.log(rowObj)
        if (Object.keys(rowObj)?.length === 0 || !rowObj?.skill || !rowObj?.rating) {
            if (Object.keys(rowObj)?.length === 0) {
                setSkillError("Skill is Required");
                setRatingError("Rating is Required")
            } else {
                !rowObj?.skill && setSkillError("Skill is Required")
                !rowObj?.rating && setRatingError("Rating is Required")
            }
        } else {
            setIsRowClicked([])
            let data = {
                skill: rowObj.skill,
                rating: rowObj.rating
            }
            allSkills[index] = data;
            setAllSkills([...allSkills]);
            Cookies.remove("rowClickId");
            Cookies.remove("rowClickVal");
        }
    }

    const handleRemove = (index) => {
        setIsRowClicked([])
        index === 0 ? allSkills.splice(index) : allSkills.splice(index, 1);
        setRowObj({ skill: allSkills?.[allSkills?.length - 1]?.skill, rating: allSkills?.[allSkills?.length - 1]?.rating })
        setAllSkills([...allSkills]);
        Cookies.remove("rowClickId");
        Cookies.remove("rowClickVal");
    }

    const handleApplySkill = () => {
        closeModal()
        updateProfile(currentProfile?.id, rowObj.skill, allSkills)
        //updateSkill(currentProfile?.id, skill)
        //dispatch(skills(skill))
    }

    const getFilteredList = () => {
        if (searchVal !== "") {
            return allSkills.filter((item) => selectType === "skill" ? item.skill === searchVal : item.rating === searchVal)
        } else {
            return allSkills;
        }
    }

    const getLabel = () => {
        return (Object.keys(rowObj)?.length) ? 'update' : 'apply';
    }

    return (
        <>
            <div className="bg-[#FFF] grid grid-cols-12 gap-2">
                <div className="col-start-1 col-end-4 flex justify-center items-start h-full">
                    <div className="border shadow border-[#E0E7FF] rounded-lg bg-white mt-2 px-10 py-10">
                        <div className="bg-[#FFF] rounded-full p-1">
                            <img src={logo} alt="profile" className="rounded-full w-full h-full" />
                            <div className="text-center">
                            <span>{currentProfile.skill}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative col-start-4 col-end-12">
                    <div className="">
                        <div className="border shadow border-[#E0E7FF] rounded-lg mt-2 px-10 py-10">
                            <div className=" rounded-full p-1">
                                <div className="mb-4 gap-4 w-full inline-flex">
                                    <input className="shadow-sm border rounded-xl w-full py-3 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                        type="text"
                                        name="skill"
                                        placeholder="search the skill/rating"
                                        //{...register("firstName")}
                                        value={searchVal}
                                        onChange={(e) => handleSkillChange(e)}
                                        disabled={allSkills?.length === 0}
                                        required
                                    />
                                    <select
                                        className="shadow-sm border rounded-xl w-full py-3 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                        name="skills_rating" id="skills_rating"
                                        onChange={(e) => handleSelectChange(e)}
                                    >
                                        <option value="skill">Skill</option>
                                        <option value="rating">Rating</option>
                                    </select>
                                </div>
                                <div className="">
                                    <div className="flex justify-between items-center mb-8">
                                        <div>
                                            <h1 className="font-bold">List of skills</h1>
                                        </div>
                                    </div>

                                    <div>

                                        {
                                            Object.keys(allSkills).length ?
                                                <>
                                                    <div className="bg-white rounded-xl w-full border border-[#E0E7FF]">
                                                        <table className="">
                                                            <thead>
                                                                <tr className="leading-normal border-b border-[#E0E7FF]">
                                                                    <th className="py-3 px-3 text-left">Skill</th>
                                                                    <th className="py-3 px-3 text-left">Rating</th>
                                                                    <th className="py-3 px-3 text-left">Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {allSkills?.length !== 0 ?
                                                                    getFilteredList()?.map((item, index) => {
                                                                        return (
                                                                            <>
                                                                                <tr className={allSkills?.length - 1 !== index ? "border-b-2 border-[#F1F5F9]" : ""} >
                                                                                    {isRowClicked[index] || item.skill === "" || item.rating === "" ?
                                                                                        <>
                                                                                            <td className="py-3 px-3 text-left whitespace-nowrap">
                                                                                                <input className="shadow-sm appearance-none border rounded-xl w-full py-3 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                                                                                    type="text"
                                                                                                    name="skill"
                                                                                                    placeholder="What is your skill?"
                                                                                                    value={rowObj?.skill !== "" ? rowObj?.skill : item?.skill}
                                                                                                    onChange={(e) => handleRowDataChange(e, item.id)}
                                                                                                    required
                                                                                                />
                                                                                                {skillError &&
                                                                                                    <p className="font-normal text-xs text-red-500 absolute mb-4">
                                                                                                        {skillError}
                                                                                                    </p>
                                                                                                }

                                                                                            </td>
                                                                                            <td className="py-3 px-3 text-left whitespace-nowrap">
                                                                                                <input className="shadow-sm appearance-none border rounded-xl w-full py-3 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                                                                                    type="text"
                                                                                                    name="rating"
                                                                                                    placeholder="What is the rating?"
                                                                                                    //{...register("firstName")}
                                                                                                    value={rowObj?.rating !== "" ? rowObj?.rating : item?.rating}
                                                                                                    onChange={(e) => handleRowDataChange(e, item.id)}
                                                                                                    required
                                                                                                />
                                                                                                {ratingError &&
                                                                                                    <p className="font-normal text-xs text-red-500 absolute mb-4">
                                                                                                        {ratingError}
                                                                                                    </p>
                                                                                                }
                                                                                            </td>
                                                                                            <td>
                                                                                                <div>
                                                                                                    <Menu as="div" className="relative inline-block text-left">
                                                                                                        <div>
                                                                                                            <Menu.Button className="inline-flex w-full text-[#312E81]">
                                                                                                                <PiDotsThreeVerticalBold size="2em" />
                                                                                                            </Menu.Button>
                                                                                                        </div>
                                                                                                        <Transition
                                                                                                            as={Fragment}
                                                                                                            enter="transition ease-out duration-100"
                                                                                                            enterFrom="transform opacity-0 scale-95"
                                                                                                            enterTo="transform opacity-100 scale-100"
                                                                                                            leave="transition ease-in duration-75"
                                                                                                            leaveFrom="transform opacity-100 scale-100"
                                                                                                            leaveTo="transform opacity-0 scale-95"
                                                                                                        >
                                                                                                            <Menu.Items className="absolute  top-8 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                                                                <div className="px-1 py-1 ">
                                                                                                                    <Menu.Item>
                                                                                                                        {({ active }) => (
                                                                                                                            <button
                                                                                                                                className={`${active ? 'bg-[#EEF2FF] text-black' : 'text-gray-900'
                                                                                                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                                                                                type="submit"
                                                                                                                                onClick={() => handleSave(index)}
                                                                                                                            >{getLabel()}</button>
                                                                                                                        )}
                                                                                                                    </Menu.Item>
                                                                                                                    <Menu.Item>
                                                                                                                        {({ active }) => (
                                                                                                                            <button
                                                                                                                                className={`${active ? 'bg-[#EEF2FF] text-black' : 'text-gray-900'
                                                                                                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                                                                                type="submit"
                                                                                                                                onClick={() => handleRemove(index)}
                                                                                                                            >Remove</button>
                                                                                                                        )}
                                                                                                                    </Menu.Item>
                                                                                                                </div>
                                                                                                            </Menu.Items>
                                                                                                        </Transition>
                                                                                                    </Menu>
                                                                                                </div>
                                                                                                {/* <button className="bg-indigo-600 text-base 2xl:text-lg text-white font-bold rounded-lg w-full h-8 2xl:h-14 mb-2"
                                                                                                    type="submit"
                                                                                                    onClick={() => handleSave(index)}
                                                                                                >{getLabel()}</button>
                                                                                                <button className="bg-indigo-600 text-base 2xl:text-lg text-white font-bold rounded-lg w-full h-8 2xl:h-14"
                                                                                                    type="submit"
                                                                                                    onClick={() => handleRemove(index)}
                                                                                                >Remove</button> */}
                                                                                            </td>
                                                                                        </>
                                                                                        : <>
                                                                                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                                                                                {item.skill}
                                                                                            </td>
                                                                                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                                                                                {item.rating}
                                                                                            </td>
                                                                                            <td>
                                                                                                <div>
                                                                                                    <Menu as="div" className="relative inline-block text-left">
                                                                                                        <div>
                                                                                                            <Menu.Button className="inline-flex w-full justify-center items-center text-[#312E81] m-0 p-0.5">
                                                                                                                <PiDotsThreeVerticalBold size="2em"/>
                                                                                                            </Menu.Button>
                                                                                                        </div>
                                                                                                        <Transition
                                                                                                            as={Fragment}
                                                                                                            enter="transition ease-out duration-100"
                                                                                                            enterFrom="transform opacity-0 scale-95"
                                                                                                            enterTo="transform opacity-100 scale-100"
                                                                                                            leave="transition ease-in duration-75"
                                                                                                            leaveFrom="transform opacity-100 scale-100"
                                                                                                            leaveTo="transform opacity-0 scale-95"
                                                                                                        >
                                                                                                            <Menu.Items className="absolute  top-8 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                                                                <div className="px-1 py-1 ">
                                                                                                                    <Menu.Item>
                                                                                                                        {({ active }) => (
                                                                                                                            <button
                                                                                                                                className={`${active ? 'bg-[#EEF2FF] text-black' : 'text-gray-900'
                                                                                                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                                                                                type="submit"
                                                                                                                                onClick={() => handleClickEditRow(index, item)}
                                                                                                                            >Edit</button>
                                                                                                                        )}
                                                                                                                    </Menu.Item>
                                                                                                                    <Menu.Item>
                                                                                                                        {({ active }) => (
                                                                                                                            <button
                                                                                                                                className={`${active ? 'bg-[#EEF2FF] text-black' : 'text-gray-900'
                                                                                                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                                                                                type="submit"
                                                                                                                                onClick={() => handleRemove(index)}
                                                                                                                            >Remove</button>
                                                                                                                        )}
                                                                                                                    </Menu.Item>
                                                                                                                </div>
                                                                                                            </Menu.Items>
                                                                                                        </Transition>
                                                                                                    </Menu>
                                                                                                </div>
                                                                                                {/* <button className="bg-indigo-600 text-base 2xl:text-lg text-white font-bold rounded-lg w-full h-8 2xl:h-14"
                                                                                                    type="submit"
                                                                                                    onClick={() => handleClickEditRow(index, item)}>Edit</button> */}
                                                                                            </td>
                                                                                        </>
                                                                                    }
                                                                                </tr >

                                                                            </>
                                                                        )
                                                                    })
                                                                    :
                                                                    <tr>
                                                                        <td colSpan={5} className="py-3 px-6">
                                                                            <h1 className="text-center">No record</h1>
                                                                        </td>
                                                                    </tr>
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </>
                                                : <></>
                                        }
                                    </div>
                                </div >
                            </div>
                            <div className="w-full justify-start  gap-5 inline-flex self-stretch gap-5">
                                <button name='Back' className="text-indigo-900 font-medium leading-normal tracking-tight grow shrink basis-0 h-10 px-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex cursor-pointer"
                                    onClick={() => handleAddSkill()}
                                >
                                    Add Skill
                                </button>
                            </div>
                        </div>
                        <div className="float-right flex mt-2 gap-3">
                            <button name='Back' className="text-indigo-900 font-medium leading-normal tracking-tight grow shrink basis-0 h-10 px-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex cursor-pointer"
                                onClick={() => handleApplySkill()}
                            >
                                Apply
                            </button>
                            <button name='Back' className="text-indigo-900 font-medium leading-normal tracking-tight grow shrink basis-0 h-10 px-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex cursor-pointer"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalContent;