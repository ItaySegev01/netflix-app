// import React from 'react'
// import {useState} from 'react'
// import { useNavigate,Link } from 'react-router-dom';

// function LoginPage() {

//     const [email,setEmail] = useState('');
//     const [password,setPassword] = useState('');

//     const navigate = useNavigate();

//   return (
//     <div className="login">
//       <div className="top">
//         <div className="wrapper">
//           <img
//             className="logo"
//             src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
//             alt=""
//           />
//         </div>
//       </div>
//       <div className="container">
//         <form>
//           <h1>Sign In</h1>
//           <input
//             type="email"
//             placeholder="Email or phone number"
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button
//             className="loginButton"
//             onClick={handleLogin}
//             disabled={isFetching}
//           >
//             Sign In
//           </button>
//           <span>
//             New to Netflix?{' '}
//             <Link className="link link-signin" to="/register">
//               Sign up now.
//             </Link>
//           </span>
//           <small>
//             This page is protected by Google reCAPTCHA to ensure you're not a
//             bot.
//           </small>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default LoginPage