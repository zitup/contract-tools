const { ethers } = require('ethers');
const contractABI = require('../abi/EventEmitter.json');
const orderHandlerABI = require('../abi/OrderHandler.json');

// 连接到以太坊节点，这里以Infura为例
const provider = new ethers.JsonRpcProvider('https://arbitrum-mainnet.infura.io/v3/cf48757c6361405d8095527d8ec9ad3d');

// 合约地址
const contractAddress = '0xC8ee91A54287DB53897056e12D9819156D3822Fb';

// 创建合约实例
const contract = new ethers.Contract(contractAddress, contractABI, provider);

// 你想要过滤的事件哈希值
const eventHash = '0x137a44067c8961cd7e1d876f4754a5a3a75989b4552f1843fc69c3b372def160';
const eventNameHash = '0x41c7b30afab659d385f1996d0addfa6e647694862e72378d0b43773f556cbeb2'

const filter = {
    topics: [eventHash, eventNameHash],
};

const orderHandlerAbi = new ethers.Interface(orderHandlerABI);

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getPastEvents() {
    try {
        // 获取合约的所有历史事件
        const events = await contract.queryFilter([eventHash, eventNameHash], 194978446, 195001438);
        console.log('events count', events.length);
        
        const transactionHashes = Array.from(new Set(events.map(event => event.transactionHash)));
        console.log('transactionHashes count', transactionHashes.length)
        
        const requests = transactionHashes.map((hash, index) => async () => {
          const inputData = await provider.getTransaction(hash);
          console.log('getTransaction', hash, index);
          if (inputData.data.includes('0x943a6f4a')) {
              const data = orderHandlerAbi.parseTransaction({data: inputData.data});
              if (data.args[1][data.args[1].length - 3].length > 0) {
                console.log('hash', `https://arbiscan.io/tx/${hash}`)
              }
              return data;
          }
          return undefined;
        });
        for (const request of requests) {
            await delay(200);
            await request();
        }
        // console.log(result[0].args[1][result[0].args[1].length - 3]);
        // console.log(new Set(events.map(event => `https://arbiscan.io/tx/${event.transactionHash}`)));
    } catch (error) {
        console.error(error);
    }
}

getPastEvents();
