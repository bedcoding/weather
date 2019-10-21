import React from "react"
import { StyleSheet, Text, View } from "react-native"

// 말 그대로 로딩창이다.
export default function Loading() {
  return <View style={styles.container}></View>
}

const styles = StyleSheet.create({
  // 배경화면 색깔 넣기
  container: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 30,
    paddingVertical: 100,
    backgroundColor: "#FDF6AA",
  },

  // text 없애버려서 안 쓰이는중
  text: {
    color: "#2c2c2c",
    fontSize: 30,
  },
})
