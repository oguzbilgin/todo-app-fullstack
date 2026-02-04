import { useTodoStore } from "@/store/todo.store";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar } from "@tamagui/lucide-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Platform } from "react-native";
import { Button, Card, Input, Text, XStack, YStack } from "tamagui";

export default function AddTodoScreen() {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const { addTodo, loading, error } = useTodoStore();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!title.trim()) return;
    await addTodo(title, dueDate.toISOString());
    setTitle("");
    setDueDate(new Date());
    router.back();
  };

  return (
    <LinearGradient
      colors={["#dcccf6", "#fbe8b7", "#ebe3f9"]}
      style={{ flex: 1, padding: 16 }}
    >
      <YStack flex={1} alignContent="center" justifyContent="center">
        <Card
          elevation={4}
          backgroundColor="#e9e2f4"
          borderRadius={24}
          padding="$6"
          gap="$4"
          shadowColor="rgba(213, 161, 245, 0.15)"
          shadowRadius={12}
          shadowOffset={{ width: 0, height: 0 }}
          shadowOpacity={1}
        >
          {/* Header */}
          <YStack gap="$2">
            <Text fontSize="$8" fontWeight="900">
              What's on your mind?
            </Text>
            <Text color="$color10">Add a task and set a due date</Text>
          </YStack>

          {/* Title Input */}
          <Input
            size="$5"
            fontSize={18}
            placeholder="What needs to be done?"
            value={title}
            onChangeText={setTitle}
          />

          {/* Due Date */}
          <XStack alignItems="center" gap="$2">
            <Calendar size={18} color="#7c4dff" />
            <Text>Due</Text>

            {Platform.OS === "ios" ? (
              <YStack flex={1} paddingVertical={8} paddingHorizontal={4}>
                <DateTimePicker
                  value={dueDate}
                  mode="date"
                  display="default"
                  onChange={(_, selectedDate) => {
                    if (selectedDate) setDueDate(selectedDate);
                  }}
                />
              </YStack>
            ) : (
              <>
                <Button
                  height={36}
                  borderRadius={12}
                  backgroundColor="#8458fd"
                  onPress={() => setShowPicker(true)}
                >
                  <Text color="white">{dueDate.toLocaleDateString()}</Text>
                </Button>
                {showPicker && (
                  <DateTimePicker
                    value={dueDate}
                    mode="date"
                    display="default"
                    onChange={(_, selectedDate) => {
                      setShowPicker(false);
                      if (selectedDate) setDueDate(selectedDate);
                    }}
                  />
                )}
              </>
            )}
          </XStack>
          {error && <Text color="$red10">{error}</Text>}
          {/* Actions */}
          <YStack gap="$3" marginTop="$2">
            <Button
              height={54}
              borderRadius={16}
              backgroundColor="#7c4dff"
              color="white"
              fontSize={16}
              fontWeight="700"
              pressStyle={{ backgroundColor: "#6a3df0" }}
              disabledStyle={{ opacity: 0.6 }}
              onPress={handleSubmit}
              disabled={loading}
            >
              <Text color="white" fontWeight="bold">
                {loading ? "Adding..." : "Add Todo"}
              </Text>
            </Button>
            <Button unstyled onPress={() => router.back()}>
              <Text color="$color10" textAlign="center">
                Cancel
              </Text>
            </Button>
          </YStack>
        </Card>
      </YStack>
    </LinearGradient>
  );
}
