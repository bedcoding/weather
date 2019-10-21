import React from "react"
import { View, Text, StyleSheet, StatusBar } from "react-native"
import PropTypes from "prop-types" // props를 몇개 가질 예정이므로 npm install prop-types를 해준다.
import { LinearGradient } from "expo-linear-gradient"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const weatherOptions = {
  // 콘솔 로그로 찍어보니 처음 2번은 undefined를 보내다가 3번째에 정상적인 값을 받아오길래 undefined가 들어오면 로딩중으로 뜨게 함
  
  undefined: {
    iconName: "sync", // 로딩 아이콘
    gradient: ["black", "#D39D38"],
    title: "API 로딩중",
    // subtitle: "API를 받아오고 있습니다",
  },

  Thunderstorm: {
    iconName: "weather-lightning",
    gradient: ["#373B44", "#4286f4"],
    title: "번개",
  },

  Drizzle: {
    iconName: "weather-hail",
    gradient: ["#89F7FE", "#66A6FF"],
    title: "이슬비",
  },
  Rain: {
    iconName: "weather-rainy",
    gradient: ["#00C6FB", "#005BEA"],
    title: "Raining like a MF",
  },
  Snow: {
    iconName: "weather-snowy",
    gradient: ["#7DE2FC", "#B9B6E5"],
    title: "눈",
  },
  Atmosphere: {
    iconName: "weather-hail",
    gradient: ["#89F7FE", "#66A6FF"],
    title: "공기",
  },
  Clear: {
    iconName: "weather-sunny",
    gradient: ["#FF7300", "#FEF253"],
    title: "맑음",
  },
  Clouds: {
    iconName: "weather-cloudy",
    gradient: ["#D7D2CC", "#304352"],
    title: "구름",
  },
  Mist: {
    iconName: "weather-hail",
    gradient: ["#4DA0B0", "#D39D38"],
    title: "습한 안개",
  },
  Dust: {
    iconName: "weather-hail",
    gradient: ["#4DA0B0", "#D39D38"],
    title: "흙먼지",
    subtitle: "Thanks a lot China 🖕🏻",
  },
  Haze: {
    iconName: "weather-hail",
    gradient: ["#4DA0B0", "#D39D38"],
    title: "건조한 안개",
  },
}

export default function Weather({ temp, condition }) {
  console.log("넘어온 값: " + temp)
  console.log("넘어온 값: " + condition)

  return (
    // 아이콘 출처 : https://expo.github.io/vector-icons/
    // 만약 [condition]에 '맑음'이 들어간다면 : 맑음과 관련된 배경을 내보낸다.
    <LinearGradient colors={weatherOptions[condition].gradient} style={styles.container}>
      {/* 위쪽 화면: 만약 [condition]에 '맑음'이 들어간다면 : 맑음과 관련된 아이콘을 내보낸다 */}
      <View style={styles.halfContainer}>
        <MaterialCommunityIcons size={95} name={weatherOptions[condition].iconName} color="white" />
        <Text style={styles.temp}> 현재 온도: {temp} </Text>
      </View>

      {/* 아래쪽 화면: 스타일 2개를 전부 가져오기 위해 ... 사용 */}
      <View style={{ ...styles.halfContainer, ...styles.textContainer }}>
        <Text style={styles.title}> {weatherOptions[condition].title} </Text>
      </View>
    </LinearGradient>
  )
}

// 컴포넌트의 props 타입 확인: `isRequired`는 prop가 제공되지 않았을 때 경고를 보여줍니다.
Weather.propTypes = {
  temp: PropTypes.number.isRequired,
  condition: PropTypes.oneOf(["Thunderstorm", "Drizzle", "Rain", "Snow", "Atmosphere", "Clear", "Clouds", "Haze", "Mist", "Dust"]).isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // [온도] 글자 크기, 글자 색깔
  temp: {
    fontSize: 25,
    color: "white",
  },

  // 코드 설명: 화면을 위아래 1:1로 반씩 나눠서 위에는 날씨 정보, 밑에는 문구를 적는다.
  halfContainer: {
    flex: 1,
    justifyContent: "center", // 위 아래 가운데 정렬
    alignItems: "center", // 좌우 가운데 정렬 (온도 텍스트 표시)
  },

  title: {
    color: "white",
    fontSize: 50,
    fontWeight: "300",
    marginBottom: 10,
  },

  subtitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },

  // text가 클 경우를 대비해서
  textContainer: {
    paddingHorizontal: 20,
  },
})
