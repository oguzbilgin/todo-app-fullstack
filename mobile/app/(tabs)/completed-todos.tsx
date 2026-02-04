import { Todo, useTodoStore } from "@/store/todo.store";
import { CheckCircle } from "@tamagui/lucide-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { Card, Text, XStack, YStack } from "tamagui";

export default function CompletedTodosScreen() {
  const { completedTodos, loading, fetchCompletedTodos } = useTodoStore();

  useEffect(() => {
    fetchCompletedTodos();
  }, [fetchCompletedTodos]);

  return (
    <LinearGradient
      colors={["#fdf5ff", "#fdf7ea", "#f7e6ff"]}
      style={{ flex: 1, paddingTop: 100, paddingHorizontal:16 }}
    >
      {/* Header */}
      <XStack alignItems="center" gap="$2" marginBottom={24}>
        <CheckCircle size={22} color="#7c4dff" />
        <Text fontSize={22} fontWeight="900" color="#22223b">
          Completed Todos
        </Text>
      </XStack>

      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading && (
          <Text color="#6c6c80" textAlign="center" marginTop={32}>
            Loading...
          </Text>
        )}

        {!loading && completedTodos.length === 0 && (
          <YStack alignItems="center" justifyContent="center" marginTop={64}>
            <Text color="#6c6c80">No completed todos yet</Text>
          </YStack>
        )}

        <YStack gap="$2">
          {completedTodos.map((todo: Todo) => (
            <View
              key={todo.id}
              style={{
                marginBottom: 8,
                shadowColor: "#6804ff",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 2,
                elevation: 6,
                borderRadius: 18,
                overflow: "visible",
              }}
            >
              <Card borderRadius={18} backgroundColor="#fcfaff" padding={20}>
                <XStack justifyContent="space-between" alignItems="center">
                  <XStack alignItems="center" flex={1} marginLeft={-8}>
                    <CheckCircle size={18} color="#7c4dff"/>
                    <Text
                      fontSize={20}
                      fontWeight="800"
                      color="#9e9e9e"
                      textDecorationLine="line-through"
                      flexShrink={1}
                      marginLeft={8}
                    >
                      {todo.title}
                    </Text>
                  </XStack>

                  <Text fontSize={14} color="#7c4dff">
                    {new Date(todo.completedAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                    })}
                  </Text>
                </XStack>
              </Card>
            </View>
          ))}
        </YStack>
      </ScrollView>
    </LinearGradient>
  );
}
