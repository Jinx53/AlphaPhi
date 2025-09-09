import React, { useRef, useState, useEffect } from 'react'
import { Button, Box, Input } from '@mui/material';
import '../../styles/Shared.css';
import '../../styles/Home.css';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';

const Search = ({ items, setItems, reload}) => {
  const dispatch = useDispatch();

  const [search, setText] = useState("");
  const [original, setOriginal] = useState([]);

  function searchList(list, word) {
    if(!!!original?.length) setOriginal(list);
    else list = original;
    const checkWord = (name, word) => ((name).toLowerCase().includes((word).toLowerCase()));
    return list.filter(item => checkWord(item.name, word));
  }
  
  useEffect(() => {
    if (!search.length) {
      dispatch(reload());
    }
  }, [search]);


  let onSubmit = () => {
    if (search?.length){ 
      let newList = searchList(items, search);
      setItems([ ...newList]);
    }else dispatch(reload())
  }

  let onChange = (e) => {
    e.preventDefault();
    let newList = searchList(items, e.target.value);
    setItems([ ...newList]);
    setText(e.target.value)
  }

  return (
    <div>
      <div className="d-inline w-form">
        <label htmlFor="search" className="d-none">Search</label>
        <input value={search} onChange={onChange} type="search" className="form-input w-input" maxLength="256" name="search" placeholder="Search…" id="search" required="" />
        <button className="text-icon w-button" onClick={onSubmit}>
          <SearchIcon sx={{ fontSize: 20 }} />
        </button>
      </div>
    </div>
  )
}

export default Search;