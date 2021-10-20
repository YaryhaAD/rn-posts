import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from "react";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { MainScreen } from "../screens/MainScreen";
import { PostScreen } from "../screens/PostScreen";
import { THEME } from "../theme";
import { Platform } from "react-native";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from "../components/AppHeaderIcon";
import { Ionicons } from "@expo/vector-icons";
import { BookedScreen } from "../screens/BookedScreen";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {AboutScreen} from '../screens/AboutScreen'
import {CreateScreen} from '../screens/CreateScreen'
// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";








const PostStack = createNativeStackNavigator();

const BookedStack = createNativeStackNavigator();

const BottomTabStack = createMaterialBottomTabNavigator();
// const BottomTabStack = Platform.OS === 'android'
//   ? createMaterialBottomTabNavigator<TabParamList>()
//   : createBottomTabNavigator<TabParamList>();

const AboutStack = createNativeStackNavigator();

const CreateStack = createNativeStackNavigator();

const DrawerStack = createDrawerNavigator();

const screenOptions = Platform.OS === 'android'
  ? {
    headerStyle: {
      backgroundColor: THEME.MAIN_COLOR
    },
    headerTintColor: '#fff'
  }
  : {
    headerStyle: {
      backgroundColor: '#fff'
    },
    headerTintColor: THEME.MAIN_COLOR
  };

const BookedStackScreens = (props) => {
  const {navigation} = props;

  return (
    <BookedStack.Navigator
      initialRouteName={'BookedScreen'}
      screenOptions={screenOptions}
    >
        <BookedStack.Screen name={'BookedScreen'} component={BookedScreen} options={{
          title: 'Favorites',
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
              <Item
                title={'Toggle Drawer'}
                iconName={'ios-menu'}
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              />
            </HeaderButtons>
          )
        }} />
        <BookedStack.Screen name={'PostScreen'} component={PostScreen} />
    </BookedStack.Navigator>
  );
};

const PostStackScreens = (props) => {
  const {navigation} = props;

  return (
    <PostStack.Navigator
      initialRouteName={'MainScreen'}
      screenOptions={screenOptions}
    >
        <PostStack.Screen name={'MainScreen'} component={MainScreen} options={{
          title: 'My blog',
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
              <Item
                title={'Take photo'}
                iconName={'ios-camera'}
                onPress={() => navigation.navigate('CreateStackScreens')}
              />
            </HeaderButtons>
          ),
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
              <Item
                title={'Toggle Drawer'}
                iconName={'ios-menu'}
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              />
            </HeaderButtons>
          )
        }} />
        <PostStack.Screen name={'PostScreen'} component={PostScreen} />
    </PostStack.Navigator>
  );
};

const BottomTabStackScreens = () => {
  const bottomScreenOptions = Platform.OS === 'android'
    ? {
      initialRouteName: 'PostStackScreens',
      barStyle: {backgroundColor: THEME.MAIN_COLOR},
      activeColor: '#fff',
      shifting: true
    }
    : {
      initialRouteName: 'PostStackScreens',
      barStyle: {backgroundColor: '#fff'},
      activeColor: THEME.MAIN_COLOR,
      shifting: true
    };
  // : {
  //   initialRouteName: 'Post',
  //   screenOptions: {
  //     headerShown: false,
  //     tabBarActiveTintColor: THEME.MAIN_COLOR
  //   }
  return (
    <BottomTabStack.Navigator
      {...bottomScreenOptions}
    >
        <BottomTabStack.Screen
          name={'PostStackScreens'}
          component={PostStackScreens}
          options={{
            tabBarIcon: (props) => <Ionicons name={'ios-albums'} size={25} color={props.color} />,
            tabBarLabel: 'All posts'
          }} />
        <BottomTabStack.Screen
          name={'BookedStackScreens'}
          component={BookedStackScreens}
          options={{
            tabBarIcon: (props) => <Ionicons name={'ios-star'} size={25} color={props.color} />,
            tabBarLabel: 'Favorites'
          }} />
      </BottomTabStack.Navigator>
  );
};

const AboutStackScreens = (props) => {
  const {navigation} = props;

  return (
    <AboutStack.Navigator screenOptions={screenOptions}>
      <AboutStack.Screen name={'AboutScreen'} component={AboutScreen} options={{
        title: 'About APP',
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
              <Item
                title={'Toggle Drawer'}
                iconName={'ios-menu'}
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              />
            </HeaderButtons>
        )
      }} />
    </AboutStack.Navigator>
  );
};

const CreateStackScreens = (props) => {
  const {navigation} = props;

  return (
    <CreateStack.Navigator screenOptions={screenOptions}>
      <CreateStack.Screen name={'CreateScreen'} component={CreateScreen} options={{
        title: 'New post',
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
              <Item
                title={'Toggle Drawer'}
                iconName={'ios-menu'}
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              />
            </HeaderButtons>
        )
      }} />
    </CreateStack.Navigator>
  );
};

const AppStackScreens = () => {
  return (
    <DrawerStack.Navigator screenOptions={{
      headerShown: false,
      drawerActiveTintColor: THEME.MAIN_COLOR,
      drawerLabelStyle: {
        fontFamily: 'open-bold'
      }
    }}>
      <DrawerStack.Screen
        name={'BottomTabStackScreens'}
        component={BottomTabStackScreens}
        options={{
          drawerLabel: 'General'
        }}
      />
      <DrawerStack.Screen
        name={'AboutStackScreens'}
        component={AboutStackScreens}
        options={{
          drawerLabel: 'About APP'
        }}
      />
      <DrawerStack.Screen
        name={'CreateStackScreens'}
        component={CreateStackScreens}
        options={{
          drawerLabel: 'New post'
        }}
      />
    </DrawerStack.Navigator>
  );
};

export const AppNavigation = () => {

  return (
    <NavigationContainer>
      <AppStackScreens />
    </NavigationContainer>
  );
};