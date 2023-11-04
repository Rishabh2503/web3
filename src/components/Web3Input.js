import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import Web3 from 'web3';

const GlassmorphismBox = () => {
  const [address, setAddress] = useState('');
  const [walletConnected, setWalletConnected] = useState(false);
  const [invalidAddress, setInvalidAddress] = useState(false);
  const [transactionPending, setTransactionPending] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    checkMetaMask();
  }, []);

  const checkMetaMask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      setWalletConnected(true);
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      setWalletConnected(false);
    }
  };

  const confirmTransaction = async () => {
    if (walletConnected && Web3.utils.isAddress(address)) {
      try {
        const web3 = new Web3(window.ethereum);

        // Replace with your contract address
        const contractAddress = '0xd4C787b192c235DF1F3055a7D6c505E1F1578023';

        // Replace with your contract ABI
        const contractAbi = [
          {
            "type": "constructor",
            "name": "",
            "inputs": [
              {
                "type": "uint256",
                "name": "_duration",
                "internalType": "uint256"
              },
              {
                "type": "uint256",
                "name": "_stake",
                "internalType": "uint256"
              }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
          },
          {
            "type": "event",
            "name": "ConsensusReached",
            "inputs": [],
            "outputs": [],
            "anonymous": false
          },
          {
            "type": "event",
            "name": "FundsBurned",
            "inputs": [],
            "outputs": [],
            "anonymous": false
          },
          {
            "type": "event",
            "name": "FundsReturned",
            "inputs": [],
            "outputs": [],
            "anonymous": false
          },
          {
            "type": "event",
            "name": "TaskCompleted",
            "inputs": [],
            "outputs": [],
            "anonymous": false
          },
          {
            "type": "function",
            "name": "burnFunds",
            "inputs": [],
            "outputs": [],
            "stateMutability": "nonpayable"
          },
          {
            "type": "function",
            "name": "confirmTaskCompleted",
            "inputs": [],
            "outputs": [],
            "stateMutability": "nonpayable"
          },
          {
            "type": "function",
            "name": "confirmations",
            "inputs": [
              {
                "type": "address",
                "name": "",
                "internalType": "address"
              }
            ],
            "outputs": [
              {
                "type": "bool",
                "name": "",
                "internalType": "bool"
              }
            ],
            "stateMutability": "view"
          },
          {
            "type": "function",
            "name": "consensusReached",
            "inputs": [],
            "outputs": [
              {
                "type": "bool",
                "name": "",
                "internalType": "bool"
              }
            ],
            "stateMutability": "view"
          },
          {
            "type": "function",
            "name": "creator",
            "inputs": [],
            "outputs": [
              {
                "type": "address",
                "name": "",
                "internalType": "address"
              }
            ],
            "stateMutability": "view"
          },
          {
            "type": "function",
            "name": "deadline",
            "inputs": [],
            "outputs": [
              {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
              }
            ],
            "stateMutability": "view"
          },
          {
            "type": "function",
            "name": "returnFunds",
            "inputs": [],
            "outputs": [],
            "stateMutability": "nonpayable"
          },
          {
            "type": "function",
            "name": "taskCompleted",
            "inputs": [],
            "outputs": [
              {
                "type": "bool",
                "name": "",
                "internalType": "bool"
              }
            ],
            "stateMutability": "view"
          },
          {
            "type": "function",
            "name": "taskStake",
            "inputs": [],
            "outputs": [
              {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
              }
            ],
            "stateMutability": "view"
          }
        ];

        const contract = new web3.eth.Contract(contractAbi, contractAddress);

        // Call your contract method to confirm the transaction
        await contract.methods.confirmTaskCompleted().send({
          from: window.ethereum.selectedAddress, // Use the connected user's address
        });

        // Display a success message
        setSuccessMessage('Transaction confirmed successfully');

        // Clear the error message
        setErrorMessage('');
      } catch (error) {
        console.error('Error confirming transaction:', error);

        // Display an error message
        setErrorMessage('Error confirming transaction: ' + error);

        // Clear the success message
        setSuccessMessage('');
      }
    } else {
      setInvalidAddress(true);
    }
  };

  return (
    <div className="d-flex flex-column pt-5 align-items-center min-vh-100">
      <div className="glassmorphism-box p-4">
        <h1 className="text-white mb-4 text-center">Reward Pool</h1>
        <Form.Group controlId="address">
          <Form.Control
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="form-control mb-3"
          />
        </Form.Group>

        <div className="text-center">
          {walletConnected ? (
            transactionPending ? (
              <Button disabled className="btn btn-primary">
                Confirming Transaction...
              </Button>
            ) : (
              <Button onClick={confirmTransaction} className="btn btn-primary">
                Confirm Transaction
              </Button>
            )
          ) : null}
          {invalidAddress ? (
            <p className="text-danger">
              Please input a valid address to confirm the transaction.
            </p>
          ) : null}
          {successMessage && <p className="text-success">{successMessage}</p>}
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default GlassmorphismBox;
