import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { globalStyles } from "../styles/global";
import Card from "../shared/card";
import { MaterialIcons } from "@expo/vector-icons";
import ReviewForm from "./reviewForm";

export default function Home({ navigation }) {
  const [modelOpen, setModalOpen] = useState(false);
  const [reviews, setReviews] = useState([
    {
      title: "The Lord of the Trades: The Fellowship of the Trial",
      rating: 5,
      body:
        "A young hobbit, Fouzan, who has found a winning business model, longed for by the Dark Lord of British Gas, begins his journey with three companions to The Office Group, in the hope of enacting it.",
      key: "1"
    },
    {
      title: "The Lord of the Trades: The Two Offices",
      rating: 4,
      body:
        "Fouzan and Pravin arrive in WeWork with the help of Maxxwell. A number of new allies join their former companions to defend WeWork as SoftBank launches an assault on it.",
      key: "2"
    },
    {
      title: "The Lord of the Trades: The Return of the Kosta",
      rating: 3,
      body:
        "The former Fellowship members prepare for the final battle. While Fouzan and Pravin approach Notting Hill to submit their Q1 goals, Kosta arrives at WeWork to attempt to claim what he believes is his birthright.",
      key: "3"
    }
  ]);

  const addReview = review => {
    review.key = Math.random().toString();
    setReviews(currentReviews => {
      return [review, ...currentReviews];
    });
    setModalOpen(false);
  };

  return (
    <View style={globalStyles.container}>
      <Modal visible={modelOpen} animationType="slide">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons
              name="close"
              size={24}
              style={{ ...styles.modalToggle, ...styles.modalClose }}
              onPress={() => setModalOpen(false)}
            />
            <ReviewForm addReview={addReview} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <MaterialIcons
        name="add"
        size={24}
        style={styles.modalToggle}
        onPress={() => setModalOpen(true)}
      />

      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("ReviewDetails", item)}
          >
            <Card>
              <Text style={globalStyles.titleText}>{item.title}</Text>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  modalToggle: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center"
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0
  },
  modalContent: {
    flex: 1
  }
});
