import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Platform } from "react-native";
import { Button, Card, Input, Text, YStack } from "tamagui";

export default function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, signUp, loading, error } = useAuthStore();
  const router = useRouter();

  const sanitize = (str: string) =>
    str.replace(/[\u200B-\u200D\uFEFF]/g, "").trim();

  const handleSubmit = async () => {
    if (!email || !password) return;

    const cleanEmail = sanitize(email);
    const cleanPassword = sanitize(password);

    const success = isSignUp
      ? await signUp(cleanEmail, cleanPassword)
      : await signIn(cleanEmail, cleanPassword);

    if (success) {
      router.replace("/(tabs)");
    }
  };

  return (
    <YStack
      flex={1}
      justifyContent="center"
      padding="$4"
      backgroundColor="#ece2fc"
    >
      <Card
        elevation={0}
        backgroundColor="#e9e2f4"
        borderRadius={24}
        padding="$6"
        gap="$4"
        shadowColor="rgba(124,77,255,0.15)"
        shadowRadius={24}
        shadowOffset={{ width: 0, height: 12 }}
      >
        {/* Header */}
        <YStack gap="$2" marginBottom="$3">
          <Text fontSize={28} fontWeight="900" textAlign="center">
            {isSignUp ? "Create Account" : "Welcome back"}
          </Text>
          <Text color="$color10" textAlign="center" fontSize={15}>
            Ready to crush your goals today?
          </Text>
        </YStack>

        {/* Email */}
        <Input
          height={56}
          borderRadius={16}
          backgroundColor="#f1f1f6"
          borderWidth={0}
          placeholder="Email"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={Platform.OS === "android" ? "default" : "email-address"}
          value={email}
          onChangeText={setEmail}
        />

        <Input
          height={56}
          borderRadius={16}
          backgroundColor="#f1f1f6"
          borderWidth={0}
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          value={password}
          onChangeText={setPassword}
        />

        {error && (
          <Text color="$red10" textAlign="center">
            {error}
          </Text>
        )}

        {/* Primary Button */}
        <Button
          height={56}
          borderRadius={18}
          backgroundColor="#1d2537"
          color="white"
          fontSize={16}
          fontWeight="700"
          pressStyle={{ backgroundColor: "#000" }}
          disabledStyle={{ opacity: 0.6 }}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading
            ? "Please wait..."
            : isSignUp
              ? "Create Account"
              : "Sign In ->"}
        </Button>

        {/* Switch */}
        <Button unstyled onPress={() => setIsSignUp((p) => !p)}>
          <Text color="$color10" textAlign="center">
            {isSignUp
              ? "Already have an account? "
              : "New here? "}
            <Text fontWeight="bold" color="$blue10" textAlign="center">
              {isSignUp ? "Sign In" : "Create account"}
            </Text>
          </Text>
        </Button>
      </Card>
    </YStack>
  );
}
