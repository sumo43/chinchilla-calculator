import {
    Layout,
    Row,
    Col,
    InputNumber,
    Button, 
    DatePicker,
    Slider,
    Divider,
    Card,
    Menu,
    Dropdown,
    Space
 } from 'antd';

import {
    DownOutlined
} from '@ant-design/icons';

import 'antd/dist/antd.css';

import {
    Chart as ChartJS,
    LogarithmicScale,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
}
from 'chart.js';

ChartJS.register(
    LogarithmicScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend,
    Filler
);

import {
    useState,
    useRef
}  from 'react';

import img from './formula.png'

import React from 'react';

const MAX_FLOPS = 10e25
const MIN_FLOPS = 5e18

const MAX_PARAMS = 10e12 // 1 trillion
const MIN_PARAMS = 10e7 // 1 million

const MAX_TOKENS = 1e13
const MIN_TOKENS = 1e11

const chinchilla_test_flops = 
[
    6e+18,
    6e+18,
    6e+18,
    6e+18,
    1e+19,
    1e+19,
    1e+19,
    1e+19,
    3e+19,
    3e+19,
    3e+19,
    3e+19,
    1e+20,
    1e+20,
    1e+20,
    1e+20,
    3e+20,
    3e+20,
    3e+20,
    3e+20,
    6e+20,
    6e+20,
    6e+20,
    6e+20,
    1e+21,
    1e+21,
    1e+21,
    1e+21,
    3e+21,
    3e+21,
    3e+21,
    3e+21,
]

const chinchilla_test_params =
[
    70,
    150,
    300,
    600,
    105,
    300,
    1000,
    2500,
    150,
    300,
    600,
    1500,
    300,
    600,
    1000,
    1700,
    300,
    400,
    800,
    1000,
    300,
    700,
    1200,
    3000,
    600,
    1000,
    2000,
    6000,
    800,
    1500,
    2000,
    5000,
    1500,
    2000,
    6000,
    8000,
    3000,
    6000,
    9000,
    15000
]

chinchilla_test_params.forEach((value) => (value * 10000000))

console.log([{
    x: 1.5e+22,
    y: 2700000000,
    r: 2
}])


const to_scientific = (number) => {
    return number.toExponential(1)
}

const getNumber2 = (num) => {
    var units = ["M","B","T","Q"]
    var unit = Math.floor((num / 1.0e+1).toFixed(0).toString().length)
    var r = unit%3
    var x =  Math.abs(Number(num))/Number('1.0e+'+(unit-r)).toFixed(2)
    return Math.round(x) + ' ' + units[Math.floor(unit / 3) - 2]
}

const TickCallback = (val) => {
    if (val >= 1000000) {
        return getNumber2(val)
    } 
    else {
        return val
    }
}

const data = chinchilla_test_params.map((value, index) => {
    return {
        x: chinchilla_test_flops[index],
        y: value * 1000000,
        r: 2
    }
})
console.log(data)

const initial_data = {
    datasets: [
    {
    label: 'Your Model',
    data: [{
      x: 203013,
      y: 69696969,
      r: 5
    }],
    backgroundColor: 'yellow',
    border: 'black'
  },{
      label: 'GPT-3',
      data: [{
        x: 1.2e+23,
        y: 175000000000,
        r: 7
      }],
      backgroundColor: '#ff0000'
    },
    {
        label: 'Chinchilla-70B',
        data: [{
          x: 1.4e+23,
          y: 67000000000,
          r: 5 
        }],
        backgroundColor: '#f75d98'
    },
    {
        label: 'OPT-175B',
        data: [{
          x: 2.0e+22,
          y: 67000000000,
          r: 5 
        }],
        backgroundColor: '#ADD8E6'
    },
    {
        label: 'Megatron-Turing-NLG-530B',
        data: [{
            x: 1.53e+23,
            y: 530000000000,
            r: 10
        }],
        backgroundColor: '#1c62ce'
    },
    {
        label: 'GPT-J-6B',
        data: [{
            x: 1.5e+22,
            y: 6000000000,
            r: 5
        }],
        backgroundColor: '#FFC0CB'
    },
    {
        label: 'GPTNeo-2.7B',
        data: [{
            x: 6.8e+21,
            y: 2700000000,
            r: 5
        }],
        backgroundColor: '#A020F0'
    },
    {
        label: 'Chinchilla-experimental',
        data: data,
        backgroundColor: '#32CD32'
    }
  ] 
  };

