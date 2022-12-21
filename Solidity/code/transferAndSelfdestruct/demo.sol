// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Demo {
    ///@notice 销毁合约
    ///@dev    逻辑：A、B、C三个用户，A作为合约部署者，指定B为合约Owner，同时A转账到合约，然后由合约Owner B执行销毁操作，同时将合约余额转给C

    ///@notice 记录操作到了哪一步
    ///@dev 1: A转账到合约
    ///@dev 2: A执行销毁操作
    ///@dev 3: 合约结束，查看合约金额变为0
    uint256 public count = 0;

    ///@notice 合约的Owner地址
    address public B;

    ///@notice 销毁合约时转入余额的地址
    address public C;

    ///@notice 定义事件
    ///@dev    获取事件信息
    ///@param tag: 标签
    ///@param from: 当前合约调用者
    ///@param value: 当前转入合约的金额
    ///@param data: 当前调用的data内容
    event Log(string tag, address from, uint256 value, bytes data);

    ///@notice 定义错误函数
    ///@dev    报错将执行此ERROR函数
    error ErrMsg(string msg);

    ///@notice 构造函数，手动指定合约的Owner为B
    ///@dev    为方便指定合约Owner，这里不用msg.sender
    ///@param _owner: 合约Owner
    constructor(address _owner, address _C) {
        // require: 条件不成立时抛出异常
        // require(_owner != address(0) && _C != address(0), "the address is invalid");
        if (_owner == address(0) && _C == address(0)) {
            revert ErrMsg("the address is invalid");
        }

        B = _owner;
        C = _C;
    }

    ///@notice 由合约调用者转账到合约
    ///@dev 标记count, 触发事件
    function transfer() public payable {
        count++;
        emit Log("transfer", msg.sender, msg.value, msg.data);
    }

    ///@notice 销毁合约,一切归零
    ///dev 指定由合约Owner B来执行销毁操作，并将合约余额转给C
    function selfDestruct() external {
        // require(msg.sender == B, unicode"禁止合约所有者执行销毁操作,请联系Owner");
        if (msg.sender != B) {
            revert ErrMsg(unicode"禁止合约所有者执行销毁操作,请联系Owner");
        }
        emit Log("selfDestruct", msg.sender, address(this).balance, "");
        selfdestruct(payable(C));
    }

    ///@notice 获取合约余额
    ///@dev 一个用于获取合约余额的辅助函数
    function getBAlance() external returns (uint256) {
        count++;
        return address(this).balance;
    }

    receive() external payable {
        emit Log("receive", msg.sender, msg.value, "");
    }

    fallback() external payable {
        emit Log("fallback", msg.sender, msg.value, msg.data);
    }
}

/*
    优化：
        1、require改为error，省gas
        2、加入count的判断，以此来阻止多次转账，每个合约调用者只能转入1比以太
        3、将count改为enum
        4、使用函数修改器modifier判断权限
*/
