module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=7)}([function(e,t){e.exports=require("@babel/runtime/helpers/defineProperty")},function(e,t){e.exports=require("@babel/runtime/regenerator")},function(e,t){e.exports=require("web3-eth-contract")},function(e,t){e.exports=require("web3-utils")},function(e,t){e.exports=require("@babel/runtime/helpers/asyncToGenerator")},function(e,t){e.exports=require("@babel/runtime/helpers/classCallCheck")},function(e,t){e.exports=require("@babel/runtime/helpers/createClass")},function(e,t,n){"use strict";n.r(t),n.d(t,"ETHEREUM_NETWORK",(function(){return r})),n.d(t,"abi",(function(){return a})),n.d(t,"default",(function(){return v}));var r={ROPSTEN:"ropsten",MAINNET:"mainnet"},a=[{constant:!0,inputs:[],name:"currentEpoch",outputs:[{internalType:"uint256",name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{internalType:"uint256",name:"epoch",type:"uint256"}],name:"getEpochInfo",outputs:[{internalType:"uint256",name:"id",type:"uint256"},{internalType:"uint256",name:"n",type:"uint256"},{internalType:"uint256",name:"k",type:"uint256"},{internalType:"uint256",name:"t",type:"uint256"},{internalType:"address[]",name:"nodeList",type:"address[]"},{internalType:"uint256",name:"prevEpoch",type:"uint256"},{internalType:"uint256",name:"nextEpoch",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{internalType:"address",name:"nodeAddress",type:"address"}],name:"getNodeDetails",outputs:[{internalType:"string",name:"declaredIp",type:"string"},{internalType:"uint256",name:"position",type:"uint256"},{internalType:"uint256",name:"pubKx",type:"uint256"},{internalType:"uint256",name:"pubKy",type:"uint256"},{internalType:"string",name:"tmP2PListenAddress",type:"string"},{internalType:"string",name:"p2pListenAddress",type:"string"}],payable:!1,stateMutability:"view",type:"function"}],i=n(4),o=n.n(i),c=n(5),s=n.n(c),d=n(6),u=n.n(d),p=n(0),f=n.n(p),b=n(1),l=n.n(b),h=n(2),y=n.n(h),m=n(3),v=function(){function e(){var t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=n.network,o=void 0===i?r.MAINNET:i,c=n.proxyAddress,d=void 0===c?"0x638646503746d5456209e33a2ff5e3226d698bea":c;s()(this,e),f()(this,"_currentEpoch","19"),f()(this,"_torusNodeEndpoints",["https://torus-19.torusnode.com/jrpc","https://torus-node.ens.domains/jrpc","https://torus-node.matic.network/jrpc","https://torus.zilliqa.network/jrpc","https://torus-mainnet.cosmos.network/jrpc","https://torus2.etherscan.com/jrpc","https://torus-node-v2.skalelabs.com/jrpc","https://torus-node.binancex.dev/jrpc","https://torusnode.ont.io/jrpc"]),f()(this,"_torusNodePub",[{X:"bbe83c64177c3775550e6ba6ac2bc059f6847d644c9e4894e42c60d7974d8c2b",Y:"82b49a7caf70def38cdad2740af45c1e4f969650105c5019a29bb18b21a9acb5"},{X:"c208cac4ef9a47d386097a9c915b28e9cb89213abee8d26a17198ee261201b0d",Y:"c7db2fe4631109f40833de9dc78d07e35706549ee48fa557b33e4e75e1047873"},{X:"ca1766bb426d4ca5582818a0c5439d560ea64f5baa060793ab29dd3d0ceacfe",Y:"d46c1d08c40e1306e1bca328c2287b8268166b11a1ba4b8442ea2ad0c5e32152"},{X:"c3934dd2f6f4b3d2e1e398cc501e143c1e1a381b52feb6d1525af34d16253768",Y:"71f5141a5035799099f5ea3e241e66946bc55dc857ac3bd7d6fcdb8dcd3eeeef"},{X:"22e66f1929631d00bf026227581597f085fd94fd952fc0dca9f0833398b5c064",Y:"6088b3912e10a1e9d50355a609c10db7d188f16a2e2fd7357e51bf4f6a74f0a1"},{X:"9dc9fa410f3ce9eb70df70cdea00a49f2c4cc7a31c08c0dab5f863ed35ff5139",Y:"627a291cb87a75c61da3f65d6818e1e05e360217179817ed27e8c73bca7ec122"},{X:"118b9fc07e97b096d899b9f6658463ce6a8caa64038e37fc969df4e6023dd8c6",Y:"baf9fa4e51770f4796ea165dd03a769b8606681a38954a0a92c4cbffd6609ce9"},{X:"8a6d8b925da15a273dec3d8f8395ec35cd6878f274b2b180e4e106999db64043",Y:"96f67f870c157743da0b1eb84d89bf30500d74dc84c11f501ee1cb013acc8c46"},{X:"39cecb62e863729f572f7dfc46c24867981bf04bb405fed0df39e33984bfade5",Y:"61c2364434012e68a2be2e9952805037e52629d7762fafc8e10e9fb5bad8f790"}]),f()(this,"_torusIndexes",[1,2,3,4,5,6,7,8,9]),f()(this,"_network",r.MAINNET),f()(this,"nodeListAddress",void 0),f()(this,"updated",void 0),f()(this,"nodeListContract",void 0);try{var u=new URL(o);t=u.href}catch(e){t="https://".concat(o,".infura.io/v3/").concat("b8cdb0e4cff24599a286bf8e87ff1c96")}y.a.setProvider(t),this.nodeListContract=new y.a(a,d),this.nodeListAddress=d,this.updated=!1,this._network=o}var t;return u()(e,[{key:"_nodeDetails",get:function(){return{currentEpoch:this._currentEpoch,nodeListAddress:this.nodeListAddress,torusNodeEndpoints:this._torusNodeEndpoints,torusNodePub:this._torusNodePub,torusIndexes:this._torusIndexes,updated:this.updated}}},{key:"getCurrentEpoch",value:function(){return this.nodeListContract.methods.currentEpoch().call()}},{key:"getEpochInfo",value:function(e){return this.nodeListContract.methods.getEpochInfo(e).call()}},{key:"getNodeEndpoint",value:function(e){return this.nodeListContract.methods.getNodeDetails(e).call()}},{key:"getNodeDetails",value:(t=o()(l.a.mark((function e(){var t,n,a,i,o,c,s,d,u,p,f,b,h=this,y=arguments;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=y.length>0&&void 0!==y[0]&&y[0],n=y.length>1&&void 0!==y[1]&&y[1],e.prev=2,!t||this._network!==r.MAINNET){e.next=5;break}return e.abrupt("return",this._nodeDetails);case 5:if(!this.updated){e.next=7;break}return e.abrupt("return",this._nodeDetails);case 7:return e.next=9,this.getCurrentEpoch();case 9:if(a=e.sent,!n||this._network!==r.MAINNET||a!==this._currentEpoch){e.next=12;break}return e.abrupt("return",this._nodeDetails);case 12:return this._currentEpoch=a,e.next=15,this.getEpochInfo(a);case 15:return i=e.sent,o=i.nodeList.map((function(e,t){return t+1})),this._torusIndexes=o,c=i.nodeList.map((function(e){return h.getNodeEndpoint(e)})),e.next=21,Promise.all(c);case 21:for(s=e.sent,d=[],u=[],p=0;p<s.length;p+=1)f=s[p],b="https://".concat(f.declaredIp.split(":")[0],"/jrpc"),d.push(b),u.push({X:Object(m.toHex)(f.pubKx).replace("0x",""),Y:Object(m.toHex)(f.pubKy).replace("0x","")});return this._torusNodeEndpoints=d,this._torusNodePub=u,this.updated=!0,e.abrupt("return",this._nodeDetails);case 31:return e.prev=31,e.t0=e.catch(2),e.abrupt("return",this._nodeDetails);case 34:case"end":return e.stop()}}),e,this,[[2,31]])}))),function(){return t.apply(this,arguments)})}]),e}()}]).default;