import { Swipeable } from "react-native-gesture-handler";
import { Card, Text, XStack, YStack } from "tamagui";
import { Clock } from '@tamagui/lucide-icons';
import { View } from "react-native";

type Props = {
  title: string;
  completed: boolean;
  dueDate: string;
  onComplete: () => void;
};

export function TodoItem({ title, completed, dueDate, onComplete }: Props) {
  const isOverdue =
    !completed &&
    new Date(dueDate).setHours(0,0,0,0) < new Date().setHours(0,0,0,0);

  const formattedDate = new Date(dueDate).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });

  const renderLeftAction = () => {
    if (completed) return null;
    return (
      <XStack
        flex={1}
        backgroundColor="#4caf50"
        justifyContent="flex-start"
        alignItems="center"
        paddingLeft={24}
        borderRadius={18}
        marginBottom="$4"
      >
        <Text color="white" fontWeight="700">Complete</Text>
      </XStack>
    );
  };

  return (
    <Swipeable
      renderLeftActions={renderLeftAction}
      onSwipeableOpen={(direction) => {
        if (direction === "left" && !completed) onComplete();
      }}
    >
      <View
        style={{
          marginBottom: 16,
          shadowColor: "#7e54ef",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 1,
          elevation: 8,
          borderRadius: 18,
          overflow: "visible",
        }}
      >
        <Card
          borderRadius={18}
          backgroundColor="#f1eafd"
          opacity={completed ? 0.5 : 1}
        >
          <YStack padding={20} flex={1} gap="$2">
            {/* Title */}
            <XStack justifyContent="space-between" alignItems="center">
              <Text
                fontSize={20}
                fontWeight="800"
                color="#22223b"
                textDecorationLine={completed ? "line-through" : "none"}
                flexShrink={1}
              >
                {title}
              </Text>

              <XStack alignItems="center">
                <Clock size={16} color="#7c4dff" />
                <Text
                  fontSize={14}
                  fontWeight="bold"
                  color={completed ? "#9e9e9e" : isOverdue ? "#e53935" : "#7c4dff"}
                  marginLeft={4}
                >
                  Due {formattedDate}{isOverdue ? " · Overdue" : ""}
                </Text>
              </XStack>
            </XStack>
            <Text fontSize={15} color="#afafbb">
              {completed ? "This task is completed" : "Swipe right to mark as completed"}
            </Text>
          </YStack>
        </Card>
      </View>
    </Swipeable>
  );
}
