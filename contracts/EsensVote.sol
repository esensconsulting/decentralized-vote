pragma solidity ^0.4.15;

contract EsensVote {
  struct Scrutin {
    bytes32 name;
    address scrutinOwner;
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
  }

  Scrutin[] scrutins;
  Proposition[] propositions;
  Vote[] private votes;

  event VoteSubmitted(uint _scrutinId, uint _propositionId);

  function EsensVote() public {
    scrutins.push(Scrutin('Presidentielle', msg.sender, false));
    propositions.push(Proposition(0, 'Macron', 0));
    propositions.push(Proposition(0, 'Le Pen', 0));
  }

  function createScrutin(bytes32 _name, bool _isOpenToProposal) public returns (uint) {
    return scrutins.push(Scrutin(_name, msg.sender, _isOpenToProposal)) - 1;
  }

  function createProposal(uint _scrutinId, bytes32 _description) public {
    Scrutin storage scrutin = scrutins[_scrutinId];
    if (scrutin.isOpenToProposal || scrutin.scrutinOwner == msg.sender) {
      propositions.push(Proposition(_scrutinId, _description, 0));
    }
  }

  function submitVote(uint _propositionId) public {
    Proposition storage proposition = propositions[_propositionId];
    require(getPropositionIdIfUserHasAlreadyVotedOnScrutinId(proposition.scrutinId) == - 1);
    proposition.counter++;
    votes.push(Vote(msg.sender, proposition.scrutinId, _propositionId));
    VoteSubmitted(proposition.scrutinId, _propositionId);
  }

  function getPropositionIdIfUserHasAlreadyVotedOnScrutinId(uint _scrutinId) public view returns (int) {
    for (uint i = 0; i < votes.length; i++) {
      if (votes[i].scrutinId == _scrutinId && votes[i].voter == msg.sender) {
        return int(votes[i].propositionId);
      }
    }
    return - 1;
  }

  function getVoteCountByScrutinId(uint _scrutinId) public view returns (uint) {
    uint counter = 0;
    for (uint i = 0; i < votes.length; i++) {
      if (votes[i].scrutinId == _scrutinId) {
        counter++;
      }
    }
    return counter;
  }

  function getPropositionsIdByScrutinId(uint _scrutinId) public view returns (uint[]) {
    uint[] memory result = new uint[](propositions.length);
    uint counter = 0;
    for (uint i = 0; i < propositions.length; i++) {
      if (propositions[i].scrutinId == _scrutinId) {
        result[counter] = i;
        counter++;
      }
    }
    return result;
  }

  function getPropositionByScrutinIdAndPropositionId(uint _scrutinId, uint _propositionId) public view returns (uint, bytes32, uint) {
    Proposition storage proposition = propositions[_propositionId];
    require(proposition.scrutinId == _scrutinId);
    bytes32 description = proposition.description;
    uint counter = proposition.counter;
    return (_scrutinId, description, counter);
  }

}
