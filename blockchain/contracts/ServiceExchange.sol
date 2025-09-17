// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./NeighborlyToken.sol";
import "./NeighborlyReputation.sol";

contract ServiceExchange {

    address public owner;
    NeighborlyToken public tokenContract;
    NeighborlyReputation public reputationContract;

    struct Service {
        uint256 id;
        string description;
        uint256 reward;
        address requester;
        address provider;
        Status status;
        string ipfsHash;
    }

    enum Status { Open, Accepted, Completed, Cancelled }

    uint256 public nextServiceId;
    mapping(uint256 => Service) public services;

    event ServiceCreated(uint256 id, address indexed requester, uint256 reward);
    event ServiceAccepted(uint256 id, address indexed provider);
    event ServiceCompleted(uint256 id, address indexed requester, address indexed provider);

    constructor(address _tokenAddress, address _reputationAddress) {
        owner = msg.sender;
        tokenContract = NeighborlyToken(_tokenAddress);
        reputationContract = NeighborlyReputation(_reputationAddress);
    }

    function createServiceRequest(string memory _description, uint256 _reward) public {
        services[nextServiceId] = Service({
            id: nextServiceId,
            description: _description,
            reward: _reward,
            requester: msg.sender,
            provider: address(0),
            status: Status.Open,
            ipfsHash: ""
        });
        emit ServiceCreated(nextServiceId, msg.sender, _reward);
        nextServiceId++;
    }

    function acceptServiceRequest(uint256 _serviceId) public {
        Service storage service = services[_serviceId];
        require(service.status == Status.Open, "Service is not open");
        require(service.requester != msg.sender, "You cannot accept your own request");

        service.provider = msg.sender;
        service.status = Status.Accepted;
        emit ServiceAccepted(_serviceId, msg.sender);
    }

    function confirmServiceCompletion(uint256 _serviceId, string memory _ipfsHash) public {
        Service storage service = services[_serviceId];
        require(service.requester == msg.sender, "Only the requester can confirm completion");
        require(service.status == Status.Accepted, "Service must be in 'Accepted' state");

        service.status = Status.Completed;
        service.ipfsHash = _ipfsHash;

        tokenContract.mint(service.provider, service.reward);
        reputationContract.safeMint(service.provider, _ipfsHash);

        emit ServiceCompleted(_serviceId, service.requester, service.provider);
    }
}