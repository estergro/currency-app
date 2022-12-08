import axios from "axios"
import { useSelector, useDispatch } from 'react-redux';
import { fetchDataAsync, selectData } from '../Redux/currencySlice';
import React, { useState, useEffect } from 'react'
import Loading from '../Images/loading.svg'
import { Dropdown, Line } from "UIKit"
import { fetchData } from "API/currencyApi";
//import useFetch from "../Hooks/useFetch";

const trends = [
    { id: 1, value: 'All' },
    { id: 2, value: 'Negative' },
    { id: 3, value: 'Positive' }
]

export const Currencies = () => {

    const [list, setList] = useState([]);
    const [isLoading, loading] = useState(true);
    const [selected, setSelected] = useState(2);

    //   const dispatch = useDispatch();
    //   const data = useSelector(selectData);
    //
    //   useEffect(() => {
    //       dispatch(fetchDataAsync())
    //       loading(false);
    //     }, [dispatch])

    useEffect( async() => {
        const response = await fetchData(selected - 1);
        setList(response);
        loading(false);
    }, []);

    const handleOnChange = async (id) => {
        setSelected(id);
        loading(true);

        const response = await fetchData(id - 1);
        setList(response);
        loading(false);

        //axios.get(url).then((res) => {
        //    setList(res.data);
        //    loading(false);
        //});
    }

    const renderCurrencies = () => {
        if(list.length == 0)
            return "no data";
        return list.map((currency) => {
            const styleCss = {
                color: currency.change < 0 ? 'rgba(85, 82, 82, 0.4)' : 'black'
            }
            return (
                <Line key={currency.id} style={styleCss}>        
                    <p className="currName"> <b>name: </b>{currency.name}</p>                   
                    <p className="currCurrencyCode"> <b>currencyCode:</b> {currency.currencyCode}</p>
                    <p className="currCountry"> <b>country:</b> {currency.country}</p>
                    <p className="currRate"> <b>rate: </b>{currency.rate}</p>
                    <p className="currChange"><b>change: </b>{currency.change}</p>   
                    <p className="currUnit"><b> unit:</b> {currency.unit}</p>                 
                </Line>
            )
        })
    }

    return (
        <p>
            <h1>Currencies</h1>
            <Dropdown optionlist={trends} selected={selected} def="" onChange={handleOnChange} ></Dropdown>
            <h4>{isLoading && <img alt="loading..." src={Loading}></img>}</h4>
            <p>{!isLoading && renderCurrencies()}</p>
        </p>
    )
}