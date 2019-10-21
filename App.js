import React from "react"
import { Alert } from "react-native"
import Loading from "./Loading"
import * as Location from "expo-location"
import axios from "axios"
import Weather from "./Weather"
import { Ionicons } from "@expo/vector-icons"

// 제작 과정 메모: https://cafe.naver.com/ggavi2000/12027
// API 호출 방법: api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&APPID=내 API키
// 여기서 {lat}이랑 {lon} 부분에 latitude와 longitude 값을 넣어주고 주소창에 넣으면 json 파일 형태로 뜬다.
// 실제 링크 예시: http://api.openweathermap.org/data/2.5/weather?lat=37.4219506&lon=-122.0840128&APPID=내 API키

const API_KEY = "8c8b7c1d506b1e9dc8b0d43ea421f905" // https://home.openweathermap.org/api_keys 여기서 키를 받았다.

export default class extends React.Component {
  state = { isLoading: true } // 로딩중...

  // 우리는 위 URL을 fetch하기 위해 별도의 함수를 만든다. (npm install axios 필요)
  getWeather = async (latitude, longitude) => {
    // 주의: 문자열에 변수를 포함시켜야 하므로, 링크는 `(백틱)을 넣어야 한다 (&units=metric은 섭씨 온도 보는 옵션)
    const {
      data: {
        main: { temp },
        weather,
      },
    } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`)

    this.setState({
      isLoading: false,
      condition: weather[0].main,
      temp,
    })
  }

  // await이기 때문에 별도의 함수로 뺐다.
  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync() // 사용자에게 권한 묻기
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync() // 위치 찾기
      this.getWeather(latitude, longitude)
      this.setState({ isLoading: false }) // 로딩 끝
    } catch (error) {
      Alert.alert("당신을 찾을 수 없습니다", "으앙")
    }
  }

  // 이제 요청을 해보자
  componentDidMount() {
    this.getLocation()
  }

  render() {
    const { isLoading, temp, condition } = this.state
    console.log("================================")
    console.log("[디버깅] temp 값: " + temp)
    console.log("[디버깅] condition 값: " + condition)

    return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition} /> //  로딩 끝나면 Weather.js 보여준다.
  }
}
