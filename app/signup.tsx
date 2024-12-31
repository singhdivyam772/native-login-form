import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import CommonButton from "@/components/CommonButton";
import CommonTextInput from "@/components/CommonTextInput";
import * as Yup from "yup";
import { Formik } from "formik";
import { useRouter } from "expo-router";

import Toast from "react-native-toast-message";

const SignUp: React.FC = () => {
  const [passwordStrength, setPasswordStrength] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);
  const router = useRouter();

  const getPasswordStrength = (password: string) => {
    const length = password.length;
    if (length > 8) {
      if (
        /[A-Z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[!@#$%^&*()_+]/.test(password)
      ) {
        setPasswordStrength("strong");
      } else {
        setPasswordStrength("medium");
      }
    } else if (length > 5) {
      setPasswordStrength("medium");
    } else {
      setPasswordStrength("weak");
    }
  };

  const signUpSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password should be at least 6 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[!@#$%^&*()_+]/, "Password must contain a special character")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSignUp = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    Toast.show({
      type: "success",
      position: "bottom",
      text1: "Sign Up Successful",
    });

    console.log("signup ");
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Image
        source={{
          uri: "https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?ga=GA1.1.599627472.1735461558&semt=ais_hybrid",
        }}
        style={styles.image}
        resizeMode="cover"
      />

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={signUpSchema}
        onSubmit={handleSignUp}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <CommonTextInput
              placeholder="First Name"
              value={values.firstName}
              onChangeText={handleChange("firstName")}
              onBlur={handleBlur("firstName")}
            />
            {touched.firstName && errors.firstName && (
              <Text style={styles.error}>{errors.firstName}</Text>
            )}

            <CommonTextInput
              placeholder="Last Name"
              value={values.lastName}
              onChangeText={handleChange("lastName")}
              onBlur={handleBlur("lastName")}
            />
            {touched.lastName && errors.lastName && (
              <Text style={styles.error}>{errors.lastName}</Text>
            )}

            <CommonTextInput
              placeholder="Enter Email ID"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            <CommonTextInput
              placeholder="Enter Password"
              value={values.password}
              onChangeText={(text) => {
                handleChange("password")(text);
                getPasswordStrength(text);
              }}
              icon={isPasswordVisible ? "eye-off" : "eye"}
              onBlur={handleBlur("password")}
              secureTextEntry={!isPasswordVisible}
              onIconPress={() => setIsPasswordVisible(!isPasswordVisible)}
            />
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <View style={styles.strengthContainer}>
              <Text>Password Strength:</Text>
              <View
                style={[
                  styles.strengthBar,
                  passwordStrength === "strong" && styles.strong,
                  passwordStrength === "medium" && styles.medium,
                  passwordStrength === "weak" && styles.weak,
                ]}
              />
              <Text
                style={[
                  styles.strengthLabel,
                  { color: getStrengthColor(passwordStrength) },
                ]}
              >
                {passwordStrength === "strong" &&
                  "Your password is strong! It includes uppercase and special characters."}
                {passwordStrength === "medium" &&
                  "Your password could be stronger. Try adding an uppercase letter and a special character."}
                {passwordStrength === "weak" &&
                  "Your password is too weak. Make sure it has uppercase letters, numbers, and special characters."}
              </Text>
            </View>

            <CommonTextInput
              placeholder="Confirm Password"
              value={values.confirmPassword}
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              secureTextEntry={!isConfirmPasswordVisible}
              icon={isConfirmPasswordVisible ? "eye-off" : "eye"}
              onIconPress={() =>
                setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
              }
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.error}>{errors.confirmPassword}</Text>
            )}

            <CommonButton title="Sign Up" onPress={() => handleSubmit()} />
            <CommonButton
              title="Already Have Account / Login"
              onPress={() => router.push("/login")}
            />
            <CommonButton title="HomePage" onPress={() => router.push("/")} />
          </>
        )}
      </Formik>
      <Toast />
    </ScrollView>
  );
};

const getStrengthColor = (strength: string) => {
  switch (strength) {
    case "strong":
      return "green";
    case "medium":
      return "yellow";
    case "weak":
      return "red";
    default:
      return "black";
  }
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    gap: 20,
    backgroundColor: "skyblue",
  },
  image: {
    width: "100%",
    height: 400,
  },
  error: {
    color: "red",
    fontSize: 12,
  },
  strengthContainer: {
    marginTop: 10,
  },
  strengthBar: {
    height: 10,
    width: "100%",
    backgroundColor: "#ddd",
    marginVertical: 5,
    borderRadius: 5,
  },
  weak: {
    backgroundColor: "red",
    width: "33%",
  },
  medium: {
    backgroundColor: "yellow",
    width: "66%",
  },
  strong: {
    backgroundColor: "green",
    width: "100%",
  },
  strengthLabel: {
    marginTop: 5,
    fontSize: 14,
  },
});
