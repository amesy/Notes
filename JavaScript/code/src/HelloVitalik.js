// 导入ethers包, 包安装命令：npm install --save ethers
// 如果报错参考：https://stackoverflow.com/questions/58211880/uncaught-syntaxerror-cannot-use-import-statement-outside-a-module-when-import
import { ethers } from "ethers";
// playcode免费版不能安装ethers，用这条命令，需要从网络上import包（把上面这行注释掉）
// import { ethers } from "https://cdn-cors.ethers.io/lib/ethers-5.6.9.esm.min.js";

// 利用ethers默认的Provider连接以太坊网络
const provider = new ethers.getDefaultProvider();
const main = async () => {
    // 查询vitalik的ETH余额
    const balance = await provider.getBalance(`vitalik.eth`);
    // 将余额输出在console
    console.log(`ETH Balance of vitalik: ${ethers.utils.formatEther(balance)} ETH`);}
main()