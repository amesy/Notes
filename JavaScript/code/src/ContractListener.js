import { ethers } from "ethers";

// 利用Alchemy的rpc节点连接以太坊网络
const ALCHEMY_MAINNET_URL = 'https://eth-mainnet.g.alchemy.com/v2/Alchemy_API_KEY';

// 连接MAINNET主网
const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_MAINNET_URL);

// USDT的合约地址
const contractAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7'
// 构建USDT的Transfer的ABI
const abi = [
  "event Transfer(address indexed from, address indexed to, uint value)"
];
// 生成USDT合约对象
const contractUSDT = new ethers.Contract(contractAddress, abi, provider);

const main = async () => {
    // 监听USDT合约的Transfer事件

    try{
        // 只监听一次
        console.log("\n1. 利用contract.once()，监听一次Transfer事件");
        // 注：contractUSDT.once貌似不会执行，原因未知。
        contractUSDT.once('Transfer', (from, to, value)=>{
            // 打印结果
            console.log(
                `${from} -> ${to} ${ethers.utils.formatUnits(ethers.BigNumber.from(value),6)}`
            )
        })

        // 持续监听USDT合约
        console.log("\n2. 利用contract.on()，持续监听Transfer事件");
        contractUSDT.on('Transfer', (from, to, value)=>{
            console.log(
                // 打印结果
                `${from} -> ${to} ${ethers.utils.formatUnits(ethers.BigNumber.from(value),6)}`
            )
        })

    }catch(e){
        console.log(e);
    } 
}

main()
