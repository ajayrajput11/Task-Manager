import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
  return (
    <>
      < div className="min-h-screen bg-gray-200 flex flex-col justify-between items-center text-center p-6 relative overflow-hidden rounded-lg" >
    
        <div className=" absolute top-40 left-12 w-4 h-4 bg-green-500 rounded"></div>
        <div className="absolute top-36 right-10 w-5 h-5 bg-purple-500 rounded"></div>
      
      <div className="z-10 mt-10 space-y-6">
    <div className=" w-5 h-4 bg-yellow-400 rounded"></div>

        <div className="w-5 h-5 bg-purple-500 rounded"></div>
        <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
          Convenient and <br /> productive task <br /> manager 😎
        </h1>
        <p className="text-sm text-gray-700 font-medium">
          We have created an intuitive and <br />
          convenient interface for managing tasks
        </p>
                      <div className="absolute left-52 w-5 h-4 bg-yellow-400 rounded"></div>

                <div className="top-44 right-10 w-5 h-5 bg-purple-500 rounded"></div>

      </div>
      <div className="w-5 h-4 bg-green-500 rounded"></div>

    
      <div className="z-10 mb-12 w-full max-w-xs">
              <div className="mb-44 w-5 h-4 bg-yellow-400 rounded"></div>

        <button
          onClick={() => navigate('/login')}
          className="w-full bg-black text-white py-3 rounded-full text-sm font-semibold hover:bg-orange-500 transition"
        >
          Get started
        </button>
         <div className='w-5 h-4 bg-green-500 ml-96 mb- brounded'></div>
      </div>
      </div>
    </>
  )
}

export default Home
