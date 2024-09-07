"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Button,
  FormControl,
  IconButton,
  LinearProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
// import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";
import axios from "axios";
import theme from "@/theme";

const OutwardsPage = () => {
  const router = useRouter();
  const [outwardsData, setoutwardsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_ENDPOINT}/meetings`
        );
        const sortedData = response.data.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );

        // Add custom ID to each meeting
        const dataWithCustomId = sortedData.map((meeting, index) => ({
          ...meeting,
          customId: `M${(index + 1).toString().padStart(4, "0")}`,
        }));

        setoutwardsData(dataWithCustomId);
      } catch (error) {
        console.error("Error fetching meetings data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const outwardsColumns = [
    { field: "customId", headerName: "ID", flex: 1 },
    { field: "meetingTitle", headerName: "Title", flex: 1 },
    { field: "meetingDescription", headerName: "Description", flex: 2 },
    { field: "location", headerName: "Location", flex: 1 },
    {
      field: "responsiblePerson",
      headerName: "Responsible Person",
      flex: 1,
      renderCell: (params) =>
        `${params.row.responsiblePerson?.first_name || ""} ${params.row.responsiblePerson?.last_name || ""}`,
    },
    {
      field: "assignedBy",
      headerName: "Assigned By",
      flex: 1,
      renderCell: (params) =>
        `${params.row.assignedBy?.first_name || ""} ${params.row.assignedBy?.last_name || ""}`,
    },
    {
      field: "assignedDate",
      headerName: "Assigned Date",
      flex: 1,
      renderCell: (params) =>
        `${new Date(params.row.assignedDate).toLocaleDateString() || ""}`,
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      flex: 1,
      renderCell: (params) =>
        `${new Date(params.row.dueDate).toLocaleDateString() || ""}`,
    }
  ];

  const handleRowClick = (params) => {
    router.push(`/meetings/${params.row._id}`);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        bgcolor: theme.palette.background.default,
        height: "90vh",
        display: "flex",
        overflow: "scroll",
        flexDirection: "column",
        padding: 2,
        gap: 2,
      }}
    >
      {/* <Paper
        sx={{
          minHeight: "12vh",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
        }}
      >

        <FormControl variant="outlined" size="small">
          <Button
            variant="contained"
            sx={{ borderRadius: 0 }}
            onClick={() => router.push("/meetings/create")}
          >
            Add data
          </Button>
        </FormControl>
      </Paper> */}

      <Paper sx={{ height: "100vh" }}>
        {loading ? (
          <LinearProgress />
        ) : (
          <DataGrid
            rows={outwardsData}
            columns={outwardsColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={(row) => row._id}
            onRowClick={handleRowClick}
          />
        )}
      </Paper>
    </Box>
  );
};

export default OutwardsPage;
