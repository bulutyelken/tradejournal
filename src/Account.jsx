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



function Account(){
    var accOptions = {startingBalance:200,risk:1};
    // localStorage.setItem('config',JSON.stringify(accOptions));

    const [update,setUpdate] = useState(false);
    const [config,setConfig] = useState(accOptions);


    const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top'
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
    };
    const labels = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [config.startingBalance,config.startingBalance*2,config.startingBalance*3,config.startingBalance*4,config.startingBalance*4,config.startingBalance*2,config.startingBalance*5,config.startingBalance*3,config.startingBalance*4,config.startingBalance*5],
            borderColor: 'orange',
            backgroundColor: 'orange',
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
        accOptions.startingBalance = document.getElementById("start").value;
        accOptions.risk = document.getElementById("risk").value;
        setConfig(accOptions);
        localStorage.setItem('config',JSON.stringify(config));
    }
    
    

    return (
        <div className="bg-back p-4 flex">
            <div className="w-5/6">
                <Line options={options} data={data} className=" bg-white rounded p-6 mr-4"/>
            </div>
            <div className="flex flex-col w-1/5">
                <button className="bg-trade rounded p-3" onClick={()=>{setUpdate(prevValue=>!prevValue)}}>Güncelle</button>
                {update
                ? 
                <div className="w-full">
                    <div className="text-2xl text-slate-200 flex my-3 items-center justify-between">
                        <span>Starting Balance:</span>                          
                        <input id="start" type="number" placeholder="Balance" className="w-24 ml-2 text-black"/>
                    </div>
                    <div className="text-2xl text-slate-200 flex items-center justify-between">
                        <span>Risk:</span>                          
                        <input id="risk" type="number" placeholder="Risk %" className="w-24 ml-2 text-black"/>
                    </div>
                    <button className="bg-trade mt-4 p-3 w-30 self-end" onClick={btnUpdate}>Şimdi Güncelle</button>
                </div> 
                : 
                <div>
                    <div className="text-2xl text-slate-200 flex my-3 items-center justify-between">
                        <span>Starting Balance:</span>                          
                        <div className="bg-white text-gray-600 w-24 text-center">{JSON.parse(localStorage.getItem('config')).startingBalance}</div>
                    </div>
                    <div className="text-2xl text-slate-200 flex items-center justify-between">
                        <span>Risk:</span>                          
                        <div className="bg-white text-gray-600 w-24 text-center">{JSON.parse(localStorage.getItem('config')).risk}%</div>
                    </div>
                </div> 
                
                }
                
            </div>
        </div>
    )
}

export default Account;