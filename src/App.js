//import logo from './logo.svg';
import './App.css';
import Profile from './Components/Profile';
//import { useState } from 'react';

//export const ProfileContext  = createContext();

function App() {
  // const data = [
  //   {
  //       id:1,
  //       imgSrc: logo,
  //       skill:"",
  //       allSkills:[]
  //   },
  //   {
  //       id:2,
  //       imgSrc: logo,
  //       skill:"",
  //       allSkills:[]
  //   },
  //   {
  //       id:3,
  //       imgSrc: logo,
  //       skill:"",
  //       allSkills:[]
  //   },
  // ]
  
  // const [avatars, setAvatars] = useState(data);

  // const updateSkill = (id, skill) => {
  //   const data = avatars.filter((item,  index) => { console.log(item.id === id) })
  //   //setAvatars[index]
  // }

  return (
    <div className="App">
      {/* <ProfileContext.Provider value={{avatars, updateSkill}}> */}
        <Profile />
      {/* </ProfileContext.Provider> */}
    </div>
  );
}

export default App;
