pragma solidity ^0.4.23;

contract EsensVote {
  struct Scrutin {
    bytes32 name;
    address scrutinOwner;
    bool isVisibleResult;
    bool isOpenToProposal;
  }

  struct Vote {
    address voter;
    uint scrutinId;
    uint propositionId;
  }

  struct Proposition {
    uint scrutinId;
    bytes32 description;
    uint counter;
    address scrutinOwner;
  }

  Scrutin[] public scrutins;
  Proposition[] propositions;
  Vote[] private votes;

  mapping(address => mapping(uint => uint)) private propositionIdVotedForScrutinId;
  mapping(address => mapping(uint => bool)) private isScrutinVoted;

  event VoteSubmitted(uint _scrutinId, uint _propositionId, uint _counter);
  event ScrutinCreated(uint _scrutinId, bytes32 _name, address _scrutinOwner, bool _isVisibleResult, bool _isOpenToProposal);
  event ScrutinUpdated(uint _scrutinId, bytes32 _name, address _scrutinOwner, bool _isVisibleResult, bool _isOpenToProposal);
  event PropositionCreated(uint _propositionId, uint _scrutinId, bytes32 _description);
  event PropositionUpdated(uint _propositionId, uint _scrutinId, bytes32 _description);

  function EsensVote() public {
    createScrutin('Presidentielle', true, false);
    createProposal(0, 'Macron');
    createProposal(0, 'Le Pen');
    createProposal(0, 'Esens');
  }

  function createScrutin(bytes32 _name, bool _isVisibleResult, bool _isOpenToProposal) public returns (uint) {
    uint _scrutinId = scrutins.push(Scrutin(_name, msg.sender, _isVisibleResult, _isOpenToProposal)) - 1;
    emit ScrutinCreated(_scrutinId, _name, msg.sender, _isVisibleResult, _isOpenToProposal);
  }

  function isAdmin(uint _scrutinId) public view returns (bool) {
    return scrutins[_scrutinId].scrutinOwner == msg.sender;
  }

  function isAdminProposition(uint _propositionId) public view returns (bool) {
    return propositions[_propositionId].scrutinOwner == msg.sender;
  }

  function updateScrutin(uint _scrutinId, bytes32 _name, bool _isVisibleResult, bool _isOpenToProposal) public {
    require(scrutins[_scrutinId].scrutinOwner == msg.sender);
    scrutins[_scrutinId].name = _name;
    scrutins[_scrutinId].isVisibleResult = _isVisibleResult;
    scrutins[_scrutinId].isOpenToProposal = _isOpenToProposal;
    emit ScrutinUpdated(_scrutinId, _name, msg.sender, _isVisibleResult, _isOpenToProposal);
  }

  function createProposal(uint _scrutinId, bytes32 _description) public {
    Scrutin storage scrutin = scrutins[_scrutinId];
    if (scrutin.isOpenToProposal || scrutin.scrutinOwner == msg.sender) {
      uint _propositionId = propositions.push(Proposition(_scrutinId, _description, 0, msg.sender)) - 1;
      emit PropositionCreated(_propositionId, _scrutinId, _description);
    }
  }

  function updateProposition(uint _propositionId, bytes32 _description) public {
    Proposition storage proposition = propositions[_propositionId];
    require(proposition.scrutinOwner == msg.sender || scrutins[proposition.scrutinId].scrutinOwner == msg.sender);
    proposition.description = _description;
    emit PropositionUpdated(_propositionId, proposition.scrutinId, _description);
  }

  function submitVote(uint _propositionId) public {
    Proposition storage proposition = propositions[_propositionId];
    require(isScrutinVoted[msg.sender][proposition.scrutinId] == false);
    proposition.counter++;
    votes.push(Vote(msg.sender, proposition.scrutinId, _propositionId));
    isScrutinVoted[msg.sender][proposition.scrutinId] = true;
    propositionIdVotedForScrutinId[msg.sender][proposition.scrutinId] = _propositionId;
    emit VoteSubmitted(proposition.scrutinId, _propositionId, proposition.counter);
  }

  function getPropositionIdIfUserHasAlreadyVotedOnScrutinId(uint _scrutinId) public view returns (int) {
    if(isScrutinVoted[msg.sender][_scrutinId] != false) {
        return int(propositionIdVotedForScrutinId[msg.sender][_scrutinId]);
    }
    return - 1;
  }
}
