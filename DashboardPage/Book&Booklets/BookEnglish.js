import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator,Image,TouchableOpacity,useWindowDimensions,Linking} from "react-native";
import RenderHTML from "react-native-render-html";
import { useNavigation } from "@react-navigation/native";
const BookTamil = () => {
    const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  
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
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            
            <Image 
  source={{ uri: item?.image }} 
  style={{ width: 100, height: 150, borderRadius: 10 }} 
  resizeMode="cover"
/>




            
            <View style={styles.bookDetails}>
              <Text style={styles.title}>{item?.name || "No Title"}</Text>
              <RenderHTML contentWidth={width} source={{ html: item?.details || "<p>No Details</p>" }} />
              <TouchableOpacity 
  style={styles.downloadButton} 
  onPress={() => {
    if (item?.Pdf) {
      navigation.navigate("PdfViewer", { pdfUrl: item.Pdf });
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
author: {
  fontSize: 14,
  color: "#666",
  marginTop: 5,
},
description: {
  fontSize: 12,
  color: "#444",
  marginTop: 8,
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
