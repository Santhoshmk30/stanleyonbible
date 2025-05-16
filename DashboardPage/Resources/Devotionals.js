import React, { useEffect, useState } from "react";
import {
  View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator,
  Image, TouchableOpacity, useWindowDimensions, ScrollView
} from "react-native";
import RenderHTML from "react-native-render-html";
import { useNavigation } from "@react-navigation/native";

const tabs = [
  { label: "Tamil", type: 1, language: 2 },
  { label: "English", type: 1, language: 1 },
  { label: "Other", type: 1, language: 3 },
];

const BookTamil = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  const fetchBooks = (type, language) => {
    setLoading(true);
    fetch(`https://app.stanleyonbible.in/api/books?type=${type}&Language=${language}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          setBooks(data.data);
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
    const { type, language } = tabs[activeTab];
    fetchBooks(type, language);
  }, [activeTab]);

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tab,
              activeTab === index && styles.activeTab
            ]}
            onPress={() => setActiveTab(index)}
          >
            <Text style={[
              styles.tabText,
              activeTab === index && styles.activeTabText
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput placeholder="Search" style={styles.searchInput} />
      </View>

      {/* Book List */}
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={{ uri: item?.image }}
                style={styles.bookImage}
                resizeMode="cover"
              />
              <View style={styles.bookDetails}>
                <Text style={styles.title}>{item?.name || "No Title"}</Text>
                <RenderHTML
                  contentWidth={width}
                  source={{ html: item?.details || "<p>No Details</p>" }}
                />
                <TouchableOpacity
                  style={styles.downloadButton}
                  onPress={() => {
                    if (item?.Pdf) {
                      navigation.navigate("PDFViewer", { pdfUrl: item.Pdf });
                    } else {
                      alert("No PDF available");
                    }
                  }}
                >
                  <Text style={styles.downloadText}>⬇️ Read & Download</Text>
                </TouchableOpacity>
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
    flex: 1,
    marginLeft: 15,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  downloadButton: {
    backgroundColor: "#002147",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  downloadText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default BookTamil;
