import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const ConnectWalletButton = () => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    checkMetaMask();
  }, []);

  const checkMetaMask = () => {
    if (typeof window.ethereum !== 'undefined') {
      setIsMetaMaskInstalled(true);
      setIsConnecting(false); // Reset the connecting state when MetaMask is available
    } else {
      setIsMetaMaskInstalled(false);
    }
  };

  const connectToMetaMask = async () => {
    if (isConnecting) {
      return; // Return if a connection request is already in progress
    }

    setIsConnecting(true);

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      setIsConnected(true);
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    } finally {
      setIsConnecting(false); // Reset the connecting state after the connection attempt
    }
  };

  return (
    <div>
      {isMetaMaskInstalled ? (
        isConnected ? (
          <p>Your wallet is connected</p>
        ) : (
          <Button
            variant="primary"
            onClick={connectToMetaMask}
            disabled={isConnecting} // Disable the button during connection attempts
          >
            {isConnecting ? 'Connecting...' : 'Connect to MetaMask'}
          </Button>
        )
      ) : (
        <p>MetaMask is not installed. Please install it to use this feature.</p>
      )}
    </div>
  );
};

export default ConnectWalletButton;
