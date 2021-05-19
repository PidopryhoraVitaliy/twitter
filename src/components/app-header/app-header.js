import React from 'react';

import './app-header.css';

const AppHeader = ({liked, allPosts}) => {
    return (
        <div className="app-header d-flex">
            <h1>Vitaliy Pidopryhora</h1>
            <h2>{allPosts} entries, likes {liked}</h2>
        </div>
    )
};

export default AppHeader;