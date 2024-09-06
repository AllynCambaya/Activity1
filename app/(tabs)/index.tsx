import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TodoList() {
  // Explicitly type the tasks state as string[]
  const [tasks, setTasks] = useState<string[]>([]);
  const [taskText, setTaskText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number | null>(null);

  // Add or update a task
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

  // Edit a task
  const handleEditTask = (index: number) => {
    setTaskText(tasks[index]);
    setIsEditing(true);
    setCurrentTaskIndex(index);
  };

  // Delete a task
  const handleDeleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">To-Do List</ThemedText>
      <TextInput
        placeholder="Enter a task"
        value={taskText}
        onChangeText={setTaskText}
        style={styles.input}
      />
      <Button
        title={isEditing ? 'Update Task' : 'Add Task'}
        onPress={handleAddOrUpdateTask}
      />

      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.taskContainer}>
            <ThemedText>{item}</ThemedText>
            <View style={styles.buttonGroup}>
              <TouchableOpacity onPress={() => handleEditTask(index)}>
                <ThemedText type="defaultSemiBold" style={styles.button}>Edit</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteTask(index)}>
                <ThemedText type="defaultSemiBold" style={styles.button}>Delete</ThemedText>
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    color: 'blue',
    marginLeft: 10,
  },
});