import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native';

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

const OAuthButtons = () => {
  useWarmUpBrowser();
  
  const { startOAuthFlow: startGoogleFlow } = useOAuth({ strategy: 'oauth_google' });
  const { startOAuthFlow: startAppleFlow } = useOAuth({ strategy: 'oauth_apple' });

  const handleOAuthSignIn = React.useCallback(async (startFlow: typeof startGoogleFlow) => {
    try {
      const { createdSessionId, setActive } = await startFlow({
        redirectUrl: Linking.createURL('/', { scheme: 'myapp' }),
      });
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => handleOAuthSignIn(startGoogleFlow)}
      >
        <View style={styles.buttonContent}>
          <Image 
            source={{ uri: 'https://imgs.search.brave.com/lBtw7l3MhojeV-JYt7sjdC3YR7IeRPqIBsZV4cpJMiM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mcmVl/bG9nb3BuZy5jb20v/aW1hZ2VzL2FsbF9p/bWcvMTY1Nzk1MjQ0/MGdvb2dsZS1sb2dv/LXBuZy10cmFuc3Bh/cmVudC5wbmc' }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.buttonText}>Continue with Google</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, styles.appleButton]} 
        onPress={() => handleOAuthSignIn(startAppleFlow)}
      >
        <View style={styles.buttonContent}>
          <Image 
            source={{ uri: 'https://imgs.search.brave.com/HPmimAkgVSUiN3sZE-7aZfTxIV0e48zQktqlkPhPejA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mcmVl/cG5nbG9nby5jb20v/aW1hZ2VzL2FsbF9p/bWcvMTcxODEzMDk1/OGFwcGxlLWxvZ28t/d2hpdGUucG5n' }}
            style={[styles.logo, styles.appleLogo]}
            resizeMode="contain"
          />
          <Text style={[styles.buttonText, styles.appleButtonText]}>
            Continue with Apple
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#dadce0',
    alignSelf: 'stretch'
  },
  appleButton: {
    backgroundColor: 'black',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  appleLogo: {
    tintColor: 'white',
  
  },
  buttonText: {
    color: '#3c4043',
    fontSize: 16,
    fontWeight: '500',
  },
  appleButtonText: {
    color: 'white',
  }
});

export default OAuthButtons;