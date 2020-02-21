import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TodoContextProvider from "./contexts/TodoContext";
import TodoTable from "./components/TodoTable";
import {CssBaseline} from "@material-ui/core";


class App extends Component {
    render() {
        return (
            <div>
                <TodoContextProvider>
                    <CssBaseline>
                        <TodoTable/>
                    </CssBaseline>
                </TodoContextProvider>
            </div>
    )
        ;
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));