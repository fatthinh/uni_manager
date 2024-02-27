import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserButton from "./components/UserButton";
import AdministratorPage from "./pages/AdministratorPage";
import AccountPage from "./pages/AccountPage";
import ThesesPage from "./pages/ThesesPage";
import ThesisPage from "./pages/ThesisPage";
import CouncilsPage from "./pages/CouncilsPage";
import store from "./redux/store";
import { Provider, useSelector } from "react-redux";
import MyThesis from "./pages/MyThesis";
import MyProfile from "./pages/AccountPage/MyProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LecturerCouncils from "./pages/Lecturer/LecturerCouncils";
import LecturerTheses from "./pages/Lecturer/LecturerTheses";
import PlotPage from "./pages/PlotPage";
import MessagesPage from "./pages/MessagesPage";
import InboxPage from "./pages/InboxPage";
import { ModalPortal } from "react-native-modals";

const Drawer = createDrawerNavigator();

export default function App() {
  const screens = [
    { name: "HomePage", component: HomePage, title: "Trang chủ" },
    {
      name: "AdministratorPage",
      component: AdministratorPage,
      title: "Quản Lý Tài Khoản",
    },
    { name: "ThesesPage", component: ThesesPage, title: "Quản Lý Khóa Luận" },
    {
      name: "CouncilsPage",
      component: CouncilsPage,
      title: "Quản Lý Hội Đồng",
    },
    { name: "MyThesis", component: MyThesis, title: "Khóa luận của tôi" },
    {
      name: "LecturerCouncils",
      component: LecturerCouncils,
      title: "Hội đồng của tôi",
    },
    {
      name: "PlotPage",
      component: PlotPage,
      title: "Thống Kê",
    },
    {
      name: "LoginPage",
      component: LoginPage,
      options: { headerShown: false },
    },
    {
      name: "AccountPage",
      component: AccountPage,
      options: { headerShown: false },
    },
    {
      name: "ThesisPage",
      component: ThesisPage,
      options: { headerShown: false },
    },
    {
      name: "LecturerTheses",
      component: LecturerTheses,
      options: { headerShown: false },
    },
    {
      name: "MyProfile",
      component: MyProfile,
      options: { headerShown: false },
    },

    {
      name: "MessagesPage",
      component: MessagesPage,
      options: { headerShown: false },
    },
    {
      name: "InboxPage",
      component: InboxPage,
      options: { headerShown: false },
    },
  ];

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={() => <MyDrawerItem />}
          screenOptions={{
            headerRight: UserButton,
            drawerStyle: {
              paddingTop: 50,
              backgroundColor: "#0c56d0",
              color: "#fff"
            },
            headerStyle: {
              height: 80,
              borderBottomWidth: 1,
              borderColor: "#ccc",
            },
          }}
          initialRouteName="LoginPage"
        >
          {screens.map((screen) => (
            <Drawer.Screen
              key={screen.name}
              name={screen.name}
              component={screen.component}
              options={{
                title: screen.title,
                headerTintColor: "#0c56d0",
                ...screen.options,
              }}
            />
          ))}
        </Drawer.Navigator>
      </NavigationContainer>
      <ModalPortal />
    </Provider>
  );
}

const MyDrawerItem = () => {
  const navigation = useNavigation();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [token, setToken] = useState(null);

  const drawerItems = [
    { label: "Trang chủ", screen: "HomePage", condition: userInfo },
    {
      label: "Quản Lý Tài Khoản",
      screen: "AdministratorPage",
      condition: userInfo?.role === "MANAGER",
    },
    {
      label: "Quản Lý Khóa Luận",
      screen: "ThesesPage",
      condition: userInfo?.role !== "STUDENT" && userInfo?.role !== "LECTURER",
    },
    {
      label: "Quản Lý Hội Đồng",
      screen: "CouncilsPage",
      condition: userInfo?.role === "PROVOST",
    },
    {
      label: "Khóa luận của tôi",
      screen: "MyThesis",
      condition: userInfo?.role === "STUDENT",
    },
    {
      label: "Hội đồng của tôi",
      screen: "LecturerCouncils",
      condition: userInfo?.role === "LECTURER",
    },
    {
      label: "Thống Kê",
      screen: "PlotPage",
      condition: userInfo?.role==="MANAGER" || userInfo?.role==="PROVOST",
    },
  ];

  const loadToken = async () => {
    let accessToken = await AsyncStorage.getItem("access-token");
    setToken(accessToken);
  };

  useEffect(() => {
    loadToken();
  }, [userLogin]);

  return (
    <>
      {drawerItems.map(
        ({ label, screen, condition }) =>
          condition && (
            <DrawerItem
              key={label}
              label={label}
              onPress={() => navigation.navigate(screen, { token: token })}
              labelStyle={{color:"#fff"}}
            />
          )
      )}
    </>
  );
};
