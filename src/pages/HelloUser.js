import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Alert,
  Card,
  CardContent,
  Tooltip,
  Grid,
  Avatar,
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

  // Utility function for setting errors
  const handleError = (message) => {
    setErrorMessage(message);
    setIsLoading(false);
  };

  // Fetch initial state from location or localStorage
  useEffect(() => {
    const storedState = localStorage.getItem("selectedState");
    if (location.state?.selectedState) {
      setState(location.state.selectedState);
    } else if (storedState) {
      setState(storedState);
    } else {
      handleError("State information is missing. Please log in again.");
    }
  }, [location.state]);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("video/")) {
      handleError("Only video files are allowed.");
      setFile(null);
      return;
    }

    if (selectedFile.size > 100 * 1024 * 1024) {
      handleError("File size exceeds the 100MB limit.");
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
  };

  // Validate fields
  const validateFields = () => {
    if (!state) return "State is missing. Please log in again.";
    if (!speedLimit) return "Speed limit is required.";
    if (isNaN(speedLimit) || speedLimit <= 0) return "Enter a valid speed limit.";
    if (!file) return "Please select a video file.";
    return null;
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateFields();
    if (validationError) {
      handleError(validationError);
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
      handleError(
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        px: 3,
        py: 4,
        background: "linear-gradient(135deg, #4facfe, #00f2fe)",
      }}
    >
      <Card
        sx={{
          maxWidth: 800,
          width: "100%",
          p: 4,
          borderRadius: 4,
          boxShadow: 6,
          background: "#ffffff",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: 700, color: "#333", mb: 2 }}
        >
          Vehicle Video Processor
        </Typography>
        <Typography variant="body1" align="center" sx={{ color: "#555", mb: 4 }}>
          Upload a video, set the speed limit, and process it to detect speeding
          vehicles and extract license plate data.
        </Typography>

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="State"
                value={state}
                fullWidth
                InputProps={{
                  readOnly: true,
                  startAdornment: <FaCar style={{ marginRight: 8 }} />,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Speed Limit (km/h)"
                type="number"
                value={speedLimit}
                onChange={(e) => setSpeedLimit(e.target.value)}
                fullWidth
                required
                inputProps={{ min: 1 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Tooltip title="Upload a video file under 100MB">
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  sx={{
                    backgroundColor: "#007bff",
                    "&:hover": { backgroundColor: "#0056b3" },
                  }}
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
              </Tooltip>
            </Grid>
            {fileInfo && (
              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="body2">
                    <strong>File:</strong> {fileInfo.name}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Size:</strong> {fileInfo.size}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Type:</strong> {fileInfo.type}
                  </Typography>
                </Card>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  py: 1.5,
                  fontSize: "1rem",
                  textTransform: "none",
                  boxShadow: 3,
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Process Video"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>

        {downloadLink && (
          <Box sx={{ mt: 4, textAlign: "center" }}>
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
      </Card>
    </Box>
  );
}

export default HelloUser;
