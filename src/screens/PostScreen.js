import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Image, Button, ScrollView, Alert } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { THEME } from '../theme'
import {useSelector, useDispatch} from 'react-redux'
import { removePostTC, toggleBookedTC } from '../store/actions/post-actions';

export const PostScreen = (props) => {
  const {route, navigation} = props;
  const {postId, date} = route.params;
  const post = useSelector(state => {
    const foundPost = state.post.allPosts.find(post => post.id === postId);
    return foundPost
      ? foundPost
      : {}
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (!post.id) navigation.goBack();
  });

  useEffect(() => {
    navigation.setOptions({
      title: `Post from ${new Date(date).toLocaleDateString()}`,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item
            title={'Star'}
            iconName={post.booked ? 'ios-star' : 'ios-star-outline'}
            onPress={() => dispatch(toggleBookedTC(post))}
          />
        </HeaderButtons>
      )
    });
  }, [navigation, post, dispatch, post.booked]);

  const removeHandler = () => {
    Alert.alert(
      'Post deleting',
      `Do you want to delete ${postId} post?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Remove',
          onPress: () => {
            navigation.goBack();
            dispatch(removePostTC(postId));
          },
          style: 'destructive'
        }
      ],
      {cancelable: false}
    );
  };

  return (
    <ScrollView>
      <Image source={{uri: post.img}} style={styles.image} />
      <View style={styles.textWrap}>
        <Text style={styles.title}>{post.text}</Text>
      </View>
      <Button title={'Remove'} color={THEME.DANGER_COLOR} onPress={removeHandler} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  textWrap: {
    padding: 10
  },
  title: {
    fontFamily: 'open-regular'
  }
})
