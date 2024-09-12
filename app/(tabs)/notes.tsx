import React, { useState } from 'react';
import { StyleSheet, View, TextInput, FlatList, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Define the Note type
interface Note {
  id: string;
  text: string;
}

export default function NotesTabScreen() {
  // Define the states with the correct types
  const [note, setNote] = useState<string>(''); // The current note text
  const [notes, setNotes] = useState<Note[]>([]); // An array of notes
  const [searchTerm, setSearchTerm] = useState<string>(''); // State for the search bar input

  // Function to add a new note
  const addNote = () => {
    if (note.trim()) {
      setNotes([...notes, { id: Date.now().toString(), text: note }]);  // Add new note with unique id
      setNote('');  // Clear the input after adding the note
    }
  };

  // Function to delete a note by id
  const deleteNote = (id: string) => { // Specify that id is a string
    setNotes(notes.filter(note => note.id !== id));
  };

  // Filter notes based on the search term
  const filteredNotes = notes.filter(note =>
    note.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Displaying the list of notes */}
      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View>
            <Text style={styles.headerText}>Notes</Text>

            {/* Search bar */}
            <View style={styles.searchContainer}>
              <Ionicons name="search-outline" size={20} color="#888" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="#888"
                value={searchTerm}
                onChangeText={setSearchTerm}
              />
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.noteContainer}>
            <Text style={styles.noteText}>{item.text}</Text>
            <TouchableOpacity onPress={() => deleteNote(item.id)}>
              <Ionicons name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Input for typing a new note */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a new note..."
          placeholderTextColor="#888"
          value={note}
          onChangeText={setNote}
          multiline
        />
        <TouchableOpacity style={styles.addButton} onPress={addNote}>
          <Ionicons name="add-circle" size={50} color="#C18652" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5DFB6', // Matching To-Do List background
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#C18652', // Earth tone title color
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#4A351D', // Darker text input color
  },
  noteContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noteText: {
    fontSize: 18,
    color: '#4A351D', // Darker brown for text
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    paddingVertical: 10,
    paddingRight: 15,
    color: '#4A351D', // Darker text input color
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
