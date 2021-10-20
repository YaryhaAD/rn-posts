import React, { useEffect } from 'react'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { PostList } from '../components/PostList'
import {useDispatch, useSelector} from 'react-redux'
import { loadPostsTC } from '../store/actions/post-actions';
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { THEME } from '../theme'

export const MainScreen = (props) => {
  const {navigation} = props;
  const allPosts = useSelector(state => state.post.allPosts);
  const loading = useSelector(state => state.post.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPostsTC());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={THEME.MAIN_COLOR} size={'large'}/>
      </View>
    );
  }

  const onOpenPostHandler = (post) => {
    navigation.navigate('PostScreen', {postId: post.id, date: post.date});
  };

  return (
    <PostList data={allPosts} onOpen={onOpenPostHandler} />
  );
};


const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

