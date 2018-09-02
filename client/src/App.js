import React from 'react';
import Header from './components/Header';

const App = ({ children }) => {
    return (
        <div>
            <Header/>

            <main>
                {children}
            </main>
        </div>
    )
}

export default App;