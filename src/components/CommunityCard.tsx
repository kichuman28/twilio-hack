
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const CommunityCard = () => {
  return (
    <div className=' outline outline-slate-500 outline-1 rounded-md py-2 flex flex-col gap-2 px-6 my-6'>
      <div className='flex items-center gap-2'>
        <img className='h-12 w-auto rounded-full' src='https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png'/>
        <p>Name</p>
      </div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias aperiam possimus officia odio omnis. Hic nihil totam quisquam deleniti placeat a tempore atque culpa corporis fugiat! Eum maxime possimus voluptas.</p>
      <img className='h-52 w-auto rounded-md' src="https://media.istockphoto.com/id/496719837/photo/motivation-fuels-the-human-engine.jpg?s=612x612&w=0&k=20&c=kz5YL7dYzmQpbRTbEafeFshJ3nSslVoJ5Hypf0uxYzI=" alt="" />
      
      <FontAwesomeIcon className="text-xl mr-auto" icon={faHeart}/>
      </div>
  )
}

export default CommunityCard