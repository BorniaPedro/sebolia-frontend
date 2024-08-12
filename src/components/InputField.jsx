import { useState } from "react";

const SocialLogin = ({type ,placeholder, icon}) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    return (
        <div className="input-wrapper">
          <input type={isPasswordShown ? 'text' : type} placeholder={placeholder} className="input-field" required />
          <i class="material-symbols-outlined">{icon}</i>
            {type === 'password' && (<i onCLick={() => setIsPasswordShown(prevState => !prevState)} className="material-symbols-outlined eye-icon"> {isPasswordShown ? 'visibility' : 'visibility_off'} </i>)}
        </div>
    )
}

export default SocialLogin