import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import '../assets/styles/Checkout.css'
import { Stepper, Step, StepLabel } from '@mui/material'

import CheckoutDetails from '../components/Checkout/CheckoutDetails'
import ShippingInformation from '../components/Checkout/ShippingInformation'
import PreviewOrder from '../components/Checkout/PreviewOrder'

const Checkout = () => {
    const cartsGlobal = useSelector((state) => state.carts);
    const steps = ['Checkout Details', 'Shipping Information', 'Preview Order', 'Payment Confirmation']
    const [total, settotal] = useState()
    const [shippingInformation, setshippingInformation] = useState()
    const [previewOrder, setpreviewOrder] = useState()
    const [step, setStep] = useState(0)

    // go back to previous step
    const prevStep = () => {
        setStep(step - 1);
    }
    console.log(cartsGlobal);

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

    const Form = () => (step === 0
        ? <CheckoutDetails nextStep={nextStep} handleChange={handleChangetotal} />
        : step === 1 ? <ShippingInformation nextStep={nextStep} prevStep={prevStep} handleChange={handleChangeshippingInformation} />
            : step === 2 ? <PreviewOrder nextStep={nextStep} prevStep={prevStep} handleChange={handleChangepreviewOrder} total={total} shippingInformation={shippingInformation} />

                : null)


    return (
        <div className="body-checkout">
            {(Object.keys(cartsGlobal).length === 0 && cartsGlobal.constructor === Object) ?
                <div>Tidak ada cart</div>
                :
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
            }
        </div>
    )


}

export default Checkout
