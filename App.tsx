import { Platform, StyleSheet, View, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useState } from 'react';
import Emote from './components/Emote';

// Lazy rendering issues. See: https://stackoverflow.com/questions/55032060/react-native-lazy-loading-250-images-in-a-scroll-view

export default function App(): JSX.Element {

  const [search, setSearch] = useState("");
  const [results, setResults]: [any, any] = useState([]);

  const getApi = async (query: string) => {
    if (query.length === 0)
      setResults([]);

    if (query.length >= 3) {
      const response = await fetch(`http://vezqi.com/api/?q=${query}&limit=250000&page=1`);
      const data = await response.json();
      setResults(data.data);
    }
  };

  const updateSearch = async (search: string) => {
    setSearch(search);
    await getApi(search);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Search emotes"
        onChangeText={updateSearch as ((text: string) => void) & ((text: string) => void) & (() => any)}
        platform={Platform.OS === "ios" ? "ios" : "android"}
        autoCorrect={false}
        value={search}
        containerStyle={styles.searchBox}
        inputContainerStyle={styles.searchBox}
        inputStyle={styles.inputStyle}
      />

      <FlatList contentContainerStyle={styles.emoteImageGrid}

        data={results}
        renderItem={({ item }) => (
          <View key={item.id}>
            <Emote name={item.name} id={item.id} />
          </View>
        )}
        keyExtractor={(item: any) => item.id}

        // Performance settings
        removeClippedSubviews={true} // Unmount components when outside of window 
        initialNumToRender={30} // Reduce initial render amount
        maxToRenderPerBatch={3} // Reduce number in each render batch
        updateCellsBatchingPeriod={100} // Increase time between renders
        windowSize={3} // Reduce the window size

      />


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
  },

  emoteImageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  searchBox: {
    backgroundColor: "#000",
  },

  inputStyle: {
    color: "#777777",
  }

});

/*

      <ScrollView contentContainerStyle={styles.emoteImageGrid}>
        {results.map((emote: any) => {
          return (
            <View key={emote.id}>
              <Emote name={emote.name} id={emote.id} />
            </View>
          )
        })}
      </ScrollView>

*/