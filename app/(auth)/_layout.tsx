import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import { ActivityIndicator, View } from 'react-native';

export default function AuthLayout() {
 const {isLoaded, isSignedIn } = useAuth()

 if (!isLoaded) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0A66C2" />
    </View>
  );
}

 return (
  <Stack >
    <Stack.Screen name="sign-in" options={{ headerShown: false }} />
  </Stack>
 )
}