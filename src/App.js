import { createContext, useEffect, useState } from "react";
import Content from "./components/Content/Content";
import SideNav from "./components/SideNav/SideNav";

export const categoryContext = createContext();

function App() {
  const [category, setCategory] = useState();
  const [subCtegories, setSubCtegories] = useState();
  const [content, setContent] = useState(1);
  const [allDua, setAllDua] = useState([]);
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
        setSubCtegories(result?.result);
      })
  }, [])

  //loading all duas 

  useEffect(() => {
    async function call(){
          await fetch(`https://dua-backend.herokuapp.com/dua-main/dua/${content}`)
            .then(res => res.json())
            .then(result => {
              setAllDua(result.result);
            });
        }
    call();
  },[content])
  console.log(allDua);


  return (
    <categoryContext.Provider value={[category, subCtegories]}>
      <div className="grid grid-cols-3 w-10/12 mx-auto gap-10 h-[100vh] items-center">
        <SideNav setContent={setContent}></SideNav>
        <Content allDua={allDua}></Content>
      </div>
    </categoryContext.Provider>
  );
}

export default App;
