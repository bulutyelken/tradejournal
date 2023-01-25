import {Line} from "react-chartjs-2"
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend,
} from 'chart.js';
import { useState } from "react";
import $ from "jquery";


function Account(){
    if(!localStorage.getItem('startingBalance')){
        localStorage.setItem('startingBalance',1000);
    }
    const [startingBalance,setStartingBalance] = useState(parseInt(localStorage.getItem('startingBalance')));
    // localStorage.setItem('config',JSON.stringify(accOptions));

    const [update,setUpdate] = useState(false);
    const trades = JSON.parse(localStorage.getItem('trades'))
    //const [trades,setTrades] =  useState(JSON.parse(localStorage.getItem('trades')));

    let chart = [startingBalance];
    for(let i=0; i<trades.length; i++)
    {
        if(!trades[i].status){
            chart.push(chart[chart.length-1]-trades[i].returnCash);
            continue;
        }
        chart.push(chart[chart.length-1]+trades[i].returnCash);
        
    }
    const blackColor = {
        backgroundColor: 'black',
        borderColor: 'black',
        color: 'black',
    } 
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Account',
                font: {
                    size:24,
                    color: blackColor.color,
                }
            },
        },

    };
    const labels = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    const data = {
        labels,
        datasets: [
        {
            label: 'Balance',
            data: chart,
            borderColor: '#334257',
            backgroundColor: '#334257',
            redraw: true,
        }
        ],
    };
    ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
    );
    

    function btnUpdate(){
        localStorage.setItem('startingBalance',$('#start').val())
        //window.location.reload()
        setStartingBalance(parseFloat($('#start').val()))
    }
    
    return (
        <div className="bg-back p-4">
            <div className=" flex">
                <div className="w-5/6">
                    <Line options={options} data={data} className=" bg-white rounded p-6 mr-4"/>
                </div>
                <div className="flex flex-col w-1/5">
                    <button className="bg-trade rounded p-3" onClick={()=>{setUpdate(prevValue=>!prevValue)}}>Update Starting Balance</button>
                    {update
                    ? 
                    <div className="w-full">
                        <div className="text-2xl text-slate-200 flex my-3 items-center justify-between">
                            <span>Starting Balance:</span>                          
                            <input id="start" type="number" placeholder="Balance" className="w-24 ml-2 text-black"/>
                        </div>
                        <div className="flex flex-row-reverse">
                            <button className="bg-trade mt-4 p-3 w-30 rounded " onClick={btnUpdate}>Update</button>
                        </div>
                    </div> 
                    : 
                    <div>
                        <div className="text-2xl text-slate-200 flex my-3 items-center justify-between">
                            <span>Starting Balance:</span>                          
                            <div className="bg-white text-gray-600 w-24 text-center">{JSON.parse(localStorage.getItem('startingBalance'))}</div>
                        </div>
                    </div> 
                    
                }
                    
                </div>
                
            </div>
            
        </div>
    )
}

export default Account;