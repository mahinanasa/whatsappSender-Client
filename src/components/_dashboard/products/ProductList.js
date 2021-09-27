import { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import PropTypes from 'prop-types';
// material
import {
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  TextareaAutosize
} from '@mui/material';
import {
  getQrCode,
  sendMessages,
  logout,
} from 'src/redux/_actions/leadAction';
import  Loader  from '../../Loader'

ProductList.propTypes = {
  products: PropTypes.array.isRequired
};

export default function ProductList({ products, ...other }) {
  const dispatch = useDispatch();
  const [statusData, setStatusData] = useState(null);
  const [open, setOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [message, setMessage] = useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    getStatus();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(async () => {
      if (userDetails || (userDetails && Object.keys(userDetails).length === 0)) {
        await getStatus();
      }
    }, 20000);
    return () => window.clearInterval(timer);
  }, [userDetails]);

  useEffect(() => {
    setMobileNumber(mobileNumber.replace('+', ''));
  });
  const getStatus = async () => {
    const res = await dispatch(getQrCode());
    setStatusData(res);
    if (res.userData) {
      setUserDetails(res.userData);
    }
  };

  const sendMessage = async () => {
    if(mobileNumber !== "" && message !== ""){
      const res = await dispatch(sendMessages({ mobileNo: mobileNumber, message: message }));
    }
  };

  const logoutFn = async() => {
    debugger
    const res = await dispatch(logout());
  }
  return (
    <>
        
        <Grid container spacing={3} {...other}>
        <Grid alignContent="center" item xs={12}>
          {/* <Loader/> */}
        </Grid>
          </Grid>

      <Grid container spacing={3} {...other}>
        <Grid item xs={12}>
          {statusData && !statusData.isAuthenticated && statusData.qrCode && (
            <>
              <Button variant="outlined" onClick={handleClickOpen}>
                Open
              </Button>
              <Dialog
                open={!statusData.isAuthenticated}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    To use the feature, Scan the QR code
                  </DialogContentText>
                  <div>
                    <img src={statusData.qrCode}></img>
                  </div>

                  <div>Scanned ? Please wait for redirecting to message,</div>
                  <div>
                    If you are not redirected, Please
                    <Button
                      onClick={() => {
                        getStatus();
                      }}
                    >
                      Click here!
                    </Button>
                  </div>
                </DialogContent>
                <DialogActions>
                  {/* <Button
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    Close
                  </Button> */}
                </DialogActions>
              </Dialog>
            </>
          )}
        </Grid>
      </Grid>

      <Grid container spacing={3} {...other}>
        {statusData && statusData.isAuthenticated && (
          <>
            {statusData.userData ? (
              <>
              <Grid item xs={5}>
                Logged in as {statusData.userData.name} with {statusData.userData.id.split('@')[0]}
              </Grid>
                <Grid item xs={7}>
                <Button onClick={() => logoutFn()} color="error">
                Logout
              </Button>
              </Grid>
              </>
              
            ) : (
              <Grid item xs={12}>
               Fetching User details...
              </Grid>
            )

            }

            <Grid item xs={12}>
              Mobile:{' '}
              <TextField
              
              multiline
                placeholder="97111111111"
                onInput={(e) => setMobileNumber(e.target.value)}
                value={mobileNumber.replace('+', '')}
              />
            </Grid>
            <br />
            <Grid item xs={12}>
              {' '}
              Message:
              {' '}
              <TextareaAutosize
                className="w-100"
               minLength={50}
                rowsMax={1000}
                minRows={3}
                onInput={(e) => setMessage(e.target.value)}
                placeholder="Type your message"
                value={message}
              />
            </Grid>
            <br />
            <Grid item xs={12}>
              <Button onClick={() => sendMessage()} color="primary">
                Send
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}
