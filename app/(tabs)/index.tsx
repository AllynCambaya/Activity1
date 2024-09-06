import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TodoList() {
  const [tasks, setTasks] = useState<string[]>([]); // Explicitly typed as an array of strings
  const [taskText, setTaskText] = useState<string>(''); // Explicitly typed as a string
  const [isEditing, setIsEditing] = useState<boolean>(false); // Explicitly typed as a boolean
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number | null>(null); // Explicitly typed as number or null

  // Add or update a task
  const handleAddOrUpdateTask = () => {
    if (taskText.trim() === '') return;  // Prevent empty tasks
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
  const handleEditTask = (index: number) => { // Explicitly typed the parameter as number
    setTaskText(tasks[index]);
    setIsEditing(true);
    setCurrentTaskIndex(index);
  };

  // Delete a task
  const handleDeleteTask = (index: number) => { // Explicitly typed the parameter as number
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>To-Do List</ThemedText>
      <TextInput
        placeholder="Enter a task"
        placeholderTextColor="#888"
        value={taskText}
        onChangeText={setTaskText}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddOrUpdateTask}>
        <ThemedText style={styles.buttonText}>
          {isEditing ? 'Update Task' : 'Add Task'}
        </ThemedText>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.taskContainer}>
            <ThemedText style={styles.taskText}>{item}</ThemedText>
            <View style={styles.buttonGroup}>
              <TouchableOpacity onPress={() => handleEditTask(index)}>
                <ThemedText style={styles.editButton}>Edit</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteTask(index)}>
                <ThemedText style={styles.deleteButton}>Delete</ThemedText>
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  taskText: {
    fontSize: 16,
    color: '#000',
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  editButton: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 20,
  },
  deleteButton: {
    color: '#ff0000',
    fontSize: 14,
    fontWeight: '600',
  },
});
