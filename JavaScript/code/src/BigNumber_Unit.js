import { ethers } from "ethers";

// 1. BigNumber
console.group('\n1. BigNumber类');

const oneGwei = ethers.BigNumber.from("1000000000"); // 从十进制字符串生成
console.log(oneGwei)
console.log(ethers.BigNumber.from("0x3b9aca00")) // 从hex字符串生成
console.log(ethers.BigNumber.from(1000000000)) // 从数字生成
// 不能从js最大的安全整数之外的数字生成BigNumber，下面代码会报错
// ethers.BigNumber.from(Number.MAX_SAFE_INTEGER);
console.log("js中最大安全整数：", Number.MAX_SAFE_INTEGER)

// 运算
console.log("加法：", oneGwei.add(1).toString())
console.log("减法：", oneGwei.sub(1).toString())
console.log("乘法：", oneGwei.mul(2).toString())
console.log("除法：", oneGwei.div(2).toString())
// 比较
console.log("是否相等：", oneGwei.eq("1000000000"))


// 2. 格式化：小单位转大单位
// 例如将wei转换为ether：formatUnits(变量, 单位)：单位填位数（数字）或指定的单位（字符串）
console.group('\n2. 格式化：小单位转大单位，formatUnits');
console.log(ethers.utils.formatUnits(oneGwei, 0));
// '1000000000'
console.log(ethers.utils.formatUnits(oneGwei, "gwei"));
// '1.0'
console.log(ethers.utils.formatUnits(oneGwei, 9));
// '1.0'
console.log(ethers.utils.formatUnits(oneGwei, "ether"));
// `0.000000001`
console.log(ethers.utils.formatUnits(1000000000, "gwei"));
// '1.0'
console.log(ethers.utils.formatEther(oneGwei));
// `0.000000001` 等同于formatUnits(value, "ether")
console.groupEnd();


// 3. 解析：大单位转小单位
// 例如将ether转换为wei：parseUnits(变量, 单位)
console.group('\n3. 解析：大单位转小单位，parseUnits');
console.log(ethers.utils.parseUnits("1.0").toString());
// { BigNumber: "1000000000000000000" }
console.log(ethers.utils.parseUnits("1.0", "ether").toString());
// { BigNumber: "1000000000000000000" }
console.log(ethers.utils.parseUnits("1.0", 18).toString());
// { BigNumber: "1000000000000000000" }
console.log(ethers.utils.parseUnits("1.0", "gwei").toString());
// { BigNumber: "1000000000" }
console.log(ethers.utils.parseUnits("1.0", 9).toString());
// { BigNumber: "1000000000" }
console.log(ethers.utils.parseEther("1.0").toString());
// { BigNumber: "1000000000000000000" } 等同于parseUnits(value, "ether")
console.groupEnd();