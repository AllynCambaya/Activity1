import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, StyleSheet, Modal, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface Task {
  text: string;
  isCompleted: boolean;
}

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [taskText, setTaskText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(null);
  const [originalIndex, setOriginalIndex] = useState<number | null>(null); // Track original index
  const [error, setError] = useState<string | null>(null); // Error message state

  // useEffect to handle automatic task visibility updates and error message
  useEffect(() => {
    if (taskText.trim() === '') {
      setFilteredTasks(tasks); // Show all tasks when search text is cleared
      setError(null); // Clear error message when input is cleared
    } else {
      const lowerCaseSearchText = taskText.toLowerCase();
      const matchingTasks = tasks.filter(task => task.text.toLowerCase().includes(lowerCaseSearchText));
      if (matchingTasks.length === 0) {
        setError('No tasks match your search criteria.');
      } else {
        setError(null); // Clear error message if tasks are found
      }
      setFilteredTasks(matchingTasks);
    }
  }, [taskText, tasks]); // Depend on taskText and tasks

  const handleAddOrUpdateTask = () => {
    if (taskText.trim() === '') return;

    if (isEditing && originalIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === originalIndex ? { ...task, text: taskText } : task
      );
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks); // Show all tasks after update
      setIsEditing(false);
      setTaskText(''); // Clear input field
    } else {
      const newTask = { text: taskText, isCompleted: false };
      setTasks([...tasks, newTask]);
      setFilteredTasks([...tasks, newTask]); // Show all tasks after adding
      setTaskText(''); // Clear input field
    }
  };

  const handleSearchTask = () => {
    // Search logic has been moved to useEffect
  };

  const handleTaskPress = (index: number) => {
    setSelectedTaskIndex(index);
    setOriginalIndex(tasks.indexOf(filteredTasks[index])); // Track original index
    setModalVisible(true);
  };

  const handleEditTask = () => {
    if (selectedTaskIndex !== null && originalIndex !== null) {
      setTaskText(tasks[originalIndex].text);
      setIsEditing(true);
      setModalVisible(false);
    }
  };

  const handleDeleteTask = () => {
    if (selectedTaskIndex !== null && originalIndex !== null) {
      const updatedTasks = tasks.filter((_, index) => index !== originalIndex);
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks); // Show all tasks after deleting
      setModalVisible(false);
    }
  };

  const handleMarkAsCompleted = () => {
    if (selectedTaskIndex !== null && originalIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === originalIndex ? { ...task, isCompleted: true } : task
      );
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks); // Show all tasks after marking as completed
      setModalVisible(false);
    }
  };

  const handleMarkAsUnfinished = () => {
    if (selectedTaskIndex !== null && originalIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === originalIndex ? { ...task, isCompleted: false } : task
      );
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks); // Show all tasks after marking as unfinished
      setModalVisible(false);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAddOrUpdateTask}>
          <ThemedText style={styles.buttonText}>
            {isEditing ? 'Update Task' : 'Add Task'}
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSearchTask}>
          <ThemedText style={styles.buttonText}>Search</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Labels for Task and Status */}
      <View style={styles.labelsContainer}>
        <ThemedText style={styles.labelText}>Your Task</ThemedText>
        <ThemedText style={styles.labelText}>Status</ThemedText>
      </View>

      {/* Display error message if no tasks match search criteria */}
      {error && (
        <View style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>{error}</ThemedText>
        </View>
      )}

      <FlatList
        data={filteredTasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.taskContainer}
            onPress={() => handleTaskPress(index)}
          >
            <ThemedText
              style={[
                styles.taskText,
                item.isCompleted && styles.completedTaskText,
              ]}
            >
              {item.text}
            </ThemedText>
            <ThemedText style={[styles.statusText, item.isCompleted ? styles.completedStatus : styles.unfinishedStatus]}>
              {item.isCompleted ? 'Completed' : 'Unfinished'}
            </ThemedText>
          </TouchableOpacity>
        )}
      />

      {/* Modal for Task Options */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <ThemedText style={styles.modalTitle}>Options for this Task!</ThemedText>
            {isEditing && (
              <TouchableOpacity style={styles.modalButton} onPress={handleMarkAsUnfinished}>
                <ThemedText style={styles.modalButtonText}>Mark as Unfinished</ThemedText>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.modalButton} onPress={handleEditTask}>
              <ThemedText style={styles.modalButtonText}>Edit Task</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={handleDeleteTask}>
              <ThemedText style={[styles.modalButtonText, styles.buttonDelete]}>Delete Task</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={handleMarkAsCompleted}>
              <ThemedText style={styles.modalButtonText}>Mark as Completed</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
              <ThemedText style={styles.modalButtonText}>Cancel</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginBottom: 25,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#C18652',
    marginVertical: 5,
    marginTop: 30,
    textShadowColor: '#4A351D',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    lineHeight: 45,
  },
  subtitle: {
    fontSize: 16,
    color: '#8AA399',
    lineHeight: 20,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4A351D',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
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
    paddingHorizontal: 10,
  },
  labelText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C18652',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#C18652',
  },
  taskText: {
    fontSize: 16,
    color: '#4A351D',
    flex: 1,
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    color: '#8AA399', // Match completed status color
  },
  statusText: {
    fontSize: 16,
    color: '#4A351D',
  },
  completedStatus: {
    color: '#8AA399', // Completed status color
  },
  unfinishedStatus: {
    color: '#C18652', // Unfinished status color
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#E5DFB6',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A351D',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#4A351D',
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#E5DFB6',
    fontSize: 16,
  },
  buttonDelete: {
    color: '#C18652',
  },
  errorContainer: {
    backgroundColor: '#FDECEA',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    borderColor: '#C18652',
    borderWidth: 1,
    alignItems: 'center',
  },
  errorText: {
    color: '#C18652',
    fontSize: 16,
  },
});
