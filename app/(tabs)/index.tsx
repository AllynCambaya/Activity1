import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface Task {
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskText, setTaskText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number | null>(null);

  const handleAddOrUpdateTask = () => {
    if (taskText.trim() === '') return;  // Prevent empty tasks
    if (isEditing && currentTaskIndex !== null) {
      const updatedTasks = tasks.map((task, index) => 
        index === currentTaskIndex ? { ...task, text: taskText } : task
      );
      setTasks(updatedTasks);
      setIsEditing(false);
      setTaskText('');
    } else {
      setTasks([...tasks, { text: taskText, completed: false }]);
      setTaskText('');
    }
  };

  const handleEditTask = (index: number) => {
    setTaskText(tasks[index].text);
    setIsEditing(true);
    setCurrentTaskIndex(index);
  };

  const handleDeleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>To-Do List</ThemedText>
        <ThemedText type="default" style={styles.subtitle}>My Task Tracker</ThemedText>
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
            <TouchableOpacity onPress={() => toggleTaskCompletion(index)}>
              <ThemedText style={[
                styles.taskText,
                item.completed && styles.completedTaskText, // Apply strikethrough if completed
              ]}>
                {item.text}
              </ThemedText>
            </TouchableOpacity>
            <View style={styles.buttonGroup}>
              <TouchableOpacity onPress={() => handleEditTask(index)}>
                <ThemedText style={styles.buttonEdit}>Edit</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteTask(index)}>
                <ThemedText style={styles.buttonDelete}>Delete</ThemedText>
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
    backgroundColor: '#E5DFB6', // Light Beige for background
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#C18652', // Burnt Orange for title
    marginVertical: 10,
    textShadowColor: '#4A351D', // Dark Brown for shadow
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 16,
    color: '#8AA399', // Light Teal for subtitle
  },
  input: {
    borderWidth: 2,
    borderColor: '#C18652', // Burnt Orange for border
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    fontSize: 16,
    color: '#4A351D', // Dark Brown for input text
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#4A351D', // Dark Brown for button
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#E5DFB6', // Light Beige for button text
    fontSize: 16,
    fontWeight: '600',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#C18652', // Burnt Orange for divider
  },
  taskText: {
    fontSize: 16,
    color: '#4A351D', // Dark Brown for task text
  },
  completedTaskText: {
    textDecorationLine: 'line-through', // Strikethrough for completed tasks
    color: '#9E9251', // Olive Green for completed tasks
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  buttonEdit: {
    color: '#8AA399', // Light Teal for edit text
    marginLeft: 10,
  },
  buttonDelete: {
    color: '#C18652', // Burnt Orange for delete text
    marginLeft: 10,
  },
});
