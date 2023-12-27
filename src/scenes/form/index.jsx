import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [user, setUser] = useState({
    nome: "",
    clienteID: "",
  });
  const [loading, setLoading] = useState(false);

  const getUser = () => {
    const data = localStorage.getItem("@inautic/user");

    if (data) {
      setUser(JSON.parse(data));
    } else {
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleFormSubmit = async (values) => {
    await axios
      .post("https://nodered.brenopereira.com.br/api/criarUsuario", {
        ...values,
        clienteID: user.clienteID,
      })
      .then(async (res) => {
        setLoading(false);
        alert("Usuário cadastrado com sucesso");
        window.location.href = "/Dashboard";
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box m="20px">
      <Header title="Cadastrar usuário" subtitle="Criar um novo usuário" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nome completo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nome}
                name="nome"
                error={!!touched.nome && !!errors.nome}
                helperText={touched.nome && errors.nome}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nome do usuário"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nomeUsuario}
                name="nomeUsuario"
                error={!!touched.nomeUsuario && !!errors.nomeUsuario}
                helperText={touched.nomeUsuario && errors.nomeUsuario}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="E-mail"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Senha"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.senha}
                name="senha"
                error={!!touched.senha && !!errors.senha}
                helperText={touched.senha && errors.senha}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                disabled={loading}
                type="submit"
                color="secondary"
                variant="contained"
              >
                Criar
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  nome: yup.string().required("Obrigatório"),
  nomeUsuario: yup.string().required("Obrigatório"),
  email: yup.string().email("E-mail inválido").required("Obrigatório"),
  senha: yup.string().required("Obrigatório"),
});
const initialValues = {
  nome: "",
  nomeUsuario: "",
  email: "",
  senha: "",
};

export default Form;