const options = {
    scales: {
        x: {
            max: MAX_FLOPS,
            min: MIN_FLOPS,
            display: true,
            type: 'logarithmic',
            ticks: {
                callback: to_scientific 
            },
        },
        y: {
            max: MAX_PARAMS,
            min: MIN_PARAMS,
            display: true,
            type: 'logarithmic',
            ticks: {
                callback: TickCallback
            }
        }
    }
}



const { Header, Footer, Content }  = Layout;
import {Bar,Line,Scatter,Bubble} from 'react-chartjs-2';

const Calculator = () => {
    // flops set params and tokens (most important)
    // tokens set flops and params
    // params set flops and tokens

    const [flops, setFlops] = useState(MIN_FLOPS)
    const [parameters, setParameters] = useState(MIN_PARAMS)
    const [tokens, setTokens] = useState(MIN_TOKENS)
    const [loss, setLoss] = useState(0)
    const [data, setData] = useState(initial_data);
    // just the flops divided by the num of flops in each v100
    // but i want v100 hours, so we also divide this by 60 
    const v100_constant = 1.0909091e+18


    var A = 406.4;
    var B = 410.7;
    var E = 1.69;
    var alpha = 0.34;
    var beta = 0.28;

    var gamma = 6.5;
    var delta = 0.8547;

    const chartRef = useRef(null);

    // graph variables (eventually)
    var x = 0;
    var y = 0;

    const getNumber = (num) => {
        var units = ["M","B","T","Q"]
        var unit = Math.floor((num / 1.0e+1).toFixed(0).toString().length)
        var r = unit%3
        var x =  Math.abs(Number(num))/Number('1.0e+'+(unit-r)).toFixed(2)
        return x.toFixed(2)+ ' ' + units[Math.floor(unit / 3) - 2]
    }

    const logslider_flops = (position) => {
        // position will be between 0 and 100
        var minp = 0;
        var maxp = 100;
      
        // The result should be between 100 an 10000000
        var minv = Math.log(MIN_FLOPS);
        var maxv = Math.log(MAX_FLOPS);
      
        // calculate adjustment factor
        var scale = (maxv-minv) / (maxp-minp);
      
        return Math.exp(minv + scale*(position-minp));
    }

    const logslider_parameters = (position) => {
        // position will be between 0 and 100
        var minp = 0;
        var maxp = 100;
      
        // The result should be between 100 an 10000000
        var minv = Math.log(MIN_PARAMS);
        var maxv = Math.log(MAX_PARAMS);
      
        // calculate adjustment factor
        var scale = (maxv-minv) / (maxp-minp);
      
        return Math.exp(minv + scale*(position-minp));
    }

    const logslider_tokens = (position) => {
        // position will be between 0 and 100
        var minp = 0;
        var maxp = 100;
      
        // The result should be between 100 an 10000000
        var minv = Math.log(MIN_TOKENS);
        var maxv = Math.log(MAX_TOKENS);
      
        // calculate adjustment factor
        var scale = (maxv-minv) / (maxp-minp);
      
        return Math.exp(minv + scale*(position-minp));
    }

    const unlogslider_parameters = (number) => {
        // position will be between 0 and 100
        var minp = 0;
        var maxp = 100;
      
        // The result should be between 100 an 10000000
        var minv = Math.log(MIN_PARAMS);
        var maxv = Math.log(MAX_PARAMS);
        var scale = (maxv-minv) / (maxp-minp);
        var num = Math.round(((Math.log(number) - minv) / scale));

        return num;
    }

    const unlogslider_tokens = (number) => {
        // position will be between 0 and 100
        var minp = 0;
        var maxp = 100;
        // The result should be between 100 an 10000000
        var minv = Math.log(MIN_TOKENS);
        var maxv = Math.log(MAX_TOKENS);
        var scale = (maxv-minv) / (maxp-minp);
        var num = Math.round(((Math.log(number) - minv) / scale));

        return num;
    }

    const unlogslider_flops = (number) => {
        // position will be between 0 and 100
        var minp = 0;
        var maxp = 100;
        // The result should be between 100 an 10000000
        var minv = Math.log(MIN_FLOPS);
        var maxv = Math.log(MAX_FLOPS);
        var scale = (maxv-minv) / (maxp-minp);
        var num = Math.round(((Math.log(number) - minv) / scale));

        return num;
    }

    const params_map = [67000000000, 
    175000000000,
    530000000000]

    const tokens_map = [
        100000000,
        239000000000,
        4800000000000
    ]

    const handle_model_select = (ind) => {
        const num_params = params_map[ind]
        const flops = Math.exp(Math.log((num_params * gamma)) / 0.49)
        setFlops(flops)
        setParameters((flops ** 0.49) / gamma)
        setTokens((flops ** 0.51) / delta)

        setLoss((A / (parameters ** alpha)) + (B / (tokens ** beta)) + E)

        updateModel(flops, parameters)
    }

    const handle_token_select = (ind) => {
        const num_tokens = tokens_map[ind]
        const flops = Math.exp(Math.log((num_tokens * delta)) / 0.51)
        setFlops(flops)
        setParameters((flops ** 0.49) / gamma)
        setTokens((flops ** 0.51) / delta)
        setLoss((A / (parameters ** alpha)) + (B / (tokens ** beta)) + E)

        updateModel(flops, parameters)
    }

    const model_menu = (
        <Menu>
          <Menu.Item onClick={() => handle_model_select(0)}>Chinchilla (67B)</Menu.Item>
          <Menu.Item onClick={() => handle_model_select(1)}>GPT-3 (175B)</Menu.Item>
          <Menu.Item onClick={() => handle_model_select(2)}>Megatron-Turing NLG (530B)</Menu.Item>
        </Menu>
      );
      
    const dataset_menu = (
        <Menu>
          <Menu.Item onClick={() => handle_token_select(0)}>enwik8 (100M)</Menu.Item>
          <Menu.Item onClick={() => handle_token_select(1)}>The Pile (239B)</Menu.Item>
          <Menu.Item onClick={() => handle_token_select(2)}>MassiveText (4.8T)</Menu.Item>
        </Menu>
      );

    const to_e = (number) => {
        if (number > 999999) {
            return getNumber(number)
        }
        else {
            return Math.floor(number)
        }
        //return number.toExponential(2);
    }

    const to_scientific = (number) => {
        return number.toExponential(1)
    }

    const updateModel = (flops, parameters) => {
        console.log('updating model with')
        console.log(flops)
        console.log(parameters)
        const new_data = data;
        new_data.datasets[0].data[0].x = flops
        new_data.datasets[0].data[0].y = parameters
        setData(new_data)
        chartRef.current.update()
    }

    const onFlopsChange = (position) => {
        var value = logslider_flops(position);
        setFlops(value)
        // appr 1 because this is what chinchilla uses
        setParameters((value ** 0.49) / gamma)
        setTokens((value ** 0.51) / delta)
        setLoss((A / (parameters ** alpha)) + (B / (tokens ** beta)) + E)
        updateModel(flops, parameters)
    }

    const onParametersChange = (position) => {
        var value = logslider_parameters(position);
        const flops = Math.exp(Math.log((value * gamma)) / 0.49)
        setFlops(flops)
        setParameters((flops ** 0.49) / gamma)
        setTokens((flops ** 0.51) / delta)
        setLoss((A / (parameters ** alpha)) + (B / (tokens ** beta)) + E)
        updateModel(flops, parameters)
    }

    const onTokensChange = (position) => {
        var value = logslider_tokens(position)
        const flops = Math.exp(Math.log((value * delta)) / 0.51)
        setFlops(flops)
        setParameters((flops ** 0.49) / gamma)
        setTokens((flops ** 0.51) / delta)
        setLoss((A / (parameters ** alpha)) + (B / (tokens ** beta)) + E)
        updateModel(flops, parameters)
    }

    return (
        <>
        <Content style={{width: '800px', paddingBottom: '50px'}}>
        <Card size="large" width={100}>
            <Row>
            
                <Col border='1px solid'>
                    <h1>Chinchilla Scaling Laws Calculator</h1>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Card title="Num FLOPs" bordered={true} size='small'>
                        <Row style={{width: '100%'}}>
                        <Slider defaultValue={30} style={{width: '80%'}} value={unlogslider_flops(flops)} onChange={onFlopsChange}/>
                        <h1 style={{fontFamily: 'Courier New'}}>{to_scientific(flops)}</h1>
                        </Row>
                    </Card>
                    <Card title="Parameter Count" bordered={true} size='small'>
                        <Dropdown overlay={model_menu} arrow={true}>
                        <a onClick={e => e.preventDefault()}>
                        <Space>
                            Common models
                            <DownOutlined />
                        </Space>
                        </a>
                        </Dropdown>
                        <Row style={{width: '100%'}}>
                        <Slider defaultValue={30} style={{width: '80%'}} value={unlogslider_parameters(parameters)} onChange={onParametersChange}/>
                        <h1 style={{fontFamily: 'Courier New'}}>{to_e(parameters)}</h1>
                        </Row>
                    </Card>
                    <Card title="Num Training Tokens" bordered={true} size='small'>
                        <Dropdown overlay={dataset_menu} arrow selectable>
                        <a onClick={e => e.preventDefault()}>
                        <Space>
                            Common Datasets
                            <DownOutlined />
                        </Space>
                        </a>
                        </Dropdown>
                        <Row style={{width: '100%'}}>
                        <Slider defaultValue={30} style={{width: '80%'}} value={unlogslider_tokens(tokens)} onChange={onTokensChange}/>
                        <h1 style={{fontFamily: 'Courier New'}}>{to_e(tokens)}</h1>
                        </Row>
                    </Card>
                </Col>  
                <Col span={12}> 
                    <Card title="Chinchilla Loss and Chart" bordered={true}>
                    <h1 style={{fontFamily: 'Courier New'}}>loss: {loss.toFixed(4)}</h1>
                    <h1 style={{fontFamily: 'Courier New'}}>v100 hours: {(flops / v100_constant).toFixed(0)}</h1>
                    </Card>
                    <Bubble ref={chartRef} data={data} width={80} height={80} options={options} />
                </Col>
            </Row>
        </Card>
        <Card size="large" width={100}>
            <h1>Disclaimers</h1>
            <p>1. I used the <a href="https://arxiv.org/abs/2106.04884">Chinchilla paper from DeepMind</a>. Their results are somewhat different from <a href="https://arxiv.org/abs/2001.08361">Kaplan et al.</a></p>
            <p>2. The results can be thought of as accurate to about half an order of magnitude, as long as you use the setup from the paper. Not all models and datasets are created equal.</p>
            <p>3. I used Approach 2 from the paper.</p>
        </Card>
        <Card size="large" width={100} style={{alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
            <a href='https://github.com/artem9k'>@artem_9k</a>
        </Card>
        </Content>
     
        </>
    )
}

export default function Home() {
  return (
    <>
        <div style={{alignContent: 'center', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', paddingTop: '50px'}}>
        <Content style={{
        }}>
            <Calculator style={{
                width: '500px'
            }}/>
       </Content>
       </div>
    </>
  )
}
