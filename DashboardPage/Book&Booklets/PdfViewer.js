import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';
import { useRoute } from '@react-navigation/native';

const PdfViewer = () => {
  const route = useRoute();
  const pdfUrl = route.params?.pdfUrl; 
  const [localPath, setLocalPath] = useState('');

  useEffect(() => {
    const downloadPdf = async () => {
      if (!pdfUrl) return; // Ensure the URL exists

      const fileName = pdfUrl.split('/').pop(); 
      const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;

      try {
        await RNFS.downloadFile({
          fromUrl: pdfUrl,
          toFile: path,
        }).promise;
        setLocalPath(path);
      } catch (error) {
        console.log('Download Error:', error);
      }
    };

    downloadPdf();
  }, [pdfUrl]);

  return (
    <View style={styles.container}>
      {localPath ? (
        <Pdf source={{ uri: localPath }} style={styles.pdf} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  pdf: { flex: 1, width: '100%', height: '100%' }
});

export default PdfViewer;
