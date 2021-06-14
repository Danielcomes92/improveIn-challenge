import React from 'react'
import { Select, InputLabel, MenuItem, FormControl } from '@material-ui/core';

const HeaderSelect = ({ handleData }) => {

    return (
        <div className="filtersContainer">
            <FormControl variant="filled" color="primary" className="innerFiltersContainer">
                <InputLabel id="demo-simple-select-filled-label">Sort or filter:</InputLabel>
                <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                onChange={ (e) => handleData(e.target.value) }
                >
                <MenuItem value='all'>
                    <em>All bands</em>
                </MenuItem>
                <MenuItem value='post1990'>  {`>`} 1990 bands </MenuItem>
                <MenuItem value='pre1990'> {`<`}  1990 bands </MenuItem>
                <MenuItem value='olderToNewer'> Older to newer </MenuItem>
                <MenuItem value='newerToOlder'> Newer to older </MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}
export default HeaderSelect