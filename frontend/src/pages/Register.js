import React from "react";
import { useForm } from "react-hook-form";
import { Container, TextField, Button, Typography, Box, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import backgroundImage from "./theme.jpg";

const Register = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            await axios.post("/api/auth/register", data);
            alert("Registration successful! Please login.");
            navigate("/login");
        } catch (error) {
            console.error("Error registering user", error);
            alert("Registration failed.");
        }
    };

    const handleSkip = () => {
        navigate("/dashboard"); // Navigate to Dashboard
    };

    return (
        <Container
            sx={{
                mt: 0,
                p: 2,
                borderRadius: 0,
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
                minWidth: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    borderRadius: 2,
                    padding: 4,
                    boxShadow: 3,
                    width: "100%",
                    maxWidth: 400,
                }}
            >
                <Typography variant="h4" gutterBottom align="center">
                    Register
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <TextField
                        label="Name"
                        fullWidth
                        margin="normal"
                        {...register("name", { required: "Name is required" })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Enter a valid email address",
                            },
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters long",
                            },
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Register
                    </Button>
                </Box>
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    Already have an account?{" "}
                    <Link
                        component="button"
                        onClick={() => navigate("/login")}
                    >
                        Login here
                    </Link>
                </Typography>
                <Typography variant="body2" align="center" sx={{ mt: 2, color: "gray" }}>
                    Don’t want to register?{" "}
                    <Link
                        component="button"
                        onClick={handleSkip}
                        sx={{
                            textDecoration: "none",
                            color: "#1976d2",
                            fontWeight: "bold",
                            cursor: "pointer",
                        }}
                    >
                        Skip
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default Register;
