import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkLogin } from "../../redux/session";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";


function LoginFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    const validationErrors = {};
    if (!email.trim()) validationErrors.email = "Email is required.";
    if (!password.trim()) validationErrors.password = "Password is required.";
    return validationErrors;
  };


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    const serverResponse = await dispatch(thunkLogin({ email, password }));
    setLoading(false);

    if (serverResponse?.errors) {
      setErrors(serverResponse.errors);
    } else {
      closeModal();
      if (serverResponse?.is_admin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const serverResponse = await dispatch(
      thunkLogin({
        email: "demo@aa.io",
        password: "password",
      })
    );
    setLoading(false);

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h1>Log In</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="modal-form">
          <div className="input-fields">
            <label htmlFor="email" className="email-label">
              Email:
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="email-input"
              disabled={loading}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}

            <label htmlFor="password" className="password-label">
              Password:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="password-input"
              disabled={loading}
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          {errors.message && <p className="error-text">{errors.message}</p>}

          {loading && <p className="loading-text">Logging in...</p>}

          <div className="login-buttons">
            <button className="log-in-button" type="submit" disabled={loading}>
              Log In
            </button>
            <button
              className="log-in-demo-button"
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
            >
              Demo Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
