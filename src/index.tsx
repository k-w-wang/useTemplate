import axios from 'axios';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import "./index.less"

import { Button } from 'antd';
const App = () => {
    useEffect(() => {
        axios.get('/index/recommend.json')
            .then((res: any) => {
                console.log(res.data.list);
            })
    })
    return <div >
        <Button type="primary">hello world</Button>
    </div>;
};
ReactDOM.render(<App />, document.getElementById('root'));