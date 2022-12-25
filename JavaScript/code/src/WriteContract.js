import { ethers } from "ethers";

// 利用Alchemy的rpc节点连接以太坊网络
const ALCHEMY_GOERLI_URL = 'https://eth-goerli.g.alchemy.com/v2/Alchemy_API_KEY';

// 连接Goerli测试网
const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_GOERLI_URL);

// 利用私钥和provider创建wallet对象
// 私钥查询：metamask钱包 -> 账户详情 -> 导出私钥
const privateKey = 'xxxxxx'
const wallet = new ethers.Wallet(privateKey, provider)

// WETH的ABI
const abiWETH = [
    "function balanceOf(address) public view returns(uint)",
    "function deposit() public payable",
    "function transfer(address, uint) public returns (bool)",
    "function withdraw(uint) public ",
];

// WETH合约地址（Goerli测试网）
const addressWETH = '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6' // WETH Contract

// 声明可写合约
// signer是wallet对象。注意，这里需要提供signer，而在声明可读合约时你只需要提供provider。
const contractWETH = new ethers.Contract(addressWETH, abiWETH, wallet)
// 也可以声明一个只读合约，再用connect(wallet)函数转换成可写合约。
// const contractWETH = new ethers.Contract(addressWETH, abiWETH, provider)
// contractWETH.connect(wallet)

const main = async () => {
    // 获取钱包地址
    const address = await wallet.getAddress()
    console.log(`\n0. 我的钱包地址：${address}`);
    // 1. 读取WETH合约的链上信息（WETH abi）
    console.log("\n1. 读取WETH余额")
    const balanceWETH = await contractWETH.balanceOf(address)
    console.log(`存款前WETH持仓: ${ethers.utils.formatEther(balanceWETH)}`)
    // 读取钱包内ETH余额
    const balanceETH = await wallet.getBalance();
    console.log(`\n2. 我的钱包内ETH余额: ${balanceETH}`);  // 2_000_000_000_000_000_000

    // 如果钱包ETH足够
    if(ethers.utils.formatEther(balanceETH) > 0.0015){
        // 3. 调用desposit()函数，将0.001 ETH转为WETH
        console.log("\n3. 调用desposit()函数，存入0.001 ETH")
        // 发起交易
        const tx = await contractWETH.deposit({value: ethers.utils.parseEther("0.001")})
        // 等待交易上链
        await tx.wait()
        console.log(`交易详情：`)
        console.log(tx)
        const balanceWETH_deposit = await contractWETH.balanceOf(address)
        console.log(`存款后WETH持仓: ${ethers.utils.formatEther(balanceWETH_deposit)}\n`)

        // 4. 调用transfer()函数，将0.001 WETH转账给 vitalik
        console.log("\n4. 调用transfer()函数，给vitalik转账0.001 WETH")
        // 发起交易
        const tx2 = await contractWETH.transfer("vitalik.eth", ethers.utils.parseEther("0.001"))
        // 等待交易上链
        await tx2.wait();
        const balanceWETH_transfer = await contractWETH.balanceOf(address);
        console.log(`转账后WETH持仓: ${ethers.utils.formatEther(balanceWETH_transfer)}\n`);
    }else{
        // 如果ETH不足
        console.log("ETH不足,请先去获取一些Goerli ETH");
    }
}

main();
