import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import Sound from 'react-native-sound';

Sound.setCategory('Playback'); // For iOS

const MusicPlayerSimple = () => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playSound = () => {
    const music = new Sound('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', null, (error) => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      music.play((success) => {
        if (success) {
          console.log('Finished playing');
        } else {
          console.log('Playback failed');
        }
        setIsPlaying(false);
        music.release(); // release memory
      });
    });
    setSound(music);
    setIsPlaying(true);
  };

  const stopSound = () => {
    if (sound) {
      sound.stop(() => {
        console.log('Stopped');
        setIsPlaying(false);
      });
    }
  };

  return (
    <View style={{padding: 20}}>
      <Text style={{fontSize: 20}}>🎵 Simple Music Player</Text>
      <Button title={isPlaying ? 'Stop' : 'Play'} onPress={isPlaying ? stopSound : playSound} />
    </View>
  );
};

export default MusicPlayerSimple;
