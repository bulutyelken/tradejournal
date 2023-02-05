import {Link} from 'react-router-dom';

function Header({setAdd}){
    return(
        <header className='flex justify-around items-center w-full h-16 bg-header fixed'>
                
                    <Link  to="account" className='h-full'>
                        <button id='accBtn' className=" text-zinc-300 font-bold text-xl border-x-2 border-gray-400 h-full px-2 hover:bg-white hover:text-black hover:border-white transition-all">Account</button>
                    </Link>
                    <Link to="/" className='h-full'>
                        <button className="homeBtn ease-linear duration-700 delay-500 text-zinc-300 font-bold h-full px-2 text-3xl z-10"><span className='trdr'>Trader</span><span className='jrnl'>Journal</span></button>
                    </Link>
                    <button id="addBtn" className="text-zinc-300 font-bold text-xl border-x-2 border-gray-400 h-full w-20  hover:bg-white hover:text-black hover:border-white transition-all" onMouseUp={()=>{setAdd((prevAdd) => !prevAdd)}}>Add</button>
                
        </header>

    )
}

export default Header;