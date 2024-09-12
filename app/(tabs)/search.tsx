import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';  // For icons

interface Task {
  text: string;
  isCompleted: boolean;
  isSelected: boolean;
  date: string;
}

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([
    { text: 'Buy groceries', isCompleted: false, isSelected: false, date: 'Jul 20, 2023 at 9:00 AM' },
    { text: 'Finish homework', isCompleted: false, isSelected: false, date: 'Jul 21, 2023 at 3:30 PM' },
    { text: 'Read a book', isCompleted: true, isSelected: false, date: 'Jul 19, 2023 at 6:00 PM' }
  ]);
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>Todo List</ThemedText>

          {/* Search Bar */}
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#888"
              value={searchText}
              onChangeText={setSearchText}
              style={styles.searchInput}
              autoFocus={false}
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText('')}>
                <Ionicons name="close" size={20} color="#C18652" style={styles.closeIcon} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Task List */}
        <FlatList
          data={filteredTasks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <View>
                <ThemedText style={styles.taskText}>{item.text}</ThemedText>
                <ThemedText style={styles.taskDate}>{item.date}</ThemedText>
              </View>
              <View
                style={[
                  styles.statusTag,
                  { backgroundColor: item.isCompleted ? '#8AA399' : '#C18652' }
                ]}
              >
                <ThemedText style={styles.statusText}>
                  {item.isCompleted ? 'Completed' : 'Pending'}
                </ThemedText>
              </View>
            </View>
          )}
        />
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E5DFB6',
  },
  header: {
    marginBottom: 25,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#C18652',
    textShadowColor: '#4A351D',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    lineHeight: 45, 
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    marginTop: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#4A351D',
  },
  closeIcon: {
    marginLeft: 8,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#C18652',
  },
  taskText: {
    fontSize: 16,
    color: '#4A351D',
  },
  taskDate: {
    fontSize: 14,
    color: '#888',
  },
  statusTag: {
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
  },
});
