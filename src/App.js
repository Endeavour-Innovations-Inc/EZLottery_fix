import React, { useEffect, useState, useCallback } from 'react';
import Web3 from 'web3';
import EZLottery from "./Assets/EZLottery.json";
import { Button, Paper, Typography, Box, AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './Style/App.css';

import myImage7 from './Assets/hills.png';
import myImage6 from './Assets/zaebis.png';
import myImage4 from './Assets/PidorElephantsDynasty.png';
import myImage5 from './Assets/fdfdfd.png';
import myImage2 from './Assets/talantexe.jpg';

import TelegramIcon from '@material-ui/icons/Telegram';
import TwitterIcon from '@material-ui/icons/Twitter';

let web3, contract;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // height: '100vh',
    backgroundColor: '#f5f5f5',
    backgroundImage: `url(${myImage2})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top center', // Adjust as needed
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      padding: theme.spacing(2),
    },
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    width: '100%',
    height: 'auto',
    margin: '4%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // White with 50% opacity
    borderRadius: '35px', // Increase this value for smoother angles
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  button: {
    marginTop: theme.spacing(1),
    borderRadius: '20px', // Adjust this value as needed
  },
  title: {
    flexGrow: 1,
    display: 'flex',  // Added to align title
    justifyContent: 'flex-start',
  },
  headerOptions: {
    display: 'flex',
    flexGrow: 40, // Changed to 2 to give more space to the navigation buttons
    justifyContent: 'center',
  },
  image: {
    width: '80px',
    height: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  footer: {
    width: '100%', // Ensure the footer attempts to take full width
    backgroundColor: '#333', // Dark matte background
    color: 'white',
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
    borderTop: '1px solid #ccc',
    marginTop: 0, // Changed to 0 to remove the top margin
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // Add spacing between icons
    '& > *:not(:last-child)': {
      marginRight: theme.spacing(1),
    }
  },
  branding: {
    textAlign: 'left',
    // Adjust position as needed
  },
  appBar: {
    display: 'flex',
    justifyContent: 'space-between', // Ensures even spacing between elements
    backgroundColor: 'transparent', // Set the background to transparent
    boxShadow: 'none', // Remove the box-shadow to make it fully transparent
  },
  navButtons: {
    display: 'flex',
    justifyContent: 'center',
  },
  metaMaskButton: {
    flexGrow: 1, // Adjust this value to change the position of the MetaMask button
  },
  additionalSection: {
    // Common background styles
    backgroundImage: `url(${myImage7})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    // Individual section styles
    width: '100%',
    padding: theme.spacing(1),
    backgroundColor: '#e0e0e0',
    textAlign: 'center',
    marginBottom: 0,
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    color: 'white', // Set text color to white
    marginTop: theme.spacing(1), // Adjust the top margin to position it closer to the top
    marginBottom: theme.spacing(1), // Adjust bottom margin for spacing
    fontSize: '2rem', // Larger font size, adjust as needed
    // Add other styles as needed
  },
  discordButton: {
    backgroundColor: 'white',
    color: 'black',
    borderRadius: '20px', // Adjust for desired roundness
    border: 'none',
    padding: '10px 20px',
    marginTop: '20px', // Spacing between the header and the button
    cursor: 'pointer',
    '&:hover': {
      // Optional: Style for hover state
    },
    // Add other styles as needed
  },
  additionalSection2: {
    // Same background styles as additionalSection
    backgroundImage: `url(${myImage7})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    // Individual section styles
    width: '100%',
    padding: theme.spacing(1),
    backgroundColor: '#e0e0e0',
    textAlign: 'center',
    marginBottom: 0,
    minHeight: '100vh',
  },
  signInText: {
    // Style for the sign-in text
    marginBottom: theme.spacing(1), // Adjust spacing as needed
  },
  comingSoonButton: {
    backgroundColor: 'gray',
    color: 'white',
    borderRadius: '15px', // Smooth edges
    border: 'none',
    padding: theme.spacing(1, 2),
    cursor: 'not-allowed', // Indicates it's not clickable yet
    // Add other styling as needed
  },
  footer_header: {
    // Style for your header
    marginBottom: theme.spacing(1), // Adjust spacing as needed
  },
}));

function App() {
  const classes = useStyles();
  const [account, setAccount] = useState("");
  const [isMetaMaskInstalled, setMetaMaskInstalled] = useState(false);

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      console.log("Please install MetaMask");
      return;
    }
    
    web3 = new Web3(window.ethereum);
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);

      const contractAddress = "0x3Fd5FCcE475a20B55CB7d5fD49A6fC9367Ab8D38"; // replace with your contract's address
      contract = new web3.eth.Contract(EZLottery.abi, contractAddress);
    } catch (e) {
      console.error("User denied account access");
    }
  }, []);

  useEffect(() => {
    setMetaMaskInstalled(typeof window.ethereum !== 'undefined');
    connectWallet();
  }, [connectWallet]);

  async function mintTicket() {
    try {
      await contract.methods.mintTicket().send({ from: account, value: web3.utils.toWei("0.01", "ether") });
    } catch (e) {
      console.error("Error minting ticket", e);
    }
  }

  const buttonLabel = account 
    ? `${account.slice(0, 6)}...${account.slice(-4)}`
    : 'Connect to MetaMask';

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Pidor Elephants Dynasty
          </Typography>
          <div className={classes.headerOptions}>
            <Button color="inherit">Home</Button>
            <Button color="inherit">About</Button>
            <Button color="inherit">Services</Button>
            <Button color="inherit">Portfolio</Button>
            <Button color="inherit">Contact</Button>
          </div>
          {isMetaMaskInstalled ? (
            <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} onClick={connectWallet}>
              {buttonLabel}
            </Button>
          ) : (
            <Typography variant="body1">
              Please install MetaMask
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <h2 className={classes.header}>Join the Community</h2>
      <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" height="100vh">
        <Paper className={classes.paper}>
        <img src={myImage4} alt="NFT Placeholder" className={classes.image} />
          <Typography variant="h4">Mint</Typography>
          <Typography variant="h6">Mint your first Pidor Dynasty Elephant</Typography>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={mintTicket}
          >
            Mint your Pidor
          </Button>
        </Paper>
        <Paper className={classes.paper}>
        <img src={myImage5} alt="NFT Placeholder" className={classes.image} />
          <Typography variant="h4">Marketplace</Typography>
          <Typography variant="h6">Trade & Stake your NFTs to earn rewards</Typography>
          <Button
            className={classes.button}
            variant="contained"
            style={{ backgroundColor: 'darkgray', color: 'white' }} // Adding inline style
            onClick={mintTicket}
          >
            Coming soon
          </Button>
        </Paper>
        <Paper className={classes.paper}>
        <img src={myImage6} alt="NFT Placeholder" className={classes.image} />
          <Typography variant="h4">Build</Typography>
          <Typography variant="h6">Enhance your NFTs to boost stats & yield</Typography>
          <Button
            className={classes.button}
            variant="contained"
            style={{ backgroundColor: 'darkgray', color: 'white' }} // Adding inline style
            onClick={mintTicket}
          >
            Coming soon
          </Button>
        </Paper>
      </Box>
      {/* Additional Content Sections */}
      {/* These sections will make the page scrollable as they add more content */}
      <div className={classes.additionalSection}>
        <h2 className={classes.header}>Join the Community</h2>
        <button className={classes.discordButton}>Join us on Discord</button>
      </div>
      <div className={classes.additionalSection2}>
        <h2 className={classes.header}>Pidor Dynasty Metaverse</h2>
        <p className={classes.signInText}>Sign in with Metamask</p>
        <button className={classes.comingSoonButton}>Coming Soon</button>
      </div>
      {/* Footer */}
    <footer className={classes.footer}>
    <div className={classes.socialIcons}>
        <TelegramIcon />
        <TwitterIcon />
      </div>
      <div className={classes.branding}>
        <Typography variant="h6" align="left">
          Pidor Dynasty Elephants
        </Typography>
        <Typography variant="subtitle1" align="left" color="textSecondary">
          An Open Source Blockchain Ecosystem
        </Typography>
      </div>
      <Typography variant="caption" align="center" color="textSecondary" component="p">
        © 2023 Pidor Dynasty. All rights reserved.
      </Typography>
    </footer>
    </div>
  );
}

export default App;
