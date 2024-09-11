import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TodoList() {
  const [tasks, setTasks] = useState<string[]>([]); // Explicitly typed as an array of strings
  const [taskText, setTaskText] = useState<string>(''); // Explicitly typed as a string
  const [isEditing, setIsEditing] = useState<boolean>(false); // Explicitly typed as a boolean
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number | null>(null); // Explicitly typed as number or null

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
            <ThemedText style={styles.taskContainer}>{item}</ThemedText>
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
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ffa700', // Orange border for task items
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  editButton: {
    color: '#4caf50', // Green color for the Edit button
    marginLeft: 10,
  },
  deleteButton: {
    color: '#b91d1d', // Orange color for the Delete button
    marginLeft: 10,
  },
});
