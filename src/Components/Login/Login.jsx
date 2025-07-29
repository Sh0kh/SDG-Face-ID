import React from "react";
import {
  Card,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Card className="w-full max-w-sm shadow-md">
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h5" color="blue-gray" className="text-center">
            Login
          </Typography>
          <Input label="Email" size="lg" type="email" />
          <Input label="Password" size="lg" type="password" />
          <Button fullWidth color="blue">
            Sign In
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
