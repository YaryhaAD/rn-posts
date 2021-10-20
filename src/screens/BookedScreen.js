import React from 'react'
import { useSelector } from 'react-redux'
import { PostList } from '../components/PostList'


export const BookedScreen = (props) => {
  const {navigation} = props;

  const bookedPosts = useSelector(state => state.post.bookedPosts);

  const onOpenPostHandler = (post) => {
    navigation.navigate('PostScreen', {postId: post.id, date: post.date});
  };

  return (
    <PostList data={bookedPosts} onOpen={onOpenPostHandler} />
  );
};
