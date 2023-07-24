# Dao SYS UI POC

## Motivation

Help developers and users to execute and create smart contracts. System will allow to transfer history between instances (apps) for provide comfortable workflow with blockchain.
Create contracts collections and track history of deployments and executions.

## User Interface

Simple and robust user interface will help users to solve all routine tasks with web3 applications.


## Tech moments

### Proxy interaction

Inputs:
- proxy address

Steps:

1. Handle proxy contract as base contract to detect IPFS metadata. If not detected - ask user to check if its proxy or not manually.
2. Get proxy implementation
3. Handle same logic as described at section 1 but for implementation
4. Display implementation interaction UI and proxy interaction UI too.

### Handling IPFS metadata

Inputs:
- contract address or deployed bytecode

Steps:
1. In case if address provided then get bytecode by using eth_getCode
2. Detect IPFS metadata from bytecode using sourcify package.


### User storage

App do not have any server side. 
It only interacts with RPC and IPFS. 
All data can be stored in user Local Storage and then imported/exported for future usage or share with others. 

Export can be performed by next ways:
- print out JSON and able user to download it
- store to IPFS and PIN it then user will get IPFS hash as result.

Import data:
- paste json import
- load data from IPFS

## Components

### Collections (core component)

Each collection will store contracts and history of calls. User can share collection to another user by using json file.
Sub components:
- deployments
- contracts
- calls history
- notes
- contract information
- contract verification / IPFS metadata

### Deployments 

User can deploy any contract by using interface.

Default flow:

1. User paste compiled bytecode
2. Detect if there's sourcify hash and CBOR exists at the end of bytecode
3. Try load contract metadata from IPFS.
4. If fail propose user to paste ABI manually.


### Connect existing contracts

User can connect any deployed contract at any supported network by providing address.

Inputs:
- contract address

Additional inputs:
- contract ABI
- is Proxy check

Default flow:

1. User fill address field.
2. Check if its really contract
3. Check for IPFS metadata
4. If no metadata then display additional inputs.


### History

Each action / transaction with payload will be recorded. User can check and see all transactions history and filter by collection of smart contracts. 
When user want to export data there will be an option to export history or not. 
