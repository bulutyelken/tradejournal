import {Link} from 'react-router-dom';

function Header({setAdd}){
    return(
        <header>
            <nav  className="bg-black items-center justify-center flex h-full">
            <div className="flex justify-around items-center w-full h-full">
                <Link  to="account" className='h-full'>
                    <button id='accBtn' className=" text-zinc-300 font-bold text-xl border-x-2 border-gray-400 h-full px-2">Account</button>
                </Link>
                <Link to="/" className='h-full'>
                    <button id="homeBtn" className=" text-zinc-300 font-bold h-full px-2 text-2xl">TraderJournal</button>
                </Link>
                <button id="addBtn" className="text-zinc-300 font-bold text-xl border-x-2 border-gray-400 h-full w-20" onMouseUp={()=>{setAdd((prevAdd) => !prevAdd)}}>Add</button>
            </div>
            </nav>
        </header>
    )
}

export default Header;