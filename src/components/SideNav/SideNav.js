import React, { useContext, useEffect, useState } from 'react';
import { categoryContext } from '../../App';
import boyImg from '../../images/muslim.jpg';

const SideNav = ({setContent}) => {
    const [categories, subCtegories] = useContext(categoryContext);
    const [duas, setDuas] = useState([]);

    async function handleDuas(e, sub) {
        e.stopPropagation();
        await fetch(`https://dua-backend.herokuapp.com/dua-main/dua/${sub.id}`)
            .then(res => res.json())
            .then(result => {
                setDuas(result.result)
            });
        setOpenDuas(openDuas == sub.id ? 'undefined' : sub.id);
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
                    categories?.map(cat => <div key={cat?.id} onClick={() => {
                        setOpenSub(openSub == cat.id ? 'undefined' : cat.id);
                        setContent(cat.id);
                    }} 
                    className='categories p-3 rounded-md hover:bg-slate-100 mb-3'>
                        <div className='categorie flex'>
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
                                        <li key={sub?.id} className=' ml-4 font-p font-semibold my-4 list-none text-sm' onClick={(e) => handleDuas(e, sub)}>
                                            <p className='subCat'>{sub.subcat_name_en}</p>
                                            <ul className={`ml-4 ${sub.id == openDuas ? 'h-Transition-Open' : 'h-Transition-Close'}`}>
                                                {
                                                    duas?.map(dua => (
                                                        <li className='my-2'><a href={`#${dua.id}`}>{dua.dua_name_en}</a></li>
                                                    ))
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