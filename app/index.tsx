import CommonButton from "@/components/CommonButton";
import { useRouter } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

const About = () => {
  const router = useRouter();

  const navigateToLogin = () => {
    router.navigate("/login");
  };
  const navigateToSignup = () => {
    router.navigate("/signup");
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://img.freepik.com/free-vector/log-landing-page-with-flat-design_23-2148281412.jpg",
        }}
        style={styles.image}
        resizeMode="cover"
      />

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: 10,
          marginTop: "-20%",
        }}
      >
        <CommonButton title={"Click to LogIn"} onPress={navigateToLogin} />
        <CommonButton title={"Click to SignUp"} onPress={navigateToSignup} />
      </View>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    backgroundColor: "skyblue",
  },
  image: {
    width: "100%",
    height: 600,
  },
});
