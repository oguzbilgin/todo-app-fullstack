import { useAuthStore } from "@/store/auth.store";
import { CheckCircle, Home, PlusCircle } from "@tamagui/lucide-icons";
import { Redirect, Tabs } from "expo-router";

export default function TabsLayout() {
  const { isAuthenticated, loading } = useAuthStore();

  if (loading) return null;

  if (!isAuthenticated) {
    return <Redirect href="/auth" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 64,
          paddingBottom: 8,
          paddingTop: 4,
          backgroundColor: "#f8eafe",
          borderTopWidth: 0,
        },
        tabBarItemStyle: {
          justifyContent: "center",
        },
        tabBarLabelStyle: {
          marginTop: 2,
        },
        tabBarActiveTintColor:"#7c4dff",
        tabBarInactiveTintColor:"#22223b"
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="add-todo"
        options={{
          title: "Add Todo",
          tabBarIcon: ({ color, size }) => (
            <PlusCircle color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="completed-todos"
        options={{
          title: "Completed",
          tabBarIcon: ({ color, size }) => (
            <CheckCircle color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
