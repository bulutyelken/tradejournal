import {BsGithub,BsLinkedin} from 'react-icons/bs'
import {SiGmail} from 'react-icons/si'

export default function Footer(){
    return (
        //flex justify-around items-center w-full h-16 bg-header fixed
            <footer className="flex w-full bottom-0 fixed bg-header h-14 text-gray-200 justify-center items-center">
                <h1 className="text-center">This website created by <a href="https://github.com/bulutyelken" rel='noreferrer' target="_blank" className="font-bold">Bulut.</a></h1>
                <div className="absolute right-6 flex flex-row gap-4 mt-1">
                    <a href='https://github.com/bulutyelken' target="_blank" rel='noreferrer'><BsGithub size={30} className="cursor-pointer" /></a>
                    <a href="mailto:bulutyelken@gmail.com">
                            <SiGmail size={30} className="cursor-pointer"/>
                    </a>
                    <a href='https://linkedin.com/in/bulutyelken' target="_blank" rel='noreferrer'><BsLinkedin size={30} className="cursor-pointer"/></a>
                </div>
            </footer>
    );
}