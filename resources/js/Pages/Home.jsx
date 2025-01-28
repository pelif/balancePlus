import React, { useState } from 'react';
import Chart from 'react-apexcharts';


const Home = () => {

    const [options] = useState({});
    const [series] = useState([44, 55, 67, 78, 89]);
    const [labels] = useState(['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio']);


    return (
        <div className='donut'>
            <h1>Home</h1>
            <Chart options={{ ...options, labels }} series={series} type="donut" width="380" />

        </div>
    );
}

export default Home;
