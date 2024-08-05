'use client'
import { useState, useEffect } from 'react'
import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material'
import { firestore } from '@/firebase'
import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    deleteDoc,
    getDoc,
} from 'firebase/firestore'
import Header from './header';
import Sidebar from './sidebar';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
}



//export default function Home() {
const App = () => {
  // We'll add our component logic here
    const [isMainPage, setIsMainPage] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [inventory, setInventory] = useState([]);
    const [open, setOpen] = useState(false);
    const [itemName, setItemName] = useState('');

    const updateInventory = async () => {
        const snapshot = query(collection(firestore, 'fridge'));
        const docs = await getDocs(snapshot);
        const inventoryList = [];
        docs.forEach((doc) => {
            inventoryList.push({ name: doc.id, ...doc.data() })
        });
        setInventory(inventoryList);
    };
    
    useEffect(() => {
        updateInventory();
    }, []);
    
    const addItem = async (item) => {
        const docRef = doc(collection(firestore, 'fridge'), item);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const { quantity } = docSnap.data();
            await setDoc(docRef, { quantity: quantity + 1 });
        }
        else {
            await setDoc(docRef, { quantity: 1 });
        }
        await updateInventory();
    };

    const removeItem = async (item) => {
        const docRef = doc(collection(firestore, 'fridge'), item);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const { quantity } = docSnap.data();
            if (quantity === 1) {
                await deleteDoc(docRef);
            }
            else {
                await setDoc(docRef, { quantity: quantity - 1 });
            }
        }
        await updateInventory();
    };
    
    return(
      <div>
        {isMainPage ? (
        <Box
            width="100vw"
            height="100vh"
            display={'flex'}
            justifyContent={'center'}
            flexDirection={'column'}
            alignItems={'center'}
            gap={2}
           // bgcolor = {"#000000"}
        >
          <Sidebar/> {/* Add the Sidebar component */}
        <Header/>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add Item
                    </Typography>
                    <Stack width="100%" direction={'row'} spacing={2}>
                        <TextField
                            id="outlined-basic"
                            label="Item"
                            variant="outlined"
                            fullWidth
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                        />
                    <Button
                        variant="outlined"
                        onClick={() => {
                            addItem(itemName)
                            setItemName('')
                            handleClose()
                        }}
                        sx={{
                          backgroundColor: '#ADD8E6', // Custom background color
                          color: '#ffffff',           // Custom text color
                          '&:hover': {
                            backgroundColor: '#e64a19', // Custom hover color
                          },
                        }}
                    >
                        Add
                    </Button>
                </Stack>
            </Box>
        </Modal>
        <Button 
          variant="contained" 
          onClick={handleOpen}
          sx={{
            backgroundColor: '#797ef6', // Custom background color
            color: '#ffffff',           // Custom text color
            '&:hover': {
              backgroundColor: '#40E0D0', // Custom hover color
            },
          }}
        >
            Add New Item
        </Button>
        <Box border={'5px solid #333'} borderRadius={10} sx = {{border : '8px solid #000'}}>
            <Box
                width="800px"
                height="100px"
                bgcolor={'#797ef6'} //ADD8E6
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                borderRadius={8}
                
                
            >
                <Typography variant={'h2'} color={'#ffffff'} textAlign={'center'}>
                    Inventory Items
                </Typography>
            </Box>
            <Stack width="800px" height="300px" spacing={2} overflow={'auto'} borderRadius={9} >
                {inventory.map(({name, quantity}) => (
                    <Box
                        key={name}
                        width="100%"
                        minHeight="100px"
                        display={'flex'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        bgcolor={'#f0f0f0'}
                        paddingX={5}
                    >
                        <Typography variant={'h3'} color={'#797ef6'} textAlign={'center'} sx={{ fontSize: '20px' }}>
                            {name.charAt(0).toUpperCase() + name.slice(1)}
                        </Typography>
                        <Typography variant={'h3'} color={'#797ef6'} textAlign={'center'} sx={{ fontSize: '20px' }}>
                            Quantity: {quantity}
                        </Typography>
                        <Button 
                          variant="contained" 
                          onClick={() => removeItem(name)} 
                          sx={{
                            backgroundColor: '#797ef6', // Custom background color
                            color: '#ffffff',           // Custom text color
                            '&:hover': {
                              backgroundColor: '#40E0D0', // Custom hover color
                            },
                          }}>
                            Remove
                        </Button>
                    </Box>
                ))}
            </Stack>
        </Box>
    </Box>
  ) :
  (
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        bgcolor="#000000" // Black background for initial page
      >
        <Header backgroundColor={'#000000'}/>
        <Button
          variant="contained"
          onClick={() => setIsMainPage(true)}
          mt = {2}
          sx={{
            backgroundColor: '#797ef6', // Custom background color
            color: '#ffffff',           // Custom text color
            '&:hover': {
              backgroundColor: '#40E0D0', // Custom hover color
            },
            mt : 2
          }}
        >
          Start Managing Inventory Now
        </Button>
        <Box>
          <Typography 
            variant = {'h6'}
            spacing = {2}
            sx = {{
              color: '#797ef6', 
              fontStyle: 'italic', 
              mt : 2
            }}>
            Items you add and remove are updated in real time, helping you keep track of what&apos;s in your kitchen. 
          </Typography>
        </Box>
      </Box>
    )}
  </div>
  );
};
export default App;
