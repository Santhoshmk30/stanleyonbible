import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity, useWindowDimensions } from "react-native";
import RenderHTML from "react-native-render-html";
import { useNavigation } from "@react-navigation/native";

const BookTamil = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    fetch("https://app.stanleyonbible.in/api/books?type=1&Language=1")
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
        if (data && Array.isArray(data.data)) {
          setBooks(data.data);
        } else {
          console.error("Unexpected API Response:", data);
          setBooks([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
        setLoading(false);
      });
  }, []);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput placeholder="Search" style={styles.searchInput} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={Array.isArray(books) ? books : []}
          keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
          renderItem={({ item }) => {
            const isExpanded = expanded[item.id] || false;
            const shortText = item?.details?.length > 100 ? item?.details.substring(0, 100) + "..." : item?.details;
            return (
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
                    source={{ html: isExpanded ? item?.details || "<p>No Details</p>" : shortText }} 
                  />
                  {item?.details?.length > 200 && (
                    <TouchableOpacity onPress={() => toggleExpand(item.id)}>
                      <Text style={styles.readMore}>{isExpanded ? "Read Less" : "Read More"}</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity 
  style={styles.downloadButton} 
  onPress={() => navigation.navigate("PDFViewer", { pdfUrl: item?.Pdf })}
>
  <Text style={styles.downloadText}>⬇️ Read & Download</Text>
</TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAC100",
    padding: 15,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8E9A1",
    borderRadius: 20,
    padding: 8,
    marginBottom: 10,
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
  readMore: {
    color: "blue",
    marginTop: 5,
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