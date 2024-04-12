const { createPublicClient, http } = require('viem');
const { arbitrum } = require('viem/chains');
const EventEmitterAbi = require('../abi/EventEmitter.json');

const eventLog1 = {
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "internalType": "address",
      "name": "msgSender",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "string",
      "name": "eventName",
      "type": "string"
    },
    {
      "indexed": true,
      "internalType": "string",
      "name": "eventNameHash",
      "type": "string"
    },
    {
      "indexed": true,
      "internalType": "bytes32",
      "name": "topic1",
      "type": "bytes32"
    },
    {
      "components": [
        {
          "components": [
            {
              "components": [
                { "internalType": "string", "name": "key", "type": "string" },
                {
                  "internalType": "address",
                  "name": "value",
                  "type": "address"
                }
              ],
              "internalType": "struct EventUtils.AddressKeyValue[]",
              "name": "items",
              "type": "tuple[]"
            },
            {
              "components": [
                { "internalType": "string", "name": "key", "type": "string" },
                {
                  "internalType": "address[]",
                  "name": "value",
                  "type": "address[]"
                }
              ],
              "internalType": "struct EventUtils.AddressArrayKeyValue[]",
              "name": "arrayItems",
              "type": "tuple[]"
            }
          ],
          "internalType": "struct EventUtils.AddressItems",
          "name": "addressItems",
          "type": "tuple"
        },
        {
          "components": [
            {
              "components": [
                { "internalType": "string", "name": "key", "type": "string" },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                }
              ],
              "internalType": "struct EventUtils.UintKeyValue[]",
              "name": "items",
              "type": "tuple[]"
            },
            {
              "components": [
                { "internalType": "string", "name": "key", "type": "string" },
                {
                  "internalType": "uint256[]",
                  "name": "value",
                  "type": "uint256[]"
                }
              ],
              "internalType": "struct EventUtils.UintArrayKeyValue[]",
              "name": "arrayItems",
              "type": "tuple[]"
            }
          ],
          "internalType": "struct EventUtils.UintItems",
          "name": "uintItems",
          "type": "tuple"
        },
        {
          "components": [
            {
              "components": [
                { "internalType": "string", "name": "key", "type": "string" },
                {
                  "internalType": "int256",
                  "name": "value",
                  "type": "int256"
                }
              ],
              "internalType": "struct EventUtils.IntKeyValue[]",
              "name": "items",
              "type": "tuple[]"
            },
            {
              "components": [
                { "internalType": "string", "name": "key", "type": "string" },
                {
                  "internalType": "int256[]",
                  "name": "value",
                  "type": "int256[]"
                }
              ],
              "internalType": "struct EventUtils.IntArrayKeyValue[]",
              "name": "arrayItems",
              "type": "tuple[]"
            }
          ],
          "internalType": "struct EventUtils.IntItems",
          "name": "intItems",
          "type": "tuple"
        },
        {
          "components": [
            {
              "components": [
                { "internalType": "string", "name": "key", "type": "string" },
                { "internalType": "bool", "name": "value", "type": "bool" }
              ],
              "internalType": "struct EventUtils.BoolKeyValue[]",
              "name": "items",
              "type": "tuple[]"
            },
            {
              "components": [
                { "internalType": "string", "name": "key", "type": "string" },
                {
                  "internalType": "bool[]",
                  "name": "value",
                  "type": "bool[]"
                }
              ],
              "internalType": "struct EventUtils.BoolArrayKeyValue[]",
              "name": "arrayItems",
              "type": "tuple[]"
            }
          ],
          "internalType": "struct EventUtils.BoolItems",
          "name": "boolItems",
          "type": "tuple"
        },
        {
          "components": [
            {
              "components": [
                { "internalType": "string", "name": "key", "type": "string" },
                {
                  "internalType": "bytes32",
                  "name": "value",
                  "type": "bytes32"
                }
              ],
              "internalType": "struct EventUtils.Bytes32KeyValue[]",
              "name": "items",
              "type": "tuple[]"
            },
            {
              "components": [
                { "internalType": "string", "name": "key", "type": "string" },
                {
                  "internalType": "bytes32[]",
                  "name": "value",
                  "type": "bytes32[]"
                }
              ],
              "internalType": "struct EventUtils.Bytes32ArrayKeyValue[]",
              "name": "arrayItems",
              "type": "tuple[]"
            }
          ],
          "internalType": "struct EventUtils.Bytes32Items",
          "name": "bytes32Items",
          "type": "tuple"
        },
        {
          "components": [
            {
              "components": [
                { "internalType": "string", "name": "key", "type": "string" },
                { "internalType": "bytes", "name": "value", "type": "bytes" }
              ],
              "internalType": "struct EventUtils.BytesKeyValue[]",
              "name": "items",
              "type": "tuple[]"
            },
            {
              "components": [
                { "internalType": "string", "name": "key", "type": "string" },
                {
                  "internalType": "bytes[]",
                  "name": "value",
                  "type": "bytes[]"
                }
              ],
              "internalType": "struct EventUtils.BytesArrayKeyValue[]",
              "name": "arrayItems",
              "type": "tuple[]"
            }
          ],
          "internalType": "struct EventUtils.BytesItems",
          "name": "bytesItems",
          "type": "tuple"
        },
        {
          "components": [
            {
              "components": [
                { "internalType": "string", "name": "key", "type": "string" },
                {
                  "internalType": "string",
                  "name": "value",
                  "type": "string"
                }
              ],
              "internalType": "struct EventUtils.StringKeyValue[]",
              "name": "items",
              "type": "tuple[]"
            },
            {
              "components": [
                { "internalType": "string", "name": "key", "type": "string" },
                {
                  "internalType": "string[]",
                  "name": "value",
                  "type": "string[]"
                }
              ],
              "internalType": "struct EventUtils.StringArrayKeyValue[]",
              "name": "arrayItems",
              "type": "tuple[]"
            }
          ],
          "internalType": "struct EventUtils.StringItems",
          "name": "stringItems",
          "type": "tuple"
        }
      ],
      "indexed": false,
      "internalType": "struct EventUtils.EventLogData",
      "name": "eventData",
      "type": "tuple"
    }
  ],
  "name": "EventLog1",
  "type": "event"
};

