import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {searchDrugs , getSpellingSuggestions } from '../api';

function Searchpage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState('');
    const history= useHistory();

    const handleSearch = async () => {
        try {
            setError('');
            const { data } = await searchDrugs(query);
            if (data.drugGroup.conceptGroup){
                setResults(data.drugGroup.conceptGroup.flatMap(group => group.conceptProperties |[] ));
            }else {
                const suggestionResponse = await getSpellingSuggestions(query);
                setSuggestions(suggestionResponse.data.suggestionGroup.suggestionList.suggestion || []);
                if (suggestions.length === 0) setError('No result found');
            }
        } catch(err){
            setError('An error occurred while searching');
        }
    };

    return (
        <div>
            <h1> Search Drugs</h1>
            <input 
                type = "text"
                value={query}
                onChange={(e)} => setQuery(e.target.value)} 
                onKeyPress = {(e) => e.key === 'Enter' && handleSearch()}
            />
         <button  onClick = {handleSearch}>Search</button>
         {error && <p> {error} </p>}
         <ul>
            {results.map(result => (
                <li key={result.rxcui} onClick={() => history.push('/drugs/${result.name}')}>
                    {result.name}
                </li>
            ))}
          </ul> 
          <ul>
            {suggestions.map(suggestion => (
                <li key={suggestion} onClick={() => setQuery(suggestion)}>
                    {suggestion}
                </li>
            ))}
            </ul>
        </div>
    );
}


 export default Searchpage;
