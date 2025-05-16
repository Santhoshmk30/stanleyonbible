import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, StyleSheet,Dimensions,Animated,Modal } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Ionicons";
const DashboardPage = () => {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width: screenWidth } = Dimensions.get('window');
  const route = useRoute(); 
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-250)).current; 
  const [isVisible, setIsVisible] = useState(false);

  const isActiveRoute = (routeName) => route.name === routeName;

    const sliderImages = [
        { id: 1, source: require("../DashboardPage/Icons/bible2.jpg") },
        { id: 2, source: require("../DashboardPage/Icons/bible1.jpg") },
    ];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
        }, 4000);

        return () => clearInterval(intervalId);
    }, [sliderImages.length]);

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({
                x: currentIndex * screenWidth,
                animated: true,
            });
        }
    }, [currentIndex]);

    const handleLogout = async () => {
      Alert.alert(
        "Logout",
        "Are you sure you want to logout?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: async () => {
              try {
                const response = await fetch(`https://staff.annaianbalayaa.org/public/api/logout`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ user_id:userData.user_id }),
                });
    
                if (!response.ok) {
                  throw new Error('Failed to logout');
                }
    
              
                await AsyncStorage.setItem('isLoggedOut', 'true'); 
                await AsyncStorage.removeItem('isLoggedIn');
    
               
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'SigninPage' }],
                });
              } catch (error) {
                console.error('Error during logout:', error);
              }
            },
          },
        ],
        { cancelable: false }
      );
    };

    const openMenu = () => {
      setMenuVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };
  
    const closeMenu = () => {
      Animated.timing(slideAnim, {
        toValue: -250,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    };

  return (
    <View style={styles.container}>
        <ScrollView>

      {/* Header */}
      <View style={styles.header}>
      <TouchableOpacity onPress={openMenu}>
      <Image source={require('../DashboardPage/Icons/menu.png')} style={styles.navbaricon} />
      </TouchableOpacity>
      {/* Sliding Modal */}
      <Modal transparent visible={menuVisible} animationType="none">
        <View style={styles.overlay}>
          <TouchableOpacity style={styles.backdrop} onPress={closeMenu} />
          <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
          <TouchableOpacity onPress={closeMenu}>
      <Image source={require('../DashboardPage/Icons/previous.png')} style={styles.navbaricon1} />
      </TouchableOpacity>
      <View style={styles.imagebar}>
      <Image source={require('../DashboardPage/Icons/Stanley1.jpg')} style={styles.image} />
      
        <Text style={styles.imagetext} >R. Stanley</Text>
      </View>
            <TouchableOpacity onPress={closeMenu}>
              <Text style={styles.menuItem}> Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeMenu}>
              <Text style={styles.menuItem}onPress={() => navigation.navigate('LettersPage')}> Letters</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
        <Text style={styles.menuItem}>Book & Booklets</Text>
      </TouchableOpacity>
            {isVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity style={styles.subItem}onPress={() => navigation.navigate('BookTamil')}>
            <Text>Tamil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.subItem}>
            <Text>English</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.subItem}>
            <Text>Other Languages</Text>
          </TouchableOpacity>
        </View>
      )}
            <TouchableOpacity onPress={closeMenu}>
              <Text style={styles.menuItem}> Study Outlines</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeMenu}>
              <Text style={styles.menuItem}> Articles</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeMenu}>
              <Text style={styles.menuItem}>Audios & Videos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeMenu}>
              <Text style={styles.menuItem}> Devotions</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeMenu}>
              <Text style={styles.menuItem}> My Answers</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeMenu}>
              <Text style={styles.menuItem}>Contact Us</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeMenu}>
              <Text style={styles.menuItem}> Settings</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
        <Text style={styles.headerTitle}>Stanleyonbible</Text>
        <Image source={require('../DashboardPage/Icons/settings.png')} style={styles.settingsicon} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput placeholder="Search" style={styles.searchInput} />
      </View>
<View style={styles.Card}>
  <View style={styles.carouselContainer}>
  <ScrollView
    ref={scrollViewRef}
    horizontal
    pagingEnabled
    showsHorizontalScrollIndicator={false}
  >
    {sliderImages.map((item) => (
      <View key={item.id1} style={{ position:'relative'}}>
        <Image
          source={item.source}
          style={{ width:405, height: 200,borderRadius:20,}}
          resizeMode="cover"
        />
        <View style={styles.sliderTextContainer}>
          <Text style={styles.sliderText}>The bible teaching ministry of</Text>
          <Text style={styles.sliderTitle}>R.Stanley</Text>
          <TouchableOpacity style={styles.learnMoreButton}>
            <Text style={styles.learnMoreText}>Learn more</Text>
          </TouchableOpacity>
        </View>
      </View>
    ))}
  </ScrollView>

  {/* Genre Section */}
  <Text style={styles.genreTitle}>Genreal</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreScroll}>
  <TouchableOpacity style={styles.genreButton}>
    <Text style={styles.genreText}>Classic</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.genreButton}>
    <Text style={styles.genreText}>Fantasy</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.genreButton}>
    <Text style={styles.genreText}>Romance</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.genreButton}>
    <Text style={styles.genreText}>History</Text>
  </TouchableOpacity>
