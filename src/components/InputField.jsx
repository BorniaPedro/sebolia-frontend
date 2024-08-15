
const SocialLogin = ({type ,placeholder, icon}) => {
    return (
        <div className="input-wrapper">
          <input type={type} placeholder={placeholder} className="input-field" required />
          <i class="material-symbols-outlined">{icon}</i>
        </div>
    )
}

export default SocialLogin