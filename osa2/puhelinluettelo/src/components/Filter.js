import React from 'react';

const Filter = ({search, handleSearchChange}) => {
    return (
        <div>
            rajaa näytettäviä <input value={search} onChange={handleSearchChange}/>
        </div>
    )
}

export default Filter