</ScrollView>
</View>

</View>
      </ScrollView>

     
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {/* Home */}
      <TouchableOpacity
        style={[styles.navButton, isActiveRoute("ANNAI ANBALAYAA TRUST") && styles.activeNavButton]}
        onPress={() => navigation.navigate("ANNAI ANBALAYAA TRUST")}
      >
        <Image source={require("../DashboardPage/Icons/home.png")} style={styles.icon} />
        <Text style={[styles.navText, isActiveRoute("ANNAI ANBALAYAA TRUST") && styles.activeNavText]}>
          Home
        </Text>
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity
        style={[styles.navButton, isActiveRoute("Profile") && styles.activeNavButton]}
        onPress={() => navigation.navigate("Profile")}
      >
         <Image source={require("../DashboardPage/Icons/direction.png")} style={styles.icon} />
        <Text style={[styles.navText, isActiveRoute("Profile") && styles.activeNavText]}>
          Explore
        </Text>
      </TouchableOpacity>

      {/* Report */}
      <TouchableOpacity
        style={[styles.navButton, isActiveRoute("TeamReport") && styles.activeNavButton]}
        onPress={() => navigation.navigate("TeamReport")}
      >
        <Image source={require("../DashboardPage/Icons/notification.png")} style={styles.icon} />
        <Text style={[styles.navText, isActiveRoute("TeamReport") && styles.activeNavText]}>
         Notification
        </Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity
        style={[styles.navButton, isActiveRoute("Logout") && styles.activeNavButton]}
        onPress={handleLogout}
      >
        <Image source={require("../DashboardPage/Icons/bookmark.png")} style={styles.icon} />
        <Text style={[styles.navText, isActiveRoute("Logout") && styles.activeNavText]}>
          Saved
        </Text>
      </TouchableOpacity>
      
      </View>
     
     </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAC100",
  },
  header: {
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between",  // Ensures icons are at the corners
    paddingHorizontal: 15,  // Adds spacing from the edges
    paddingVertical: 10, 
    backgroundColor: "#EAC100",
  },
  navbaricon: {
    width: 30,
    height: 30,
    tintColor: "black", 
    marginLeft:10,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  settingsicon: {
    width: 30,
    height: 30,
    tintColor: "black",
    marginRight:10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8E9A1",
    marginHorizontal: 15,
    borderRadius: 20,
    padding: 8,
    marginTop:10,
  },
  searchInput: {
    flex: 1,
  },
  Card:{
    width:'100%',
    backgroundColor: "#faebb1",
      borderRadius: 60, 
      padding: 10,
      height:810,
      marginTop:10,
  },
  genreTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    marginTop: 20,
    color: "black",
  },
  genreScroll: {
    marginHorizontal: 15,
    marginTop: 10,
  },
  genreButton: {
    backgroundColor: "#EAC100",
    fontWeight:'bold',
    padding: 10,
    borderRadius: 15,
    marginRight: 10,
    height:40,
  },
  genreText: {
    color: "black",
  },
  sliderContainer: {
    height: 200,
    marginTop: 20,
    marginHorizontal: 15,
    borderRadius: 10,
    overflow: "hidden",
  },
  sliderItem: {
    width: 350, 
    alignItems: "center",
  },
  sliderImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  carouselContainer: {
   marginTop:40,
  },
  sliderTextContainer: {
    position: 'absolute',
    top: '50%', 
    left: 20, 
    right: 20,
    alignItems: 'center',
    transform: [{ translateY: -10 }], 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    padding: 10,
    borderRadius: 10,
  },
  sliderText: {
    color: "white",
    fontSize: 16,
  },
  sliderTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  learnMoreButton: {
    marginTop: 10,
    backgroundColor: '#ffcc00',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  learnMoreText: {
    color: "black",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical:2,
    backgroundColor: "#EAC100",
    position: "absolute",
    bottom: 30,
    width: "90%",
    left:20,
    borderRadius:20,
  },
  navButton: {
    alignItems: "center",
    paddingVertical: 8,
  },
  activeNavButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  icon: {
    width: 25,
    height: 25,
  },
  profileIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  navText: {
    fontSize: 12,
    color: "#333",
  },
  activeNavText: {
    color: "#007bff",
    fontWeight: "bold",
  },
  overlay: { flex: 1, flexDirection: "row" },
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)" },
  menuContainer: {
    width: 250,
    height: "100%",
    backgroundColor: "#faebb1",
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  navbaricon1: {
    width: 34,
    height:34,
    tintColor: "black",
    marginLeft:10,
    marginTop:30,
  },
  menuItem: { fontSize: 20,marginTop:30,paddingLeft:20, },
  dropdown: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  subItem: {
    paddingVertical: 10,
    marginLeft:20,
  },
  imagebar:{
    paddingRight:20,
    width:'100%',
    backgroundColor: "#EAC100",
      padding: 10,
      marginTop:20,
  },
  image:{
    width: 114,
    height:114,
    
  },
  imagetext:{
    marginTop:10,
    marginLeft:10,
    fontSize:22,
    alignContent:'center',

  },
});

export default DashboardPage;