const client = createPublicClient({
  chain: arbitrum,
  // https://arbitrum-mainnet.infura.io/v3/cf48757c6361405d8095527d8ec9ad3d
  transport: http('https://arb-mainnet.g.alchemy.com/v2/3pLGMpM_sG0iNEy7-l_-0d5JxXFYXkEm'),
});

const getPastEvents = async () => {
  const result = await client.getContractEvents({
    abi: EventEmitterAbi,
    address: '0xC8ee91A54287DB53897056e12D9819156D3822Fb',
    // event: eventLog1,
    eventName: 'EventLog1',
    args: {
      eventNameHash: 'OraclePriceUpdate',
      // eventNameHash: '0x41c7b30afab659d385f1996d0addfa6e647694862e72378d0b43773f556cbeb2',
      // topic1: '0x000000000000000000000000af88d065e77c8cc2239327c5edb3a432268e5831'
    },
    fromBlock: 133950000n,
    toBlock: 134000000n,
  });
  // const result = await client.getFilterLogs({filter})
  const PriceFeedEvent = result.filter(event => event.args.eventData.uintItems.items[3]?.value.toString() === '1');
  console.log('event count', result.length);
  console.log('PriceFeedEvent count', PriceFeedEvent.length, Array.from(new Set(PriceFeedEvent.map(event => `https://arbiscan.io/tx/${event.transactionHash}`))));
};

getPastEvents();

// const { ethers } = require('ethers');
// const contractABI = require('./abi.json');
// const orderHandlerABI = require('./orderHandler.json');

// // 连接到以太坊节点，这里以Infura为例
// const provider = new ethers.providers.JsonRpcProvider('https://endpoints.omniatech.io/v1/arbitrum/one/public');

// // 合约地址
// const contractAddress = '0xC8ee91A54287DB53897056e12D9819156D3822Fb';

// // 创建合约实例
// const contract = new ethers.Contract(contractAddress, contractABI, provider);

// // 你想要过滤的事件哈希值
// const eventHash = '0x137a44067c8961cd7e1d876f4754a5a3a75989b4552f1843fc69c3b372def160';
// const eventNameHash = '0x41c7b30afab659d385f1996d0addfa6e647694862e72378d0b43773f556cbeb2'

// const filter = {
//     topics: [eventHash, eventNameHash],
// };

// const orderHandlerAbi = new ethers.utils.Interface(orderHandlerABI);

// async function getPastEvents() {
//     try {
//         // 获取合约的所有历史事件
//         const events = await contract.queryFilter(filter, 194368999, 'latest');
//         console.log(events[0]);
//         // 过滤出符合特定哈希值的事件
//         // const filteredEvents = events.filter(event => event.transactionHash === eventHash);
//         const result = await Promise.all([events[0]].map(async event => {
//             console.log('hash', event.transactionHash);
//             const inputData = await provider.getTransaction(event.transactionHash);
//             console.log('inputData', inputData)
//             if (inputData.data.includes('0x943a6f4a')) {
//                 const data = orderHandlerAbi.decodeFunctionData('executeOrder', inputData);
//                 return data;
//             }
//             return undefined;
//         }));
//         console.log(result[0]);
//         // console.log(new Set(events.map(event => `https://arbiscan.io/tx/${event.transactionHash}`)));
//     } catch (error) {
//         console.error(error);
//     }
// }

// getPastEvents();
