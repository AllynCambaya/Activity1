import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TodoList() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [taskText, setTaskText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number | null>(null);

  const handleAddOrUpdateTask = () => {
    if (isEditing && currentTaskIndex !== null) {
      const updatedTasks = tasks.map((task, index) => 
        index === currentTaskIndex ? taskText : task
      );
      setTasks(updatedTasks);
      setIsEditing(false);
      setTaskText('');
    } else {
      setTasks([...tasks, taskText]);
      setTaskText('');
    }
  };

  const handleEditTask = (index: number) => {
    setTaskText(tasks[index]);
    setIsEditing(true);
    setCurrentTaskIndex(index);
  };

  const handleDeleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>My Task Tracker</ThemedText>
        <ThemedText type="default" style={styles.subtitle}>Galaw na boss!!</ThemedText>
      </View>
      <TextInput
        placeholder="Enter a task"
        value={taskText}
        onChangeText={setTaskText}
        style={styles.input}
      />
      <Button
        title={isEditing ? 'Update Task' : 'Add Task'}
        onPress={handleAddOrUpdateTask}
        color="#4CAF50" // Green color for the button
      />

      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.taskContainer}>
            <ThemedText>{item}</ThemedText>
            <View style={styles.buttonGroup}>
              <TouchableOpacity onPress={() => handleEditTask(index)}>
                <ThemedText type="defaultSemiBold" style={styles.buttonEdit}>Edit</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteTask(index)}>
                <ThemedText type="defaultSemiBold" style={styles.buttonDelete}>Delete</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white', // Light gray background color
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffa700', // Orange color for the title
    marginVertical: 10,
    textShadowColor: '#000', // Shadow color
    textShadowOffset: { width: 0, height: 1 }, // Shadow offset
    textShadowRadius: 3, // Shadow blur radius
  },
  subtitle: {
    fontSize: 16,
    color: '#4CAF50', // Green color for the subtitle
  },
  input: {
    borderWidth: 2,
    borderColor: '#ffa700', // Orange border for the input
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ffa700', // Orange border for task items
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  buttonEdit: {
    color: '#4caf50', // Green color for the Edit button
    marginLeft: 10,
  },
  buttonDelete: {
    color: '#b91d1d', // Orange color for the Delete button
    marginLeft: 10,
  },
});
