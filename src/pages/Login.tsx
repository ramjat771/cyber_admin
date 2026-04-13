import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === "1234") {
      localStorage.setItem("auth", "true");
      navigate("/home");
    } else {
      alert("Wrong password ❌");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>🔐 Admin Login</h2>

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
  },
  card: {
    padding: "30px",
    background: "#1e293b",
    borderRadius: "10px",
    color: "white",
    textAlign: "center",
  },
  input: {
    padding: "10px",
    marginTop: "10px",
    width: "200px",
  },
  button: {
    marginTop: "15px",
    padding: "10px 20px",
    cursor: "pointer",
  },
};

export default Login;