import React, { useState, useContext } from 'react'
import GithubContext from '../../context/metart/artContext';
import AlertContext from '../../context/alert/alertContext';
const Search = () => {
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    const githubContext = useContext(GithubContext);

    const [text, setText] = useState('');
    const onChange = (e) => {
        setText(e.target.value);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if (text === '') {
            setAlert('Please enter something', 'light')
        }
        else {
            githubContext.searchAllDepartments(text);
            setText('');
        }
    }
    return (
        <div>
            <form className="form" onSubmit={onSubmit}>
                <input type="text" name="text" placeholder="serarch departments" value={text} onChange={onChange}></input>
                <input type="submit" value="search" className="btn btn-dark btn-block"></input>
            </form>
            {githubContext.departments.length > 0 && <button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>Clear</button>}
        </div>
    )
}

export default Search
