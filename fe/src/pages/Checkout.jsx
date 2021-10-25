import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import '../assets/styles/Checkout.css'
import { Stepper, Step, StepLabel } from '@mui/material'
import {
    makeStyles
} from "@material-ui/core";

import CheckoutDetails from '../components/Checkout/CheckoutDetails'
import ShippingInformation from '../components/Checkout/ShippingInformation'
import PreviewOrder from '../components/Checkout/PreviewOrder'
import PaymentConfirmation from '../components/Checkout/PaymentConfirmation'

const Checkout = () => {
    const addressGlobal = useSelector(state => state.addresses)
    const cartsGlobal = useSelector((state) => state.carts);
    const steps = ['Checkout Details', 'Shipping Information', 'Order Summary', 'Payment Confirmation']
    const [total, settotal] = useState()
    const [shippingInformation, setshippingInformation] = useState()
    const [previewOrder, setpreviewOrder] = useState()
    const [paymentConfirmation, setpaymentConfirmation] = useState()
    const [step, setStep] = useState(0)

    // const addressLength = addressGlobal.length
    // console.log(addressLength);

    const useStyles = makeStyles(() => ({
        root: {
            "& .MuiStepIcon-active": { color: "yellow" },
            "& .MuiStepIcon-completed": { color: "green" },
            "& .Mui-disabled .MuiStepIcon-root": { color: "#32b280" }
        }
    }));
    const c = useStyles()

    // go back to previous step
    const prevStep = () => {
        setStep(step - 1);
    }

    // proceed to the next step
    const nextStep = () => {
        setStep(step + 1);
    }

    // Handle fields change
    const handleChangetotal = (data) => {
        settotal(data);
    }
    const handleChangeshippingInformation = (data) => {
        setshippingInformation(data)
    }
    const handleChangepreviewOrder = (data) => {
        setpreviewOrder(data)
    }
    const handleChangepaymentConfirmation = (data) => {
        setpaymentConfirmation(data)
    }

    const Form = () => (step === 0
        ? <CheckoutDetails nextStep={nextStep} handleChange={handleChangetotal} />
        : step === 1 ? <ShippingInformation nextStep={nextStep} prevStep={prevStep} handleChange={handleChangeshippingInformation} />
            : step === 2 ? <PreviewOrder nextStep={nextStep} prevStep={prevStep} handleChange={handleChangepreviewOrder} total={total} shippingInformation={shippingInformation} />
                : step === 3 ? <PaymentConfirmation nextStep={nextStep} prevStep={prevStep} handleChange={handleChangepaymentConfirmation} total={total} shippingInformation={shippingInformation} previewOrder={previewOrder} />

                    : null)


    // if (addressLength === 0) {
    //     alert("Please enter address at profile page")
    //     window.location = "/address"
    //     // console.log("aku gak boleh masuk gapunya rumah"); 
    // } else {

    return (
        <>
            <div className="body-checkout">
                {(Object.keys(cartsGlobal).length === 0 && cartsGlobal.constructor === Object) ?
                    <div>Tidak ada cart</div>
                    :
                    <div className="checkout-container p-5 mt-5">
                        <Stepper className={c.root} activeStep={step} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <Form />
                    </div>
                }
            </div>
        </>
    )


}

export default Checkout
