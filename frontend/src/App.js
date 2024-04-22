import "./App.css";
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'


function App() {
  const [username, setUsername] = useState('')
  const [profData, setprofData] = useState({});
  const [showCard, setShowCard] = useState(false);
  const [showNoresult, setNoresult] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [emptyMessage, setEmptyMessage] = useState(false);


  const [open, setOpen] = useState(true)

  const cancelButtonRef = useRef(null)


  const handleInput=(e)=>{

    setUsername(e.target.value)
    setShowCard(false)
    setNoresult(false)
  }


  const getProfileInfo=(username)=>{
    if (username.trim()===''){
      setEmptyMessage(true)
      return
    }

    console.log('Username:', username);
    setisLoading(true)
    fetch(`http://127.0.0.1:5000/${username}`)
      .then((res) => res.json())
      .then((data) =>{
        
        setprofData(data)
        if(data[0]){
          setisLoading(false)
          setShowCard(false);
          setNoresult(true)
          
        }else{
          setisLoading(false)
          setShowCard(true);
        }
      } 
      )
      .catch((error) => console.error('Fetch Error:', error));
    
  }
  
return <div className="App flex flex-col justify-center items-center">

<section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
  <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20"></div>
  <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
  <div className="mx-auto max-w-2xl lg:max-w-4xl">
  <h1 className="text-5xl text-gray-800">GitHub Profile Scraper</h1>
    <figure className="mt-10">
      <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
        <p>“This is a Simple Github Profile Data Scrapper using Flask And React”</p>
      </blockquote>
      <figcaption className="mt-10">
        <img className="mx-auto h-10 w-10 rounded-full" src="https://th.bing.com/th/id/R.7a864f07681f187fb572468bfc949977?rik=3fUik6Pc6xTrHQ&pid=ImgRaw&r=0" alt=""/>
      </figcaption>
    </figure>
    
   </div>
   
</section>
<div className="relative flex w-full max-w-[24rem] mb-5">
  <div className="relative h-10 w-full min-w-[200px]">
    <input type="text"
      className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
      placeholder=" " value={username} onChange={handleInput} onKeyDown={(e) => {
        if (e.key === "Enter")
            getProfileInfo(username);
        }} />
    <label
      className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
      GitHub Username
    </label>
  </div>
  <button 
    className="bg-white hover:bg-gray-100  text-gray-800 font-semibold py-1 px-2 border  border-blue-gray-200 border-t-transparent shadow"
    type="button" onClick={()=>getProfileInfo(username)}>
    GetData
  </button>
  
</div>


{
  isLoading?(
    
<div className='flex space-x-2 justify-center items-center bg-dark dark:invert mt-10'>
 	<span className='sr-only'>Loading...</span>
  	<div className='h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
	<div className='h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
	<div className='h-8 w-8 bg-white rounded-full animate-bounce'></div>
</div>
  ):null
}

  {showCard?(
  <>
  
  <div className="bg-white overflow-hidden shadow-2xl rounded-lg border mb-5 w-1/2 flex flex-col justify-center items-center">
    <div className="px-4 py-5 sm:px-6">

        <div className="mb-4">
  <img
    src={profData.image_url}
    className="h-auto max-w-full rounded-full"
    alt="" />
</div>
    </div>
    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                    Repositories
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-bold">
                {profData.repositories}
                </dd>
                <dt className="text-sm font-medium text-gray-500">
                    Stars
                </dt>
    
   
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-bold">
                {profData.stars}
                </dd>
                <dt className="text-sm font-medium text-gray-500">
                    Followers
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-bold">
                {profData.followers}
                </dd>
                <dt className="text-sm font-medium text-gray-500">
                    Following
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-bold">
                {profData.following}
                </dd>
            </div>
        </dl>
    </div>

    <div class="-m-1.5 overflow-auto">
  <div class="p-1.5 min-w-full inline-block align-middle">
    <div class="overflow-hidden">
      <div class="table border-collapse table-auto w-full divide-y divide-gray-200 ">
        <div class="table-header-group">
          <div class="table-row">

            <div class="table-cell px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">SL No</div>
            <div class="table-cell px-6 py-3  text-xs font-medium text-gray-500 uppercase text-center">Repository Name</div>
          </div>
        </div>
        <div class="table-row-group divide-y divide-gray-200 bg-white">
{profData["all_repositories"].map((data, i) => (
  <div key={i} className="table-row">
    <div className="table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-800">{i + 1}</div>
    <div className="table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-800">
      <a href={data['Repository Link']} target="_blank" rel="noopener noreferrer">{data['Repository Name']}</a>
    </div>
    <div className="table-cell px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
     
    </div>
  </div>
    ))}


        </div>
      </div>
    </div>
  </div>
</div>
</div>


  </>
)
: null}
{showNoresult ? (
        <h1>Username doesn't exist 🚫</h1>
      ) : null}

{emptyMessage ? (
  <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Invalid Action
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                         Please Provide Some Input Before Continuing
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => setOpen(false)}
                  >
                    Close
                  </button>

                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
      ) : ''}

    
 




  </div>
}

export default App;
