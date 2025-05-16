import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ImageBackground } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const ResourcesPage = () => {
    const route = useRoute();
    const navigation = useNavigation();
  
  const isActiveRoute = (routeName) => route.name === routeName;
  return (
    <View style={styles.container}>

      {/* Banner */}
      <ImageBackground source={require('../Icons/bible1.jpg')} style={styles.banner}>
        <Text style={styles.bannerText}>RESOURCES</Text>
      </ImageBackground>
<View style={styles.itemcontainer}>
<TouchableOpacity style={styles.item}  onPress={() => navigation.navigate('Books')}>
  <Image source={require('../Icons/bible1.jpg')} style={styles.icon} />
  <View>
    <Text style={styles.title}>Books</Text>
  </View>
</TouchableOpacity>

<TouchableOpacity style={styles.item}  onPress={() => navigation.navigate('Articles')}>
  <Image source={require('../Icons/bible1.jpg')} style={styles.icon} />
  <View>
    <Text style={styles.title}>Articles</Text>
  </View>
</TouchableOpacity>

<TouchableOpacity style={styles.item}  onPress={() => navigation.navigate('HomeScreen')}>
  <Image source={require('../Icons/bible1.jpg')} style={styles.icon} />
  <View>
    <Text style={styles.title}>Video Insights</Text>
    <Text style={styles.subtitle}>With Chuck Swindoll</Text>
  </View>
</TouchableOpacity>

<TouchableOpacity style={styles.item}  onPress={() => navigation.navigate('HomeScreen')}>
  <Image source={require('../Icons/bible1.jpg')} style={styles.icon} />
  <View>
    <Text style={styles.title}>Conversations</Text>
    <Text style={styles.subtitle}>Insights from Chuck</Text>
  </View>
</TouchableOpacity>

<TouchableOpacity style={styles.item}  onPress={() => navigation.navigate('HomeScreen')}>
  <Image source={require('../Icons/bible1.jpg')} style={styles.icon} />
  <View>
    <Text style={styles.title}>Searching the Scriptures Quizzes</Text>
  </View>
</TouchableOpacity>

<TouchableOpacity style={styles.item}>
  <Image source={require('../Icons/bible1.jpg')} style={styles.icon} />
  <View>
    <Text style={styles.title}>Bible Questions and Counseling</Text>
  </View>
</TouchableOpacity>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  logo: { width: 30, height: 30 },
  appTitle: { fontSize: 18, fontWeight: 'bold', flex: 1, marginLeft: 8 },
  topIcons: { flexDirection: 'row' },
  topIcon: { width: 22, height: 22, marginHorizontal: 6 },

  banner: { width: '100%', height: 100, justifyContent: 'center', alignItems: 'center' },
  bannerText: { color: '#fff', fontSize: 28, fontWeight: 'bold', letterSpacing: 2 },

  listContainer: { padding: 16 },
  itemcontainer: {padding:20,
  },
  item: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  icon: { width: 48, height: 48, marginRight: 16 },
  title: { fontSize: 16, fontWeight: '600' },
  subtitle: { fontSize: 12, color: '#555' },

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
});

export default ResourcesPage;
