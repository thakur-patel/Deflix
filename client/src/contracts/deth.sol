// SPDX-License-Identifier: MIT
// Sample contract deployed on matic using remix on address: 0x67EfD9E42e2002c46235c447911f0179c9d8b0f8

pragma solidity ^0.8.0;

contract HelloWorld {

    string saySomething;

    constructor() {
        saySomething = "Hello World!";
    }

    function speak() public view returns(string memory) {
        return saySomething;
    }

    function saySomethingElse(string memory newSaying) public  returns(bool success) {
        saySomething = newSaying;
        return true;
    }
}