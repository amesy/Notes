使用EVM compiler 0.8.17版本重写Wrapped Ether。

WETH contract address: [点这里查看](https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)

在remix IDE上操作的详细步骤：
```
1、地址A调用deposit方法存入10个ETH到合约地址
2、调用balanceOf方法查询A存入的ETH为10
3、调用withdraw方法从合约取回1ETH到地址A
4、调用approve方法由msg.sender授权地址B可以操作合约的最大Token数量，比如为50ETH
    msg.sender：0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
    目标地址B：0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB
    50ETH：50000000000000000000
5、调用allowance方法查询由msg.sender授权给目标地址B的50ETH
6、调用transfer方法从msg.sender向目标地址C划转3个ETH (前提：msg.sender的ETH amount >= 3ETH)
    msg.sender：0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
    目标地址c：0x617F2E2fD72FD9D5503197092aC168c91465E7f2
    3ETH：3000000000000000000
7、调用transferFrom方法由msg.sender从From地址c往To地址d转账3ETH (确保转账前余额足够，且目标地址c已授权msg.sender转账权限)
    msg.sender: 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB
    From地址c: 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
    To地址d: 0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678

    步骤：
        1）调用allowance方法确认 mapping[From地址c][0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB] = 5ETH
        2）先调用transferFrom方法转 [0x5B38Da6a701c568545dCfcB03FcB875f56beddC4][0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678] = 3ETH
        3）此时调用balanceOf查看地址0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678的额度为3ETH
        4）重复步骤2，发现额度不足(3EH > (5ETH-3ETH))
        5）再次重复步骤2，将amount改为2ETH,划转成功
        6）此时重复步骤1，结果为0ETH
        7）再重复步骤3，结果为5ETH
8、调用withdraw方法取走第7步里面0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678地址的5ETH
9、调用balanceOf查看结果为0.
```
