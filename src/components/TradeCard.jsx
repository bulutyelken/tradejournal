import { useEffect, useState } from "react";
import { GoDiffAdded } from "react-icons/go";
import $ from "jquery";
import { v4 as uuid } from "uuid";
import Traderow from "./Traderow";


function TradeCard({ add }) {
    const [pairs, setPairs] = useState([])
    useEffect(() => {
        fetch("https://api.binance.com/api/v3/exchangeInfo")
        .then(response => response.json())
        .then(data => setPairs(data.symbols.map(item => item.symbol)));       
    }, []);
    console.log(pairs)
    
    //ilk ziyaret edişte tetiklenir
    if(!localStorage.getItem('trades')){
        const btc =[
            {
            id:0,
            status:1,
            date:"09.06.2022",
            parity:"BTCUSDTPERP",
            entry:27500,
            exit:30000,
            rrRatio:5,
            side:1,
            returnCash:50,
            returnPercent:5,
            setups:["LIQUIDITY","WYCKOFF","FIBONACCI"],
            risk:"1R",
            ss:"https://www.tradingview.com/x/ewxK5QuG/"
        },
        {
            id:1,
            status:1,
            date:"10.06.2022",
            parity:"BTCUSDTPERP",
            entry:16627,
            exit:17000,
            rrRatio:4,
            side:0,
            returnCash:40,
            returnPercent:4,
            setups:["OTE","WYCKOFF","3BOX SETUP"],
            risk:"1R",
            ss:"https://www.tradingview.com/x/m5amBfbf/"
        },
        {
            id:2,
            status:0,
            date:"10.06.2022",
            parity:"BTCUSDTPERP",
            entry:16778,
            exit:16671,
            rrRatio:2,
            side:1,
            returnCash:20,
            returnPercent:2,
            setups:["3BOX SETUP"],
            risk:"1R",
            ss:"https://www.tradingview.com/x/lN5mNGe2/"
        },
        {
            id:3,
            status:1,
            date:"10.06.2022",
            parity:"ETHUSD",
            entry:1543,
            exit:1947,
            rrRatio:3.85,
            side:1,
            returnCash:42,
            returnPercent:4.1,
            setups:["LIQUIDITY","ORDERBLOCK"],
            risk:"1R",
            ss:"https://www.tradingview.com/x/jltaxg2z/"
        }
        ]
        localStorage.setItem('trades',JSON.stringify(btc));
    }

    var setupsSplitted;
    const [trades, setTrades] = useState(
    JSON.parse(localStorage.getItem("trades"))
    );

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("trades"));
        if (items) {
            setTrades(items);
        }
    }, []);

    const handleParityChange =  (e) => {
        //console.log(e.target.value)
        //console.log(document.querySelector('#inputParity'))
        
        var datalist = document.querySelector('#parities')
        datalist.innerHTML = '';
        var parities = pairs.filter(name => name.includes(e.target.value.toUpperCase()))

        const firstFiveParities = parities.slice(0, 5);

        
        //console.log(firstFiveParities)
        firstFiveParities.forEach(element => {
            var option = document.createElement('option');
            option.value = element
            datalist.appendChild(option)
            
        });
        // for(let i=0; i<5; i++){
        //     const element = document.createElement('option');
        //     element.value = parity
        // }
    };

    function removeTrade(id) {
        console.log(id + " removed");
        setTrades((prevItems) => {
            return prevItems.filter((item) => {
                return item.id !== id;
            });
        });
    }
    function addTrade() {
        let rawDate = document.getElementById("date").value; 
        let tarih = rawDate.split("-").reverse().join(".");
        var setups = $("#setup").val().toUpperCase();
        setupsSplitted =  setups.split(",");

        var newTrade = {
            id: uuid(),
            status: $("#status").val().toLowerCase() === "win" ? 1 : 0,
            date: tarih,
            parity: $("#parity").val(),
            entry: $("#entry").val(),
            exit: $("#exit").val(),
            rrRatio: $("#rr").val(),
            side: $("#side").val().toLowerCase() === "long" ? 1 : 0,
            returnCash: parseFloat(($("#returncash").val())),
            returnPercent: $("#returnpercent").val(),
            setups: setupsSplitted,
            risk: $("#risk").val().toUpperCase(),
            ss: $("#ss").val(),
        };
        setTrades([...trades, newTrade]);
        clearInputs();

    }

    useEffect(() => {
        localStorage.setItem("trades", JSON.stringify(trades));
    }, [trades]);

    //islem eklerken status seciminde renk degisimi
    function selectChanged(){
        var x = document.getElementById("status").value
        if(x === "win"){
            $("#status").css({
                        'background-color' : '#95CD41',
                        'color' : 'white'
                        });
        }
        else if(x === "loss"){
            $("#status").css({
                        'background-color' : '#FD6C8F',
                        'color' : 'white'
                        });
        }
        else{
            $("#status").css({
                        'background-color' : '#CBD5E1',
                        'color' : 'black'
                        });
        }

    }
    function clearInputs(){
        $("#status").val('STATUS')
        $("#status").css({
            "background-color":"#CBD5E1",
            "color":"black"
        })
        
        $("#date").val('')
        $("#parity").val('')
        $("#entry").val('')
        $("#exit").val('')
        $("#rr").val('')
        $("#side").val('')
        $("#returncash").val('')
        $("#returnpercent").val('')
        $("#setup").val('')
        $("#risk").val('')
        $("#ss").val('')
    }

    return (
        <div className="px-4 h-full">
            <div className="bg-back pt-20 pb-4">
                <table className="w-full bg-trade table-auto">
                    <tr>
                        <th>STATUS</th>
                        <th>DATE</th>
                        <th>PARITY</th>
                        <th>ENTRY</th>
                        <th>EXIT</th>
                        <th>RR Ratio</th>
                        <th>SIDE</th>
                        <th>RETURN$</th>
                        <th>RETURN%</th>
                        <th className="w-[194px]">SETUPS</th>
                        <th>RISK</th>
                        <th>SCREENSHOT</th>
                        <th> </th>
                    </tr>
                    {add && (
                    <tr className="h-10">
                        <td className="w-[92px]">
                            <select name="status" id="status" className="w-full text-center h-full bg-slate-300" onChange={selectChanged}>
                                <option>STATUS</option>
                                <option value="loss">LOSS</option>
                                <option value="win">WIN</option>
                            </select>
                        </td>
                        <td className="w-[119px]"><input type="date" name="date" id="date" className="w-28"/></td>
                        <td className="w-[166px]" onChange={handleParityChange} id="inputParity">
                            <input list="parities" type="text" name="parity" id="parity" className="w-[90%]" placeholder=" parity" />
                            <datalist id="parities">

                            </datalist>
                        </td>
                        <td className="w-[80px]"><input type="number" name="entry" id="entry" className="w-[90%]" placeholder=" entry"/></td>
                        <td className="w-[87px]"><input type="number" name="exit" id="exit" className="w-[90%]" placeholder=" exit" /></td>
                        <td className="w-[102px]"><input type="number" name="rr" id="rr" className="w-[90%]" placeholder=" rr" /></td>
                        <td className="w-[131px]">
                            {/* <input type="text" name="side" id="side" className="w-[90%]" placeholder=" side"/> */}
                            <select name="side" id="side" className="w-[90%] h-[34px]" placeholder="side">
                                <option>SIDE</option>
                                <option value="long">LONG</option>
                                <option value="short">SHORT</option>
                            </select>
                        </td>
                        <td className="w-[115px]"><input type="number" name="returncash" id="returncash" className="w-[90%]" placeholder=" return $" /></td>
                        <td className="w-[122px]"><input type="number" name="returnpercent" id="returnpercent" className="w-[90%]" placeholder=" return %" /></td>
                        <td className="w-auto"><input type="text" name="setup" id="setup" className="w-[90%]" placeholder=" setups (comma to split)"/></td>
                        <td className="w-[63px]"><input type="text" name="risk" id="risk" className="w-[90%]" placeholder=" risk" /></td>
                        <td className="w-[154px]"><input type="url" name="ss" id="ss" className="w-[90%]" placeholder=" screenshot url"/></td>
                        <td className="w-[38px] pt-2">
                            <button className="bg-white rounded" onMouseUp={addTrade}>
                                <GoDiffAdded size={20}/>
                            </button>
                        </td>
                    </tr>
                    )}
                {trades.slice(0).reverse().map((elements) => ( //slice(0).reverse() kısmı tradelerin tersten dizilmesi icin.
                    <Traderow
                        key={elements.id}
                        id={elements.id}
                        status={elements.status}
                        date={elements.date}
                        parity={elements.parity}
                        entry={elements.entry}
                        exit={elements.exit}
                        rrRatio={elements.rrRatio}
                        side={elements.side}
                        returnCash={elements.returnCash}
                        returnPercent={elements.returnPercent}
                        setups={elements.setups}
                        risk={elements.risk}
                        ss={elements.ss}
                        removeTrade={removeTrade}
                    />
                    ))}
                </table>
                
                    
                
            </div>
        </div>
    );
}

export default TradeCard;
