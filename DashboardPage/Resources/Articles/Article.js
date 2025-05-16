import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import RenderHTML from "react-native-render-html";
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
const tabs = [
  { label: "Tamil", language: 2 },
  { label: "English", language: 1 },
  { label: "Other", language: 3 },
];

const BookTamil = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  const fetchBooks = (language) => {
    setLoading(true);
    fetch(`https://app.stanleyonbible.in/api/general_articles?language=${language}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          setBooks(data.data);
          console.log(data.data)
        } else {
          setBooks([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBooks(tabs[activeTab].language);
  }, [activeTab]);

  const filteredBooks = books.filter((book) =>
    book?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tab, activeTab === index && styles.activeTab]}
            onPress={() => setActiveTab(index)}
          >
            <Text
              style={[styles.tabText, activeTab === index && styles.activeTabText]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>

      {/* Book List */}
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={filteredBooks}
          keyExtractor={(item) => item?.id?.toString() || Math.random().toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
  <TouchableOpacity
    style={styles.iconButton}
    onPress={() => {
      if (item?.pdf) {
        navigation.navigate("PDFViewer", { pdfUrl: item.pdf });
      } else {
        alert("No PDF available");
      }
    }}
  >
    <Ionicons name="open-outline" size={24} color={"#002147"} />
  </TouchableOpacity>

  <View style={styles.bookDetails}>
    <Text style={styles.title}>{item?.name || "No Title"}</Text>
    {/* Other content if needed */}
  </View>
</View>

          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-around",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 5,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 35,
    borderRadius: 10,
    backgroundColor: "#DCDCDC",
  },
  activeTab: {
    backgroundColor: "#002147",
  },
  tabText: {
    fontSize: 16,
    color: "#000000",
  },
  activeTabText: {
    color: "white",
    fontWeight: "bold",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    padding: 8,
    marginBottom: 10,
    backgroundColor: "#e6e6e6",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  bookImage: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  bookDetails: {
    flexDirection:'row',
    marginLeft: 15,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  downloadButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    
    width:50,
  },
  downloadText: {
    color: "white",
    fontWeight: "bold",
  },
  iconButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
    zIndex: 1,
  },
});

export default BookTamil;
