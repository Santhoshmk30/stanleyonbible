import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Image, FlatList, ImageBackground, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const sermons = [
  { id: '1', title: 'Easter Messages 2025', image: require('./Icons/bible1.jpg') },
  { id: '2', title: 'Strengthening Your Grip', image: require('./Icons/bible1.jpg') },
  { id: '3', title: "The Mystery of God's Will", image: require('./Icons/bible1.jpg') },
  { id: '4', title: 'Moses: A Man of Selfless Dedication', image: require('./Icons/bible1.jpg') },
  { id: '5', title: 'Mystery & Majesty: God with Us', image: require('./Icons/bible1.jpg') },
  { id: '6', title: 'Tough Grace in Difficult Places', subtitle: 'A Study of the Book of Titus', image: require('./Icons/bible1.jpg') },
];


const HomeScreen = () => {
    const route = useRoute();
    const [activeTab, setActiveTab] = useState('Broadcasts');
    const navigation = useNavigation();
  
  const isActiveRoute = (routeName) => route.name === routeName;
  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
      <Image source={require('../DashboardPage/Icons/Stanley1.jpg')} style={styles.image} />
        <Text style={styles.appTitle}> StanleyOnBible</Text>
        <View style={styles.iconRow}>

        </View>
      </View>


      <View>
  {/* Tabs */}
  <View style={styles.tabs}>
    <TouchableOpacity onPress={() => setActiveTab('Broadcasts')}>
      <Text style={activeTab === 'Broadcasts' ? styles.activeTab : styles.inactiveTab}>
        Broadcasts
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setActiveTab('Full Sermons')}>
      <Text style={activeTab === 'Full Sermons' ? styles.activeTab : styles.inactiveTab}>
        Full Sermons
      </Text>
    </TouchableOpacity>
  </View>

  {/* Tab Content */}
  <View style={styles.tabContent}>
    {activeTab === 'Broadcasts' ? (
      <View>
        {/* Carousel */}
        <View style={styles.carouselContainer}>
          <Swiper showsPagination autoplay>
            <ImageBackground source={require('./Icons/bible1.jpg')} style={styles.carouselSlide}>
              <Text style={styles.carouselTitle}>STRENGTHENING YOUR GRIP</Text>
              <Text style={styles.carouselSubtitle}>How to be grounded in a chaotic world</Text>
            </ImageBackground>
            {/* Add more slides if needed */}
          </Swiper>
        </View>

        {/* Sermon List */}
        <FlatList
          data={sermons}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.sermonItem}>
              <Image source={item.image} style={styles.sermonImage} />
              <View>
                <Text style={styles.sermonTitle}>{item.title}</Text>
                {item.subtitle && <Text style={styles.sermonSubtitle}>{item.subtitle}</Text>}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    ) : (
      <Text>Full Sermons </Text>
    )}
  </View>
</View>

      
      {/* Bottom Tab Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navButton, isActiveRoute('HomeScreen') && styles.activeNavButton]}
          onPress={() => navigation.navigate('HomeScreen')}>
          <Ionicons name="headset-outline"  size={30} color={isActiveRoute('HomeScreen') ? "#d91f48" : "#1B1212"} />
          <Text style={[styles.navText, isActiveRoute('HomeScreen') && styles.activeNavText]}>Listen</Text>
        </TouchableOpacity>
         
       

        <TouchableOpacity
          style={[styles.navButton, isActiveRoute('ResourcesPage') && styles.activeNavButton]}
          onPress={() => navigation.navigate('ResourcesPage')}>
         <Ionicons name="star-outline"  size={30} color={isActiveRoute('ResourcesPage') ? "#d91f48" : "#1B1212"} />
          <Text style={[styles.navText, isActiveRoute('ResourcesPage') && styles.activeNavText]}>Resources</Text>
        </TouchableOpacity>
      
        <TouchableOpacity
          style={[styles.navButton, isActiveRoute('LettersPage') && styles.activeNavButton]}
          onPress={() => navigation.navigate('LettersPage')}>
          <Ionicons name="albums-outline"  size={30} color={isActiveRoute('LettersPage') ? "#d91f48" : "#1B1212"} />
          <Text style={[styles.navText, isActiveRoute('LettersPage') && styles.activeNavText]}>Letters</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, isActiveRoute('MusicPlayer') && styles.activeNavButton]}
          onPress={() => navigation.navigate('MusicPlayer')}>
          <Ionicons name="information-circle-outline"  size={30} color={isActiveRoute('MusicPlayer') ? "#d91f48" : "#1B1212"} />
          <Text style={[styles.navText, isActiveRoute('MusicPlayer') && styles.activeNavText]}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, isActiveRoute('ProfilePage') && styles.activeNavButton]}
          onPress={() => navigation.navigate('ProfilePage')}>
          <Ionicons name="ellipsis-horizontal-sharp" size={30} color={isActiveRoute('ProfilePage') ? "#d91f48" : "#1B1212"} />
          <Text style={[styles.navText, isActiveRoute('ProfilePage') && styles.activeNavText]}>More</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight:180,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacing: {
    marginLeft: 16,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  activeTab: {
    fontWeight: '600',
    color: '#000',
  },
  inactiveTab: {
    color: '#6b7280',
  },
  carouselContainer: {
    height: 200,
  },
  carouselSlide: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  carouselTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  carouselSubtitle: {
    color: 'white',
    fontSize: 14,
  },
  sermonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#f3f4f6',
  },
  sermonImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 16,
  },
  sermonTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  sermonSubtitle: {
    fontSize: 13,
    color: '#6b7280',
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
activeNavButton: {},
activeNavText: {
  color: '#d91f48',
  fontWeight: 'bold',
},
tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  activeTab: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    paddingBottom: 4,
  },
  inactiveTab: {
    fontSize: 16,
    color: '#888',
    paddingBottom: 4,
  },
  tabContent: {
    padding: 16,
  },
  image:{
    width: 44,
    height:44,
    borderRadius:190,
    
  },

});

export default HomeScreen;