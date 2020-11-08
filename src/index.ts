import * as CryptoJS from 'crypto-js';

class Block {
  static calcuateBlockHash = (index:number, previousHash:string, timeStamp : number, data : string) : string => {
    return CryptoJS.SHA256(index + previousHash + timeStamp + data).toString();
  }

  static validateStructure = (aBlock : Block): boolean => {
    const { index, hash, previousHash, timeStamp, data } = aBlock;
    return typeof index === 'number' && typeof hash === 'string' && typeof previousHash === 'string' && typeof timeStamp === 'number' && typeof data === 'string';
  }

  public index : number;
  public hash : string;
  public previousHash : string;
  public data : string;
  public timeStamp : number;

  constructor ( index : number, hash : string, previousHash : string, data : string, timeStamp : number){
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timeStamp = timeStamp;
  };
};

const genesisBlock: Block = new Block(0, "2020202020202", "", "hello", 123456);

let blockChain: Block[] = [genesisBlock];

const getBlockChain = () : Block[] => blockChain;

const getLatestBlock = () : Block => blockChain[blockChain.length -1];

const getNewTimeStamp = () : number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data:string) : Block => {
  const previousBlock : Block = getLatestBlock();
  const newIndex : number = previousBlock.index + 1;
  const newTimeStamp : number = getNewTimeStamp();
  const newHash : string = Block.calcuateBlockHash(newIndex, previousBlock.hash, newTimeStamp, data);
  const newBlock : Block = new Block(newIndex, newHash, previousBlock.hash, data, newTimeStamp);
  addBlock(newBlock);
  return newBlock;
}

const getHastForBlock = (aBlock : Block):string => {
  const { index, previousHash, timeStamp, data } = aBlock;
  return Block.calcuateBlockHash(index, previousHash, timeStamp, data);
}
const isBlockValid = (candidateBlock : Block, previousBlock : Block) : boolean => {
  if(!Block.validateStructure(candidateBlock)){
    return false;
  } else if (previousBlock.index + 1 !== candidateBlock.index){
    return false;
  } else if (previousBlock.hash !== candidateBlock.previousHash){
    return false;
  } else if (getHastForBlock(candidateBlock) !== candidateBlock.hash){
    return false;
  } else { 
    return true;
  }
}

const addBlock = (candidateBlock : Block) : void => {
  if(isBlockValid(candidateBlock, getLatestBlock())){
    blockChain.push(candidateBlock);
  }
}
createNewBlock('Hello one');
createNewBlock('Hello two');
createNewBlock('Hello three');
createNewBlock('Hello four');
createNewBlock('Hello five');

console.log(blockChain);