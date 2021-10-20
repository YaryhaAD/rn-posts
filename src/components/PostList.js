import React from "react";
import {View, FlatList, StyleSheet, Text} from 'react-native'
import {Post} from './Post'

export const PostList = (props) => {
  const {data, onOpen} = props;

  if (!data.length) {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.noItems}>No posts yet...</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <FlatList
        keyExtractor={post => post.id.toString()}
        data={data}
        renderItem={({item}) => <Post post={item} onOpen={onOpen} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10
  },
  noItems: {
    fontFamily: 'open-regular',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 18
  }

})