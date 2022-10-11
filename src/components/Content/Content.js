import React from 'react';
import icon from '../../SVGs/duacard.svg';
import audio from '../../SVGs/audiobtn.svg';

const Content = ({ contentDua:duas, loading }) => {
    if(loading.state){
        return <div className='col-span-2 h-[80vh] overflow-y-scroll scrollbar scroll-smooth grid place-items-center'>
            {loading.message}
        </div>
    }
    return (
        <div className='col-span-2 h-[80vh] overflow-y-scroll scrollbar scroll-smooth'>
            {
                duas?.map(dua => (
                    <div id={dua.id} key={dua.id} className='p-4 bg-white rounded-md my-4'>
                        <div className='flex items-center border-b-2 pb-2'>
                            <img src={icon} />
                            <p className='pl-3 font-medium text-green-600'>{dua.dua_name_en}</p>
                        </div>
                        <p className='pt-4'>{dua.top_en}</p>
                        <p className='text-end font-a my-4'>{dua.dua_arabic}</p>
                        <div>
                            <h4 className='font-medium text-green-600'>Reference</h4>
                            <p>{dua.refference_en}</p>
                        </div>
                        <div className='flex justify-between border-t-2 pt-2'>
                            <img src={audio} />
                            <audio controls>
                                <source src={dua?.audio}></source>
                            </audio>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Content;