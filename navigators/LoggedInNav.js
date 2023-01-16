import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from "../screens/Feed";
import Notifications from "../screens/Notifications";
import Search from "../screens/Search";
import { View } from "react-native";
import TabIcon from "../components/nav/TabIcon";
import Me from "../screens/Me";
import StackNavFactory from "../components/nav/StackNavFactory";

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerTitle: () => false,
        headerTransparent: true,
        tabBarStyle: {
          backgroundColor: "black",
          borderTopColor: "rgba(255,255,255,0.3)",
        },
        tabBarActiveTintColor: "white",
      }}
    >
      <Tabs.Screen
        name="Feed"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon color={color} iconName={"home"} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Feed" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon color={color} iconName={"search"} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Search" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="Camera"
        component={View}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon color={color} iconName={"camera"} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="Notifications"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon color={color} iconName={"heart"} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Notifications" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="Me"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon color={color} iconName={"person"} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Me" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
