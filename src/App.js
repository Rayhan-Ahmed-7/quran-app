import { createContext, useEffect, useState } from "react";
import Content from "./components/Content/Content";
import SideNav from "./components/SideNav/SideNav";

export const categoryContext = createContext();

function App() {
  const [loading,setLoading] = useState({state:true,message:"Loading..."});
  const [category, setCategory] = useState();
  const [subCtegories, setSubCtegories] = useState();
  const [allDua, setAllDua] = useState([]);

  // contentDua 

  const [contentDua,setContentDua] = useState([]);

  //load category
  useEffect(() => {
    fetch('https://dua-backend.herokuapp.com/dua-main/category')
      .then(res => res.json())
      .then(result => {
        setCategory(result?.result);
      })
  }, [])
  //load sub category
  useEffect(() => {
    fetch('https://dua-backend.herokuapp.com/dua-main/sub-category')
      .then(res => res.json())
      .then(result => {
        setLoading({state:true,message:"just little..."})
        setSubCtegories(result?.result);
        //load all duas
        let duas =[];

        for (let i = 0; i < result?.result?.length; i++) {
          duas.push(fetch(`https://dua-backend.herokuapp.com/dua-main/dua/${i + 1}`));
        }

        // setTimeout(()=>console.log(duas),5000);
        setLoading({state:true,message:"Allmost..."})

        Promise.all(duas).then(response => 
            Promise.all(response.map(res=>res.json()))
          ).then(dua=>{
            setAllDua(dua);
            setLoading({state:false,message:"Done👌"});
          })
      })
  }, []);

  if(loading.state){
    return <div className="text-2xl grid place-items-center h-screen">{loading.message}</div>
  }


  return (
    <categoryContext.Provider value={[category, subCtegories,allDua]}>
      <div className="grid grid-cols-3 w-10/12 mx-auto gap-10 h-[100vh] items-center">
        <SideNav setContentDua={setContentDua}></SideNav>
        <Content contentDua={contentDua}></Content>
      </div>
    </categoryContext.Provider>
  );
}

export default App;
