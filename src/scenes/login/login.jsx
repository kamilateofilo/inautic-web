import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image } from 'react'; // Substitua por componentes do React para web
import { IoEye, IoEyeOff } from "react-icons/io5";
import axios from 'axios';

const Login = ({ history }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://nodered.brenopereira.com.br/api/autentica", {
        usuario,
        senha,
      });
  
      if (response.data.length) {
        const user = JSON.stringify(response.data[0]);
        localStorage.setItem("@inautic/user", user);
        console.log(localStorage.getItem("@inautic/user"));
        window.location.href="/home"
      } else {
        alert("Usuário não encontrado.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div style={styles.container}>
  
        <div style={styles.content}>
          <img
            style={styles.logo}
            src={require("../../assents/logo.png")} // Substitua por uma importação adequada para web
            alt="Logo"
          />
        </div>
    <div style={styles.login}>
      <div style={styles.contentAction}>
        <p style={styles.text}>Entrar com sua conta</p>
      </div>

      <div style={styles.formContainer}>
        <div style={styles.form}>
          <p style={styles.label}>Usuário</p>
          <div style={styles.formGroup}>
            <input
              placeholder="Digite o nome do seu usuário"
              style={styles.input}
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>
        </div>

        <div style={styles.formContainer}>
        <div style={styles.senha1}>
          <p style={styles.senha}>Senha</p>
          <div style={styles.formGroupPassword}>
            <input
              placeholder="Digite a sua senha"
              style={styles.input}
              type={isPasswordShown ? "text" : "password"}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            </div>
          </div>

            <button
              onClick={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: "absolute",
                right: 12,
                marginRight:605,
                marginTop:-39,
                border: 'none',
                backgroundColor: "#FFF"
              }}
            >
              {isPasswordShown ? (
                <IoEyeOff size={24} color="#000" />
              ) : (
                <IoEye size={24} color="#000" />
              )}
            </button>
          </div>
        </div>

        <button
          onClick={() => handleLogin()}
          style={styles.action}
        >
          <p style={styles.actionText}>Logar</p>
        </button>
      </div>
     
    </div>
  
);
};

const styles = {
container: {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  backgroundColor:'#1F2A40'
},

content: {
  marginTop: "10%",
  justifyContent: "center",
  alignItems: "center",
 
},
login: {
  marginTop: -50
},
logo: {
  width: 280,
  height: 150,
  marginLeft: 620,
  marginTop:-50
},
contentAction: {
  padding: 24,
  marginBottom: -100
},
text: {
  fontSize: 18,
  marginBottom:50,
  fontWeight: "bold",
  textAlign: "center",
},
formContainer: {
  padding: 24,
},
form: {
  marginBottom: -30,
  marginLeft: 599,
  width: 303
},
label: {
  color: "#FFF",
  fontSize: 16,
  fontWeight: 400,
  marginVertical: 8,
 
},
senha: {
  marginLeft:300,
  color: "#FFF",
  fontSize: 16,
  fontWeight: 400,
  marginVertical: 8,
},
senha1:{
  marginLeft:280
},
formGroup: {
  borderRadius: 8,
  justifyContent: "center",
  width:400, 
},
input: {
  padding: 16,
  width: 300
},
formGroupPassword: {
  borderRadius: 8,
  marginLeft:296,
  width:403, 
  justifyContent: "center",
},
action: {
  backgroundColor: "#0B54EE",
  border: "1px solid #FFF",
  color: "#fff",
  padding: 16,
  marginBottom: 35,
  borderRadius:16,
  cursor: "pointer",
  height: 50,
  marginLeft: 730
},
actionText: {
  textAlign: "center",
  fontSize: 15,
  fontWeight: "bold",
  color: "#fff",
  marginTop: 2
},
};



export default Login;
