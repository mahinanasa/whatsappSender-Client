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
  TextareaAutosize,
  Fab,
  Chip,
  Typography
} from '@mui/material';
import {
  getQrCode,
  sendMessages,
  logout,
} from 'src/redux/_actions/leadAction';
import  Loader  from '../../Loader'
import { ClassNames } from '@emotion/react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
ProductList.propTypes = {
  products: PropTypes.array.isRequired
};

export default function ProductList({ products, ...other }) {
  const dispatch = useDispatch();
  const [statusData, setStatusData] = useState(null);
  const [open, setOpen] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
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
      
      if (!userDetails || (userDetails && Object.keys(userDetails).length === 0)) {
        await getStatus();
      }
    }, 2000);
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
    if(mobileNumber !== ""){
      let tempMsg = message
      selectedFile !== '' && selectedFile.length > 0 && (tempMsg = "  ")
      if(tempMsg !== ""){
      const res = await dispatch(sendMessages({ mobileNo: mobileNumber, message: tempMsg, selectedFiles: selectedFile }));
      
      if(res && res.sent){
        setSelectedFile("")
        setMessage("")
        
      }
    }
    }
  };

  const logoutFn = async() => {
    
    const res = await dispatch(logout());
    
    if(res){
      setUserDetails("");
    }
  }

  const handleUploadClick = async(e)=>{
    
    let files = Array.from(e.target.files)
   let arr = [...selectedFile]
   for(let i=0; i < files.length; i++){
     let base64Url = await getBase64File(files[i])
     arr.push({dataUrl: base64Url, fileName: files[i].name})
     if(i === files.length - 1)setSelectedFile(arr)
   }
   

  }
  const getBase64File = async(file) => {
    const reader = new FileReader()
    return new Promise((resolve, reject) =>{
      reader.onloadend = (e) =>{
        resolve(e.target.result)
      }
      reader.readAsDataURL(file)
    })
  }

  const handleDelete = (file) =>{
    
    setSelectedFile((chips) => chips.filter(chip => chip.fileName !== file.fileName))
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
                open={open}
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
                  <Button
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    Close
                  </Button>
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
            <Grid item xs={3}>
              <input
                  accept=""
                  style={{display: 'none'}}
                  multiple
                  type="file"
                  id="contained-button-file"
                  onChange={(e)=>handleUploadClick(e)}
                  />
                  <label 
                  htmlFor="contained-button-file">
                    <Fab component="span"
                    className={ClassNames.button}>
                      <AttachFileIcon/> 
                    </Fab>
                  </label>
            </Grid>
            <Grid
            item
            justify="flex-start" xs={9}
            >
              {
                selectedFile && selectedFile.length > 0 &&
                <>
                File Selected: 
                <Grid
                container spacing={0}>
                  {
                    selectedFile.map(v =>{ return (
                      <Grid item xs={6}> 
                      <Chip onDelete={(e)=>handleDelete(v)} className="m-2" label={v.fileName}/> 
                      </Grid>
                    )} 
                      )
                  }

                </Grid>
                </>
              }
              
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
