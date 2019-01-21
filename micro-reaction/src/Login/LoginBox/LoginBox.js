import React, { Component } from "react";
import fb from "../../utils/firebaseWrapper";
import { observer, inject } from "mobx-react";
// import "./LoginBox.css";

@inject("users")
@observer
class LoginBox extends Component {
  state = {
    email: "",
    password: "",
    isClickable: true
  };

  login = async handleLogin => {
    this.setState({ isClickable: false });
    this.props.loginTryingTrue();
    try {
      const { email, password } = this.state;
      // const { error } =
      await fb.login(email, password).then(function(error) {
        console.log("error", error);
        if (error) {
          alert(`${error.errorMessage} (CODE: ${error.error})`);
          return;
        }
        handleLogin();
      });
      this.setState({ isClickable: true });
      this.props.loginTryingFalse();
      const currentUserInfo = fb.getUserInfo();
      const userStore = this.props.users;
      userStore.initUserInfo(
        currentUserInfo.userId,
        currentUserInfo.createdAt,
        currentUserInfo.email,
        currentUserInfo.name
      );
      return;
    } catch (e) {
      console.log(e);
      this.setState({ isClickable: true });
      this.props.loginTryingFalse();
      return;
    }
  };

  handleButtonClick = (e, handleLogin) => {
    // console.log(this.state.email, this.state.password);
    e.preventDefault();
    this.login(handleLogin);
    // this.props.handleLogin();
    this.setState({ isClickable: true });
  };

  render() {
    const { handleLogin } = this.props;
    return (
      <div className="inner-container">
        <div className="header">Login</div>
        <div className="box">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              className="login-input"
              placeholder="Email"
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"
              onChange={e => {
                this.setState({ password: e.target.value });
              }}
            />
          </div>
          <button
            type="button"
            className="login-btn"
            onClick={e => {
              this.handleButtonClick(e, handleLogin);
            }}
            disabled={!this.state.isClickable}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default LoginBox;
// import React, { Component } from "react";
// import fb from "../utils/firebaseWrapper";
// import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
// import "./Login.css";

// export default class Login extends Component {
//   state = {
//     email: "",
//     password: "",
//     isClickable: true
//   };

// login = async () => {
//   this.setState({ isClickable: false });
//   try {
//     const { email, password } = this.state;
//     const { error } = await fb.login(email, password);
//     if (error) {
//       let message;
//       switch (error) {
//         case "auth/invalid-email":
//           message = "유효하지 않은 이메일 입니다.";
//           break;
//         case "auth/e-disabled":
//           message = "비활성화된 계정입니다.";
//           break;
//         case "auth/e-not-found":
//           message = "존재 하지 않는 계정입니다.";
//           break;
//         case "auth/wrong-password":
//           message = "비밀번호가 다릅니다.";
//           break;
//         default:
//           message = "유효하지 않은 계정입니다.";
//       }
//       alert(`Error: ${message}`);
//       this.setState({ isClickable: true });
//       return;
//     }
//     this.props.handleLogin();
//   } catch (e) {
//     console.log(e);
//     this.setState({ isClickable: true });
//     return;
//   }
// };

// handleButtonClick = e => {
//   console.log(this.state.email, this.state.password);
//   e.preventDefault();
//   this.login();
//   // this.props.handleLogin();
//   this.setState({ email: "", password: "", isClickable: true });
// };

//   validateForm() {
//     return this.state.email.length > 0 && this.state.password.length > 0;
//   }

//   render() {
//     const { handleLogin } = this.props;
//     return (
//       <div className="login_container">
//         <form>
//           <label>
//             E-mail:
//             <input
//               type="text"
//               e-mail="e-mail"
//               value={this.state.email}
//               onChange={e => {
//                 this.setState({ email: e.target.value });
//               }}
//             />
//           </label>
//           <label>
//             password:
//             <input
//               type="text"
//               password="password"
//               value={this.state.password}
//               onChange={e => {
//                 this.setState({ password: e.target.value });
//               }}
//             />
//           </label>
//           <button
//             onClick={e => {
//               this.handleButtonClick(e);
//             }}
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     );
//   }
// }
