import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Alert,
  Card,
  CardContent,
} from "@mui/material";
import { FaCar, FaFileVideo, FaDownload } from "react-icons/fa";

function HelloUser() {
  const [state, setState] = useState("");
  const [speedLimit, setSpeedLimit] = useState("");
  const [file, setFile] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fileInfo, setFileInfo] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Fetch initial state from location or localStorage
  useEffect(() => {
    const storedState = localStorage.getItem("selectedState");
    if (location.state?.selectedState) {
      setState(location.state.selectedState);
    } else if (storedState) {
      setState(storedState);
    } else {
      setErrorMessage("State information is missing. Please log in again.");
    }
  }, [location.state]);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith("video/")) {
        setErrorMessage("Only video files are allowed.");
        setFile(null);
        return;
      }

      if (selectedFile.size > 50 * 1024 * 1024) {
        setErrorMessage("File size exceeds the 50MB limit.");
        setFile(null);
        setFileInfo(null);
      } else {
        setFile(selectedFile);
        setFileInfo({
          name: selectedFile.name,
          size: (selectedFile.size / 1024 / 1024).toFixed(2) + " MB",
          type: selectedFile.type,
        });
        setErrorMessage("");
      }
    }
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !state || !speedLimit) {
      setErrorMessage("Please complete all fields and select a valid file.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    const formData = new FormData();
    formData.append("video", file);
    formData.append("state", state);
    formData.append("speed_limit", speedLimit);

    try {
      const response = await axios.post(
        "http://localhost:5000/process_video",
        formData,
        {
          responseType: "blob", // Expecting ZIP file response
        }
      );
      const blob = new Blob([response.data], { type: "application/zip" });
      const downloadUrl = URL.createObjectURL(blob);
      setDownloadLink(downloadUrl);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "An error occurred while processing the video. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: 3,
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" textAlign="center" gutterBottom>
        Vehicle Video Processor
      </Typography>

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="State"
          value={state}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
            startAdornment: <FaCar style={{ marginRight: 8 }} />,
          }}
        />

        <TextField
          label="Speed Limit (km/h)"
          type="number"
          value={speedLimit}
          onChange={(e) => setSpeedLimit(e.target.value)}
          fullWidth
          margin="normal"
          required
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mt: 2,
            mb: 3,
          }}
        >
          <Button
            variant="contained"
            component="label"
            sx={{ flex: 1, backgroundColor: "#007bff" }}
          >
            <FaFileVideo style={{ marginRight: 8 }} />
            Upload Video
            <input
              type="file"
              hidden
              accept="video/*"
              onChange={handleFileChange}
            />
          </Button>

          {fileInfo && (
            <Card variant="outlined" sx={{ flex: 2, padding: 1 }}>
              <CardContent>
                <Typography variant="body2">
                  <strong>File:</strong> {fileInfo.name}
                </Typography>
                <Typography variant="body2">
                  <strong>Size:</strong> {fileInfo.size}
                </Typography>
                <Typography variant="body2">
                  <strong>Type:</strong> {fileInfo.type}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={isLoading}
          sx={{
            py: 1,
            fontSize: "1rem",
            textTransform: "none",
            boxShadow: 3,
          }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Process Video"
          )}
        </Button>
      </form>

      {downloadLink && (
        <Box
          sx={{
            mt: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Download Results
          </Typography>
          <Button
            variant="outlined"
            href={downloadLink}
            download="results_images.zip"
            sx={{ textTransform: "none", gap: 1 }}
          >
            <FaDownload /> Download ZIP
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default HelloUser;
