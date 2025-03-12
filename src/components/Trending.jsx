import React from 'react'

const Trending = ({trends}) => {
  return (
    <div className='container  mx-auto px-10 py-10'>
        <h2>Best trend</h2>
            <ul className='flex flex-row  overflow-y-auto gap-5 -mt-10 w-full hide-scrollbar'>
            {trends.map((trend,index) => (
    <li key={trend.$id} className='min-w-[230px] flex flex-row items-center'>
        <p className='fancy-text mt-[22px] text-nowrap'>{index+1}</p>
        <img className='w-[127px] h-[163px] rounded-lg object-cover -ml-3.5' src={trend.img_path} alt="" />
    </li>
))}

            </ul>
    </div>
  )
}

export default Trending