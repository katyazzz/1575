import React, {useContext, useEffect, useState, useCallback} from 'react'
import {Line} from '@reactchartjs/react-chart.js'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from '../context/AuthContext'
import {useHistory} from "react-router-dom";
import {useMessage} from '../hooks/message.hook'

export const DashboardPage = () => {
    const history = useHistory()
    const {loading, request} = useHttp()
    const message = useMessage()
    const auth = useContext(AuthContext)
    const {token} = useContext(AuthContext)
    const [graph, setGraph] = useState('')
    const [graphData, setGraphData] = useState([{data: 0}, {data: 0}, {data: 0}, {data: 0}, {data: 0}, {data: 0}, {data: 0}])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
                const graphData = await request('/api/graph/generate', 'POST', {from: graph}, {
                    Authorization: `Bearer ${auth.token}`
                })
                history.push(`/detail/${graphData.graph._id}`)
            } catch (e) {}
        }
    }

    const graphDataHandler = useCallback(async () => {
        try {
            const fetched = await request('/api/graph', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            if (fetched.length < 7) {setGraphData([{data: 0}, {data: 0}, {data: 0}, {data: 0}, {data: 0}, {data: 0}, {data: 0}])}
            else{setGraphData(fetched)}

        } catch (e) {}
    }, [token, request])

    useEffect(() => {
        graphDataHandler()
    }, [graphDataHandler])

    console.log(graphData)
    console.log(graphData.length)

    const data = {
        labels: ['1 день', '2 день', '3 день', '4 день', '5 день', '6 день', '7 день'],
        datasets: [
            {
                label: 'Вес',
                fill: false,
                backgroundColor: 'rgb(0, 0, 0)',
                borderColor: 'rgba(255, 99, 132, 1.0)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 5,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 3,
                pointRadius: 2,
                pointHitRadius: 5,
                data: [
                    { y: graphData[graphData.length - 7]['data']},
                    { y: graphData[graphData.length - 6]['data']},
                    { y: graphData[graphData.length - 5]['data']},
                    { y: graphData[graphData.length - 4]['data']},
                    { y: graphData[graphData.length - 3]['data']},
                    { y: graphData[graphData.length - 2]['data']},
                    { y: graphData[graphData.length - 1]['data']},
                ]
            },
        ],
    }

    const options = {
        maintainAspectRatio: true,
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    }
    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <h2>Вес по дням</h2>
                <Line data={data} width={2000} height={1200} redraw={false} options={options} />
                <div className="input-field">
                    <input
                        placeholder="Введите вес"
                        id="graph"
                        type="text"
                        value={graph}
                        onChange={event => setGraph(event.target.value)}
                        onKeyPress={pressHandler}
                    />
                </div>
            </div>
        </div>
    )
}