import { TodoItem } from "@/components/TodoItem";
import { useAuthStore } from "@/store/auth.store";
import { Todo, useTodoStore } from "@/store/todo.store";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { ScrollView, Text, XStack, YStack } from "tamagui";
import { LogOut } from "@tamagui/lucide-icons";
import { TouchableOpacity } from "react-native";

export default function HomeScreen() {
  const { todos, loading, fetchTodos, completeTodo } = useTodoStore();
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <LinearGradient
      colors={["#fae1ff64", "#f5f5f5", "#f7e6ff"]}
      style={{ flex: 1, paddingTop: 100, paddingHorizontal:16 }}
    >
      {/* Header */}
      <XStack
        justifyContent="space-between"
        alignItems="center"
        marginBottom={24}
      >
        <Text fontSize={22} fontWeight="900" color="#22223b">
          Today's List
        </Text>

        <TouchableOpacity onPress={handleLogout}>
          <LogOut size={22} color="#7c4dff" />
        </TouchableOpacity>
      </XStack>

      {/* Content */}
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        {loading && (
          <Text color="#6c6c80" textAlign="center">
            Loading...
          </Text>
        )}

        {!loading && todos.length === 0 && (
          <YStack alignItems="center" justifyContent="center" marginTop={64}>
            <Text color="#6c6c80">No todos yet. Add your first one ✨</Text>
          </YStack>
        )}

        {todos.map((todo: Todo) => (
          <TodoItem
            key={todo.id}
            title={todo.title}
            completed={todo.isCompleted}
            dueDate={todo.dueDate}
            onComplete={() => completeTodo(todo.id)}
          />
        ))}
      </ScrollView>
    </LinearGradient>
  );
}
