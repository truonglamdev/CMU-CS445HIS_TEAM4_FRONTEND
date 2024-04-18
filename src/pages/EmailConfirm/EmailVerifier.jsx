import './EmailVerifier.css';
import { BiCheckboxChecked } from 'react-icons/bi';
function EmailVerifier() {
    return (
        <div className="email-verifier-container">
            <div className="content">
                <h1 >
                    Welcome
                    <i>
                        <BiCheckboxChecked />
                    </i>
                </h1>
                <div >Your account has been verified</div>
                <p>
                    <button href="" className='btn-backlog'>Go to Login</button>
                    <button href="" className='btn-verify'>Resend Verification Email</button>
                </p>
            </div>
        </div>
    );
}
export default EmailVerifier;
