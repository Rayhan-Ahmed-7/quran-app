import React, { useContext, useEffect, useState } from 'react';
import { categoryContext } from '../../App';
import boyImg from '../../images/muslim.jpg';

const SideNav = ({setContentDua}) => {
    const [categories, subCtegories, allDuas] = useContext(categoryContext);
    const [duas,setDuas] = useState([]);
    // console.log(subCtegories);
    //console.log(allDuas)

    //set duas for each categories

    function handleCategorie(id) {
        let duas = [];
        allDuas.forEach(dua=> {
            dua.result.forEach(d => {
                if(d.cat_id == id){
                    duas.push(d);
                    
                }
            });
        });
        //console.log(duas)
        setContentDua(duas);
        setOpenDuas(openDuas == id ? 'undefined' : id);
    };
    

    function handleDuas(e, id) {
        e.stopPropagation();
        console.log(id)
        let duas = [];
        allDuas.forEach(dua=> {
            dua.result.forEach(d => {
                if(d.subcat_id == id){
                    console.log(d);
                    duas.push(d);
                }
            });
        });
        setDuas(duas);
        setOpenDuas(openDuas == id ? 'undefined' : id);
    }
    const [openSub, setOpenSub] = useState();
    const [openDuas, setOpenDuas] = useState();

    return (
        <div className='col-span-1 bg-white rounded-md h-[80vh] overflow-hidden'>
            <div className='flex justify-center items-center p-4 bg-green-500 text-white'>
                <p>Categories</p>
            </div>
            <div className='container p-3 h-full pb-14 overflow-y-scroll scrollbar'>
                {
                    categories?.map((cat,index) => <div
                        key={index}
                        className='categories p-3 rounded-md hover:bg-slate-100 mb-3'>
                        <div className='categorie flex' onClick={() => {
                            setOpenSub(openSub == cat.id ? 'undefined' : cat.id);
                            handleCategorie(cat?.cat_id);
                            console.log(cat);
                        }} >
                            <div className='pr-3'>
                                <img className='w-14 rounded-md' src={boyImg} />
                            </div>
                            <div>
                                <p className='font-p font-semibold'>{cat.cat_name_en
                                }</p>
                                <p className='font-i font-medium'>{`subcategory: ${cat.no_of_subcat}`}</p>
                            </div>
                            <div className='ml-auto'>
                                <p className='font-p font-semibold text-center'>{cat.no_of_dua}</p>
                                <p>Duas</p>
                            </div>
                        </div>
                        <div className={`${cat.id == openSub ? 'h-Transition-Open' : 'h-Transition-Close'} scrollbar overflow-scroll px-1`}>
                            {subCtegories?.map((sub, index) => {
                                if (cat.cat_id == sub.cat_id) {
                                    
                                    return (
                                        <li key={index} className=' ml-4 font-p font-normal my-4 list-none text-sm '>
                                            <p onClick={(e) => handleDuas(e, sub?.subcat_id)} className='subCat cursor-pointer'>{sub.subcat_name_en}</p>
                                            <ul className={`ml-4 ${sub.subcat_id == openDuas ? 'h-Transition-Open' : 'h-Transition-Close'}  scrollbar overflow-scroll`}>
                                                {
                                                    duas?.map((d,index)=><li key={index} className='my-2 text-gray-800 cursor-pointer'>{d.dua_id}. <a href={`#${d.id}`}>{d.dua_name_en}</a></li>)
                                                }
                                            </ul>
                                        </li>
                                    )
                                }
                            })}
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default SideNav;