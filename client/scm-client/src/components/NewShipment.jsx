import React from 'react'
import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { TextField, Snackbar, Alert } from '@mui/material'
import { useFormContext } from '../contexts/FormContext';
import LoadingButton from '@mui/lab/LoadingButton';


const NewShipment = ({ open, onClose, children }) => {
    const dialog = useRef();
    const [snackBarVisibility, setSnackBarVisibility] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("Test Message");
    const [snackBarType, setSnackBarType] = useState("success");
    const [loading, setLoading] = useState(false);
    const { formValues, updateFormValue } = useFormContext();

    useEffect(() => {
        if (open) {
            dialog.current.showModal();
        }
        else {
            dialog.current.close();
        }
    }, [open]);

    const handleFormValues = (e) => {
        updateFormValue(e.target.name, e.target.value);
    }

    const customSnackBar = () => (
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={snackBarVisibility} autoHideDuration={6000} onClose={() => setSnackBarVisibility(false)}>
            <Alert onClose={() => setSnackBarVisibility(false)} severity={snackBarType} sx={{ width: '100%' }}>
                {snackBarMessage}
            </Alert>
        </Snackbar>
    );

    const createShipment = async () => {
        setLoading(true);
        if (!formValues.uid || !formValues.ShipmentName || !formValues.supplier || !formValues.quantity) {
            setSnackBarType("warning");
            setSnackBarMessage("All Fields are required");
            setSnackBarVisibility(true);
            setLoading(false);

        }
        else {
            console.log(typeof (parseInt(formValues.quantity)));
            console.log(formValues);

            fetch('http://localhost:3000/shipment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ShipmentName: formValues.ShipmentName,
                    uid: formValues.uid,
                    supplier: formValues.supplier,
                    quantity: parseInt(formValues.quantity)
                }),
            })
                .then(res => res.json())
                .then(resData => {
                    console.log(resData)
                    if(resData.msg && resData.msg.includes("Shipment with uid already exists!"))setSnackBarType('error');
                    else setSnackBarType('success');
                    setSnackBarMessage(resData.msg);
                    setSnackBarVisibility(true);
                    setLoading(false);
                }
                )
                .catch(e => {console.log(e)
                    setSnackBarType('error');
                    setSnackBarMessage(e.msg);
                    setSnackBarVisibility(true);
                    setLoading(false);
                }
                )
        }
    }

    return createPortal(
        <dialog className="modalC h-[100vh] mx-auto my-auto w-[50%] opacity-95 backdrop:opacity-50 px-3 py-3" ref={dialog} onClose={onClose}>
            
            {open ? <div className=' flex flex-col basis-1/2 gap-4 w-[80%] mx-auto'>
                <div className='flex justify-between'><p className='poppins-regular text-lg my-4 mx-2 tracking-wide'><span className=' text-[#292929] poppins-medium'>Create</span> Shipment</p>
                    <button className='hover:text-[#2181f8]' onClick={onClose}>Cancel</button>
                </div>
                {customSnackBar()}
                <TextField
                    type="text"
                    value={formValues.uid || ''}
                    name="uid"
                    label="Enter RFID UID"
                    onChange={handleFormValues}
                    required

                />

                <TextField
                    type="text"
                    value={formValues.ShipmentName || ''}
                    name="ShipmentName"
                    label="Enter Shipment Name"
                    onChange={handleFormValues}
                    required

                />

                <TextField
                    type="number"
                    value={formValues.quantity || ''}
                    name="quantity"
                    label="Shipment Quantity"
                    onChange={handleFormValues}
                    required

                />

                <TextField
                    type="text"
                    value={formValues.supplier || ''}
                    name="supplier"
                    label="Enter Supplier Name"
                    onChange={handleFormValues}
                    required

                />

                <label className='text-sm'>Upload a suitable Image</label>
                <input type='file' accept='image/*' onChange={(e) => setImageUrl(e.target.files[0])} />


                {/* <LoadingButton loading={uploading} onClick={uploadFiles} variant='outined' size='large' sx={{
                        color: "#2181f8"
                    }}>
                        Upload Images To IPFS
                    </LoadingButton> */}
                <LoadingButton loading={loading} onClick={createShipment} disableElevation size='large' variant='contained' sx={{
                    backgroundColor: '#292929',
                    color: '#ffffff',
                    font: 'bold'
                }}>
                    Create Shipment
                </LoadingButton>

            </div> : null}
        </dialog>,
        document.getElementById('modal')
    );
}

export default NewShipment