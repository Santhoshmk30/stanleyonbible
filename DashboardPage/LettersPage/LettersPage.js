import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView, ScrollView, Platform } from 'react-native'; 
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const LettersPage = () => {
  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const navigation = useNavigation();

  const isActiveRoute = (routeName) => route.name === routeName;

  useEffect(() => {
    fetch('https://app.stanleyonbible.in/api/myletter')
      .then(response => response.json())
      .then(data => {
        if (data && Array.isArray(data.data)) {
          const formatted = data.data.map((item, index) => ({
            id: (index + 1).toString(),
            date: item.date || "N/A",
            name: item.name || "No Title",
            file: item.file || null
          }));
          setLetters(formatted);
        } else {
          setLetters([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching letters:", error);
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>Stanley talks heart to heart with the visitors of this App</Text>

        <View style={styles.tableHeader}>
          <Text style={[styles.headerText, { flex: 1 }]}>No</Text>
          <Text style={[styles.headerText, { flex: 2 }]}>Name</Text>
          <Text style={[styles.headerText, { flex: 4 }]}>Date</Text>
          <Text style={[styles.headerText, { flex: 4 }]}>File</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={letters}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.tableRow}>
                <Text style={[styles.rowText, { flex: 1 }]}>{item.id}</Text>
                <Text style={[styles.rowText, { flex: 2 }]}>{item.name}</Text>
                <Text style={[styles.rowText, { flex: 4 }]}>{item.date}</Text>
                <TouchableOpacity
                  style={{ flex: 4 }}
                  onPress={() => {
                    if (item.file) {
                      navigation.navigate('File', { fileUrl: item.file });
                    }
                  }}
                >
                  <Icon name="document-outline" size={30} style={[styles.rowText1]} />
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navButton, isActiveRoute('HomeScreen') && styles.activeNavButton]}
          onPress={() => navigation.navigate('HomeScreen')}>
          <Icon name="headset-outline" size={30} color={isActiveRoute('HomeScreen') ? "#d91f48" : "#1B1212"} />
          <Text style={[styles.navText, isActiveRoute('HomeScreen') && styles.activeNavText]}>Listen</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, isActiveRoute('ResourcesPage') && styles.activeNavButton]}
          onPress={() => navigation.navigate('ResourcesPage')}>
          <Icon name="star-outline" size={30} color={isActiveRoute('ResourcesPage') ? "#d91f48" : "#1B1212"} />
          <Text style={[styles.navText, isActiveRoute('ResourcesPage') && styles.activeNavText]}>Resources</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, isActiveRoute('LettersPage') && styles.activeNavButton]}
          onPress={() => navigation.navigate('LettersPage')}>
          <Icon name="albums-outline" size={30} color={isActiveRoute('LettersPage') ? "#d91f48" : "#1B1212"} />
          <Text style={[styles.navText, isActiveRoute('LettersPage') && styles.activeNavText]}>Letters</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, isActiveRoute('MusicPlayer') && styles.activeNavButton]}
          onPress={() => navigation.navigate('MusicPlayer')}>
          <Icon name="information-circle-outline" size={30} color={isActiveRoute('MusicPlayer') ? "#d91f48" : "#1B1212"} />
          <Text style={[styles.navText, isActiveRoute('MusicPlayer') && styles.activeNavText]}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, isActiveRoute('ProfilePage') && styles.activeNavButton]}
          onPress={() => navigation.navigate('ProfilePage')}>
          <Icon name="ellipsis-horizontal-sharp" size={30} color={isActiveRoute('ProfilePage') ? "#d91f48" : "#1B1212"} />
          <Text style={[styles.navText, isActiveRoute('ProfilePage') && styles.activeNavText]}>More</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    width: '100%',
    backgroundColor: "#fff",
    padding: 10,
    paddingBottom: 100,
  },
  header: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: "center",
    fontWeight: "bold"
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingHorizontal: 5,
  },
  rowText: {
    fontSize: 15,
    color: "#333",
    textAlign: "center",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    zIndex: 999,
  },
  
  navButton: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#1B1212',
  },
  activeNavText: {
    color: '#d91f48',
    fontWeight: 'bold',
  },
});

export default LettersPage;
