import React, { useEffect } from 'react'
import { FaBorderAll, FaCalendarTimes } from 'react-icons/fa'
import { MdDoneAll, MdOutlinePendingActions } from 'react-icons/md'
import { RiLayoutVerticalLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'

const Card = () => {

  const list = useSelector((state) => state.NewTask.value.length)
  const  pending = useSelector((state) => state.NewTask.value.filter((task) => task.status === "Pending"));
  const completed = useSelector((state) => state.NewTask.value.filter((task) => task.status === "Completed"));
  const overdue = useSelector((state) => state.NewTask.value.filter((task) => task.status === "Overdue"));

  useEffect(() => {
    console.log(list);
  }, [list]);
  
    
    const Actions = [
      {icon: <FaBorderAll />, count: `${list}`, Status: "All Task"},
      {icon: <MdOutlinePendingActions />, count: `${pending.length}`, Status: "Pending"},
      {icon: <MdDoneAll />, count: `${completed.length}`, Status: "All Completed"},
      {icon: <FaCalendarTimes />, count:  `${overdue.length}`, Status: "Overdue"},
  ]

  return (
    <div className='flex gap-4 max-lg:mr-2 h-[20vh] max-lg:ml-2 max-lg:flex-wrap max-lg:justify-between'>
      {Actions.map((action, index) => (
        <div 
          key={index} 
          className='flex flex-col justify-between max-lg:min-w-[45%] items-center text-center p-4 mt-4 bg-primaryMain rounded-lg  shadow-md w-1/4 border border-gray-700'>
          
          <div className='text-3xl text-white'>{action.icon}</div>
          <div className='font-semibold text-lg text-white mt-2 '>{action.Status}</div>
          <div className='text-2xl font-bold text-blue-600 mt-1'>{action.count}</div>
          
        </div>
      ))}
    </div>
  )
}

export default Card
