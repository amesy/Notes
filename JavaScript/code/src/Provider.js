import { ethers } from "ethers";

// 利用Alchemy的rpc节点连接以太坊网络
const ALCHEMY_GOERLI_URL = 'https://eth-goerli.g.alchemy.com/v2/Alchemy_API_KEY';
const ALCHEMY_MAINNET_URL = 'https://eth-mainnet.g.alchemy.com/v2/Alchemy_API_KEY';

// 连接Goerli测试网
const providerGoerli = new ethers.providers.JsonRpcProvider(ALCHEMY_GOERLI_URL);

// 连接以太坊主网
const providerETH = new ethers.providers.JsonRpcProvider(ALCHEMY_MAINNET_URL);

const main = async () => {
    // 利用provider读取链上信息

    // 1. 查询vitalik在主网和Goerli测试网的ETH余额
    console.log("1. 查询vitalik在Goerli测试网的ETH余额");
    const balanceGoerli = await providerGoerli.getBalance(`vitalik.eth`);
    // 输出Goerli测试网ETH余额
    console.log(`Goerli ETH Balance of vitalik: ${ethers.utils.formatEther(balanceGoerli)} ETH`);

    // 2. 查询provider连接到了哪条链
    console.log("\n2. 查询provider连接到了哪条链");
    const network = await providerGoerli.getNetwork();
    console.log(network);

    // 3. 查询区块高度
    console.log("\n3. 查询区块高度");
    const blocknumber = await providerGoerli.getBlockNumber();
    console.log(blocknumber);

    // 4. 查询当前gas price
    console.log("\n4. 查询当前gas price")
    const gasPrice = await providerGoerli.getGasPrice();
    console.log(gasPrice);

    // 5. 查询当前建议的gas设置
    console.log("\n5. 查询当前建议的gas设置")
    const feeData = await providerGoerli.getFeeData();
    console.log(feeData);

    // 6. 查询区块信息
    console.log("\n6. 查询区块信息")
    const block = await providerGoerli.getBlock(0);
    console.log(block);

    // 7. 给定合约地址查询合约bytecode，例子用的WETH地址
    console.log("\n7. 给定合约地址查询合约bytecode，例子用的WETH地址")
    const code = await providerETH.getCode("0xc778417e063141139fce010982780140aa0cd5ab");
    console.log(code);
}

main()