import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface Task {
  text: string;
  isCompleted: boolean;
  isSelected: boolean;
}

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskText, setTaskText] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleAddOrUpdateTask = () => {
    if (taskText.trim() === '') return;
    const selectedTasks = tasks.filter(task => task.isSelected);
    if (isEditing && selectedTasks.length === 1) {
      const taskIndex = tasks.findIndex(task => task.isSelected);
      const updatedTasks = tasks.map((task, index) =>
        index === taskIndex ? { ...task, text: taskText } : task
      );
      setTasks(updatedTasks);
      setIsEditing(false);
      setTaskText('');
    } else {
      setTasks([...tasks, { text: taskText, isCompleted: false, isSelected: false }]);
      setTaskText('');
    }
  };

  const handleEditTask = () => {
    const selectedTasks = tasks.filter(task => task.isSelected);
    if (selectedTasks.length === 1) {
      const taskIndex = tasks.findIndex(task => task.isSelected);
      setTaskText(tasks[taskIndex].text);
      setIsEditing(true);
    }
  };

  const handleDeleteTask = () => {
    const updatedTasks = tasks.filter(task => !task.isSelected);
    setTasks(updatedTasks);
  };

  const toggleCompleteTask = () => {
    const updatedTasks = tasks.map(task =>
      task.isSelected ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
  };

  const handleCheckboxChange = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, isSelected: !task.isSelected } : task
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

      {/* Labels for Task and Status */}
      <View style={styles.labelsContainer}>
        <ThemedText style={styles.labelText}>Your Task</ThemedText>
        <ThemedText style={styles.labelText}>Status</ThemedText>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.taskContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => handleCheckboxChange(index)}
            >
              <View style={item.isSelected ? styles.checkboxSelected : styles.checkboxUnselected} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCheckboxChange(index)} style={styles.taskTextContainer}>
              <ThemedText
                style={[
                  styles.taskText,
                  item.isCompleted && styles.completedTaskText,
                ]}
              >
                {item.text}
              </ThemedText>
              {item.isCompleted && (
                <ThemedText style={styles.statusText}>Completed</ThemedText>
              )}
            </TouchableOpacity>
          </View>
        )}
      />

      {tasks.some(task => task.isSelected) && (
        <View style={styles.buttonGroup}>
          <TouchableOpacity onPress={handleEditTask}>
            <ThemedText style={styles.buttonEdit}>Edit</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeleteTask}>
            <ThemedText style={styles.buttonDelete}>Delete</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleCompleteTask}>
            <ThemedText style={styles.buttonFinish}>Finish</ThemedText>
          </TouchableOpacity>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E5DFB6',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#C18652',
    marginVertical: 10,
    textShadowColor: '#4A351D',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 16,
    color: '#8AA399',
  },
  input: {
    borderWidth: 2,
    borderColor: '#C18652',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    fontSize: 16,
    color: '#4A351D',
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#4A351D',
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#E5DFB6',
    fontSize: 16,
    fontWeight: '600',
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10, // Optional padding for a little space on the sides
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A351D',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#C18652',
  },
  taskTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    marginLeft: 5,
  },
  taskText: {
    fontSize: 16,
    color: '#4A351D',
    flex: 1,
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    color: '#8AA399',
  },
  statusText: {
    fontSize: 16,
    color: '#4A351D',
  },
  checkbox: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxUnselected: {
    width: 16,
    height: 16,
    borderWidth: 2,
    borderColor: '#C18652',
    backgroundColor: 'transparent',
  },
  checkboxSelected: {
    width: 16,
    height: 16,
    borderWidth: 2,
    borderColor: '#C18652',
    backgroundColor: '#C18652',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  buttonEdit: {
    color: '#8AA399',
    marginLeft: 10,
  },
  buttonDelete: {
    color: '#C18652',
    marginLeft: 10,
  },
  buttonFinish: {
    color: '#4A351D',
    marginLeft: 10,
  },
});
