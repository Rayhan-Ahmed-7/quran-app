import React, { useContext, useEffect, useState } from 'react';
import { categoryContext } from '../../App';
import boyImg from '../../images/muslim.jpg';

const SideNav = ({setContentDua}) => {
    const [categories, subCtegories, allDuas] = useContext(categoryContext);
    const [duas,setDuas] = useState([]);

    //console.log(allDuas)

    //set duas for each categories

    function handleCategorie(id=7) {
        let duas = [];
        allDuas?.forEach((d,index)=>{
            if(index < id){
                duas=[...duas,...d?.result];
            }
        });
        setContentDua(duas);
        console.log(duas)
        setOpenDuas(openDuas == id ? 'undefined' : id);
    };
    

    function handleDuas(e, id) {
        e.stopPropagation();
        allDuas?.forEach((d,index)=>{
            if(index+1 == id){
                setDuas(d.result);
            }
        })
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
                    categories?.map(cat => <div
                        key={cat?.id}
                        className='categories p-3 rounded-md hover:bg-slate-100 mb-3'>
                        <div className='categorie flex' onClick={() => {
                            setOpenSub(openSub == cat.id ? 'undefined' : cat.id);
                            handleCategorie(cat?.no_of_subcat);
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
                        <div className={`${cat.id == openSub ? 'h-Transition-Open' : 'h-Transition-Close'}`}>
                            {subCtegories?.map((sub, index) => {
                                if (index < cat.no_of_subcat) {
                                    return (
                                        <li key={sub?.id} className=' ml-4 font-p font-semibold my-4 list-none text-sm'>
                                            <p onClick={(e) => handleDuas(e, sub?.id)} className='subCat'>{sub.subcat_name_en}</p>
                                            <ul className={`ml-4 ${sub.id == openDuas ? 'h-Transition-Open' : 'h-Transition-Close'}`}>
                                                {
                                                    duas.map(d=><li key={d.id} className='my-2'><a href={`#${d.id}`}>{d.dua_name_en}</a></li>)
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