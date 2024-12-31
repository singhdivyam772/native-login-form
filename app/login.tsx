import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CommonButton from "@/components/CommonButton";
import CommonTextInput from "@/components/CommonTextInput";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Yup from "yup";
import { Formik } from "formik";
import Toast from "react-native-toast-message";

const Login: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password should be at least 6 characters")
      .required("Password is required"),
  });

  useEffect(() => {
    const loadEmail = async () => {
      const savedEmail = await AsyncStorage.getItem("userEmail");
      if (savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
      }
    };

    loadEmail();
  }, []);

  const handleLogin = async (values: {
    email: string;
    password: string;
  }): Promise<void> => {
    try {
      if (rememberMe) {
        await AsyncStorage.setItem("userEmail", values.email);
      }
      console.log("Login Successful");

      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Login Successful",
        text2: "You have logged in successfully!",
      });
    } catch (error) {
      console.log("Login failed", error);
    }
  };

  const toggleRememberMe = (): void => {
    setRememberMe((prev) => !prev);
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
        initialValues={{ email, password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
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
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              secureTextEntry={!isPasswordVisible}
              icon={isPasswordVisible ? "eye-off" : "eye"}
              onIconPress={() => setIsPasswordVisible((prev) => !prev)}
            />
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <View style={styles.rememberMeContainer}>
              <TouchableOpacity
                onPress={toggleRememberMe}
                style={styles.checkboxContainer}
              >
                <View
                  style={[
                    styles.checkbox,
                    rememberMe && styles.checkedCheckbox,
                  ]}
                />
                <Text style={styles.checkboxLabel}>Remember Me</Text>
              </TouchableOpacity>
            </View>

            <CommonButton title="Login" onPress={() => handleSubmit()} />

            <CommonButton
              title="Create New Account / Signup"
              onPress={() => router.push("/signup")}
            />
            <CommonButton title="HomePage" onPress={() => router.push("/")} />
          </>
        )}
      </Formik>

      <Toast />
    </ScrollView>
  );
};

export default Login;

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
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 4,
    marginRight: 10,
  },
  checkedCheckbox: {
    backgroundColor: "#4CAF50",
  },
  checkboxLabel: {
    fontSize: 16,
  },
  error: {
    color: "red",
    fontSize: 12,
  },
});
