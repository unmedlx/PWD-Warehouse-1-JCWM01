import React, { Component, useState } from 'react'
import '../assets/styles/Checkout.css'
import { Stepper, Step, StepLabel } from '@mui/material'

import CheckoutDetails from '../components/Checkout/CheckoutDetails'

const Checkout = () => {
    const steps = ['Checkout Details', 'Shipping Information', 'Preview Order', 'Payment Confirmation']
    const [checkoutDetails, setcheckoutDetails] = useState()
    const [personalDetails, setPersonalDetails] = useState()
    const [step, setStep] = useState(0)

    // go back to previous step
    const prevStep = () => {
        setStep(step - 1);
    }

    // proceed to the next step
    const nextStep = () => {
        setStep(step + 1);
    }

    // Handle fields change
    const handleChangecheckoutDetailss = (data) => {
        setcheckoutDetails(data);
    }

    const handleChangePersonalDetails = (data) => {
        setPersonalDetails(data)
    }

    const Form = () => (step === 0
        ? <CheckoutDetails nextStep={nextStep} handleChange={handleChangecheckoutDetailss} />
        : null)


    return (
        <div className="body-checkout">
            <div className="auth-container p-5">
                <Stepper activeStep={step} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Form />
            </div>
        </div>
    )


}

export default Checkout
