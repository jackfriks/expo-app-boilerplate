import React from "react"
import { View, StyleSheet, Image, Text, Dimensions } from "react-native"
import SignInWithOAuth from "./oauth"

export default function Page() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "app logo" }}
        style={styles.logo}
      />
      <Text style={styles.title}>Log in</Text>
      
      <View style={styles.authContainer}>
        <SignInWithOAuth />
      </View>
    </View>
  )
}

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const LOGO_SIZE = Math.min(Math.max(SCREEN_WIDTH * 0.18, 56), 72)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FFFFFF",
  },
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    borderRadius: LOGO_SIZE / 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    marginTop: 20,
  },
  authContainer: {
    width: "100%",
    maxWidth: 320,
    alignSelf: 'center',
    marginTop: 30,
  },
})
