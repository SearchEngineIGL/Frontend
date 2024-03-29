import {useState, useContext} from "react"
import {Forget_pop_up} from "../components/Forget_pop_up"
import AuthContext from '../context/AuthContext'
export const Otp = () => {
    const [otp, setOtp] = useState();
    const {otpVerify} = useContext(AuthContext)
    const handleChangeOtp = (value) => {
        setOtp(value); // the value containsthe real otp
        console.log(otp);
    }
    const handleVerify = () => {
        otpVerify(otp)
    }
    const handleResend = () => {
        
    }
    return (
        <div
            className=" flex app2 justify-center w-full
         h-[100vh] items-center">
            <Forget_pop_up
                handleChange={handleChangeOtp}
                title="OTP Verification"
                body="To ensure the security of your account, we need to verify your email address. Please check your email inbox for a message from us. Copy the One-Time Password (OTP) provided in the email and paste it below to complete the verification process.
        "
                question="Didn’t receive the  OTP number ?"
                act="Resend"
                placeholder="OTP number"
                content="Confirmer"
                onClick={handleVerify}
                onClick2={handleResend}
                input={true}/>
        </div>
    )

}