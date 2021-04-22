import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import Landing from "./containers/Landing/Landing";
import Gallery from "./containers/Gallery/Gallery";
import './App.css'

const App = () => {
    return (
        <div className={'container'}>
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <Landing/>
                    </Route>
                    <Route path="/gallery">
                        <Gallery/>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App
