import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "nome",
      headerName: "Nome",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "nomeUsuario",
      headerName: "Nome do usuário",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "dataRegistro",
      headerName: "Data de registro",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Nível de acesso",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={colors.greenAccent[700]}
            borderRadius="4px"
          >
            <LockOpenOutlinedIcon />
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              Cliente
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "id",
      headerName: "Ações",
      flex: 1,
      renderCell: ({ row: { id } }) => {
        return (
          <Box width="60%" m="0 auto" p="5px">
            <Button
              onClick={() => apagarUsuario(id)}
              type="submit"
              color="secondary"
              variant="contained"
            >
              Apagar
            </Button>
          </Box>
        );
      },
    },
  ];

  const [user, setUser] = useState({
    nome: "",
    clienteID: "",
  });
  const [users, setUsers] = useState([]);

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

  const getUsers = async () => {
    await axios
      .post("https://nodered.brenopereira.com.br/api/recuperarUsuarios", {
        clienteID: user.clienteID,
      })
      .then(async (res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (user.nome.length) {
      getUsers();
    }
  }, [user]);

  const apagarUsuario = async (usuario) => {
    await axios
      .post("https://nodered.brenopereira.com.br/api/deletarUsuario", {
        id: usuario,
      })
      .then(async (res) => {
        alert("Usuário deletado com sucesso");
        window.location.href = "/team";
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box m="20px">
      <Header title="Usuários" subtitle="Gerenciar os usuários" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={users} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
