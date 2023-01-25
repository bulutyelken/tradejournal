import { BsFillTrashFill } from "react-icons/bs";
import {GiBullHorns,GiBearFace} from "react-icons/gi"
import { AiOutlineArrowDown} from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
import { useState } from "react";
function Traderow(props) {
    const [setupsMore,setSetupsMore] = useState(false);

    function showSetups(){
        setSetupsMore(true)
    }

    function hideSetups(){
        setSetupsMore(false)
    }
    
    return (
        <tr className="h-10">
            <td>
                {props.status
                        ? <div className="bg-win w-full h-full ortala" >WIN</div> 
                        : <div className="bg-loss w-full h-full ortala ">LOSS</div>}
            </td>
            <td>{props.date}</td>
            <td className="uppercase font-bold">{props.parity}</td>
            <td>${props.entry}</td>
            <td>${props.exit}</td>
            <td><span className="font-bold">{props.rrRatio}</span> RR</td>
            <td>
                <div className="rounded bg-transparent text-center p-2 flex items-center justify-evenly">
                        {props.side ? "LONG" : "SHORT"}
                        {props.side ? <GiBullHorns size={24} color="green" /> : <GiBearFace size={24} className="fill-red-800"/>}
                </div>
            </td>
            <td className="font-bold" style={{color: props.status ? 'green' : '#991b1b'}}>${props.returnCash}</td>
            <td style={{color: props.status ? 'green' : '#991b1b'}}>{props.status ? '+' : '-'}
                {props.returnPercent}%</td>
            <td className="bg-setup flex items-center justify-center m-0 uppercase relative w-auto" onMouseOver={showSetups} onMouseLeave={hideSetups}>
                <div className=" rounded  text-center ortala relative pl-4 py-2" >
                    <span className="font-bold">{props.setups[0]}</span>
                    <span className="text-xs">&nbsp;&nbsp;&nbsp;+{props.setups.length-1} more</span> 
                    <AiOutlineArrowDown className='m-1'/>
                </div>
                {setupsMore && 
                <div className="text-right pr-3 absolute top-11 border-b-2 border-b-black w-48  z-10 bg-setup flex-col" onMouseOver={showSetups}>
                    {props.setups.map((setup)=>(
                        <div>
                            <span>{props.setups.findIndex(setups => setups === setup)+1}-)</span>
                            <span className="ml-2">{setup}</span>
                        </div>
                    ))}
                </div>}
            </td>
            <td>{props.risk}</td>
            <td>
                <div className='ortala items-end underline'>
                        <a href={props.ss} className='overflow-hidden text-sm' target="_blank" rel='noreferrer'>Setup Image</a>
                        <BiLinkExternal size={20} className="ml-1"/>
                </div>
            </td>
            <td className='pt-2'>
                <button
                    onClick={() => {
                        props.removeTrade(props.id);
                    }}
                    
                >
                    <BsFillTrashFill size={20} className="text-slate-800" />
                </button>
            </td>
        </tr>
    );
}

export default Traderow;
