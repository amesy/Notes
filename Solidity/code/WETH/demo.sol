// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract WETH {
    ///@notice WETH, 包装以太币。**通过包装过程轻松地将以太币ETH转换为包装以太币WETH**，遵循 1:1 的比率，即除了交易手续费之外，没有额外费用。 

    string public name = "Wrapped Ether";
    string public symbol = "WETH";
    uint8 public decimals = 18;

    ///@notice 事件
    event Approval(address indexed src, address indexed delegateAds, uint256 amount);
    event Transfer(address indexed src, address indexed toAds, uint256 amount);
    event Deposit(address indexed toAds, uint256 amount);
    event Withdraw(address indexed src, uint256 amount);

    ///@notice 地址和余额的映射
    ///@dev balanceOf 存储链上所有存入以太币的用户和以太币余额的映射
    mapping(address => uint256) public balanceOf;
    ///@dev allowance 存储A地址授权B地址的额度映射
    mapping(address => mapping(address => uint256)) public allowance;

    ///@notice 存款
    function deposit() public payable {
        balanceOf[msg.sender] += msg.value ;
        emit Deposit(msg.sender, msg.value);
    }

    ///@notice 取款
    function withdraw(uint256 amount) public {
        require(balanceOf[msg.sender] >= amount);
        balanceOf[msg.sender] -= amount ;
        payable(msg.sender).transfer(amount);
        emit Withdraw(msg.sender, amount);
    }

    ///@notice 获取合约地址内的以太币余额
    function totalSupply() public view returns (uint256) {
        return address(this).balance;
    }

    ///@notice msg.sender授权A地址可以操作msg.sender的amount余额
    function approve(address delegateAds, uint256 amount) public returns (bool) {
        allowance[msg.sender][delegateAds] = amount;
        emit Approval(msg.sender, delegateAds, amount);
        return true;
    }

    ///@notice 从msg.sender往出转账
    function transfer(address toAds, uint256 amount) public returns (bool) {
        return transferFrom(msg.sender, toAds, amount);
    }

    ///@notice 从A地址往B地址划转amount
    function transferFrom(
        address src,
        address toAds,
        uint256 amount
    ) public returns (bool) {
        require(balanceOf[src] >= amount);

        if (src != msg.sender) {
            // 判断src授权给msg.sender的额度足够
            require(allowance[src][msg.sender] >= amount);
            // 处理src授权给msg.sender的额度
            allowance[src][msg.sender] -= amount;
        }

        balanceOf[src] -= amount;
        balanceOf[toAds] += amount;

        emit Transfer(src, toAds, amount);

        return true;
    }

    fallback() external payable {
        deposit();
    }

    receive() external payable {
        deposit();
    }
}
