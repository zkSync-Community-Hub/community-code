// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ISP1Verifier} from "./ISP1Verifier.sol";
import "hardhat/console.sol";

struct PublicValuesStruct {
    uint32 blocksDestroyed;
    uint32 timeElapsed;
    bool isValid;
}

contract Brickles {
    struct Score {
        address player;
        uint256 timestamp;
        uint256 blocksDestroyed;
        uint256 timeElapsed;
    }

    /// @notice The address of the SP1 verifier contract.
    address public verifier;
    
    /// @notice The verification key for the program.
    bytes32 public gameProgramVKey;
    
    /// @notice Tracks the proofs bytes that have been verified ==> the player that submitted the proof
    mapping(bytes => address) verifiedProofs;
    
    // Array to store top scores
    Score[] public topScores;
    uint256 private constant MAX_TOP_SCORES = 10;
    
    // Mapping of player address to their personal best score
    mapping(address => Score) public playerBestScores;
    
    // Events
    event NewScore(
        address indexed player,
        uint256 blocksDestroyed,
        uint256 timeElapsed
    );
    
    event NewHighScore(
        address indexed player,
        uint256 blocksDestroyed,
        uint256 timeElapsed
    );
    
    constructor(address _verifier, bytes32 _gameProgramVKey) {
        verifier = _verifier;
        gameProgramVKey = _gameProgramVKey;
    }
    
    function verifyProof(
        bytes calldata _publicValues,
        bytes calldata _proofBytes
    ) public {
        console.log("STARTING");
        require(_publicValues.length > 0, "Public values must be provided");
        require(_proofBytes.length > 0, "Proof must be provided");
        console.log("DATA LOOKS OK");
        bytes memory input = abi.encodePacked(_proofBytes, _publicValues);
        bool proofIsNew = verifiedProofs[input] == address(0);
        console.log("PROOF IS NEW", proofIsNew);
        require(proofIsNew, "Proof already used");
        console.log("GOING TO VERIFY");
        ISP1Verifier(verifier).verifyProof(
            gameProgramVKey,
            _publicValues,
            _proofBytes
        );
        console.log("DONE");
        PublicValuesStruct memory publicValues = abi.decode(
            _publicValues,
            (PublicValuesStruct)
        );
        console.log("DECODED");
        require(publicValues.isValid, "Inputs Invalid");
        _submitScore(publicValues.blocksDestroyed, publicValues.timeElapsed);
        verifiedProofs[input] = msg.sender;
    }
    
    function _submitScore(
        uint256 _blocksDestroyed,
        uint256 _timeElapsed
    ) internal {
        // Create new score
        Score memory newScore = Score({
            player: msg.sender,
            timestamp: block.timestamp,
            blocksDestroyed: _blocksDestroyed,
            timeElapsed: _timeElapsed
        });
        
        // Emit new score event
        emit NewScore(msg.sender, _blocksDestroyed, _timeElapsed);
        
        // Update personal best if necessary
        if (!_isScoreHigher(playerBestScores[msg.sender], newScore)) {
            playerBestScores[msg.sender] = newScore;
            emit NewHighScore(msg.sender, _blocksDestroyed, _timeElapsed);
        }
        
        // Update top scores
        _updateTopScores(newScore);
    }
    
    // returns true if score1 is higher than score2
    function _isScoreHigher(
        Score memory score1,
        Score memory score2
    ) internal pure returns (bool) {
        if (score1.blocksDestroyed == 0) return false; // Handle empty scores
        if (score2.blocksDestroyed == 0) return true;  // Handle empty scores
        
        if (score1.blocksDestroyed > score2.blocksDestroyed) {
            return true;
        }
        return (score1.blocksDestroyed == score2.blocksDestroyed &&
            score1.timeElapsed < score2.timeElapsed);
    }
    
    function _updateTopScores(Score memory newScore) internal {
        // Find where the new score should be inserted
        uint256 insertIndex = topScores.length;
        for (uint256 i = 0; i < topScores.length; i++) {
            if (!_isScoreHigher(topScores[i], newScore)) {
                insertIndex = i;
                break;
            }
        }
        
        // If the score qualifies for top scores
        if (insertIndex < MAX_TOP_SCORES) {
            // If not at capacity, extend the array
            if (topScores.length < MAX_TOP_SCORES) {
                topScores.push(newScore);
            }
            
            // Shift existing scores down
            for (uint256 i = topScores.length - 1; i > insertIndex; i--) {
                topScores[i] = topScores[i - 1];
            }
            
            // Insert the new score
            topScores[insertIndex] = newScore;
        }
    }
    
    function getTopScores() external view returns (Score[] memory) {
        return topScores;
    }
    
    function getPlayerScore(address _player) external view returns (Score memory) {
        return playerBestScores[_player];
    }
}