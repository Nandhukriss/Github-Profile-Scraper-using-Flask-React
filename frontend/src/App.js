import "./App.css";
import {useState} from 'react'

function App() {
  const [username, setUsername] = useState('')
  const [profData, setprofData] = useState({});
  const [showCard, setShowCard] = useState(false);
  const [showNoresult, setNoresult] = useState(false);

  const handleInput=(e)=>{

    setUsername(e.target.value)
    setShowCard(false)
    setNoresult(false)
  }


  const getProfileInfo=(username)=>{
    console.log('Username:', username);

    fetch(`http://127.0.0.1:5000/${username}`)
      .then((res) => res.json())
      .then((data) =>{
        console.log(data);
        setprofData(data)
        if(data[0]){

          setShowCard(false);
          setNoresult(true)
          
        }else{

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
  <h1 className="text-5xl text-gray-800">GitHub Profile Scrapper</h1>
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
      placeholder=" " value={username} onChange={handleInput} />
    <label
      className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
      GitHub Username
    </label>
  </div>
  <button 
    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border border-blue-gray-200 border-t-transparent shadow"
    type="button" onClick={()=>getProfileInfo(username)}>
    GetData
  </button>
</div>  

  {showCard?(<div className="bg-white overflow-hidden shadow rounded-lg border mb-5">
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
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {profData.repositories}
                </dd>
            </div>
        </dl>
    </div>
</div>): null}
{showNoresult ? (
        <h1>Username doesn't exist 🚫</h1>
      ) : null}

  </div>;
}

export default App;
