import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import axios from 'axios';

import HeaderSelect from './HeaderSelect';

import authActions from '../redux/actions/authActions'

const Header = (props) => {
    const { setData, data } = props
    const query = 'https://my-json-server.typicode.com/improvein/dev-challenge/bands'
    const [dataOriginal, setDataOriginal] = useState([])
    const [selectFilter, setSelectFilter] = useState('')
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const response = await axios.get(query)
        setDataOriginal(response.data)
        setData(response.data)
    }

    const filterBands = (character) => {
        const bands = selectFilter ? [...data] : [...dataOriginal]
        setData( bands.filter(band => band.name.toLowerCase().indexOf(character.trim().toLowerCase()) === 0 ))
        if(selectFilter && !character){
            handleData(selectFilter)
        }
    }

    const handleData = (value) => {
        let array = [...dataOriginal]
        setSelectFilter(value)
        switch (value) {
            case 'all': 
                setData(array)
                break;
            case 'post1990': 
                setData(array.filter(band => band.year >= 1990))
                break;
            case 'pre1990':
                setData(array.filter(band => band.year < 1990))
                break;
            case 'olderToNewer':
                setData(array.sort((a, b) => a.year - b.year))
                break;
            case 'newerToOlder': 
                setData(array.sort((a, b) => b.year - a.year))
                break;
            default:
                break;
        }
    }

    return (
        <div className="header">
            <div className="innerHeaderContainer">
                <div className="logo">Improve-Bands</div>

                <TextField id="filled-basic" onChange={(e)=> filterBands(e.target.value)} label="Find your favourite band" variant="filled" color="primary" className="inputSearch"/>

                <HeaderSelect handleData = { handleData }/>
                <span className="btnLogout" onClick={props.logOutUser}>Logout</span>
            </div>            
        </div>
    )
}
  
const mapDispatchToProps = {
    logOutUser: authActions.logOutUser
}

  
export default connect(null, mapDispatchToProps)(Header);