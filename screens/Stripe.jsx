import CardInput from "../components/stripeForm";

import React, { useEffect, useState } from "react";
import { ScrollView, ImageBackground, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import { Button, Headline } from "react-native-paper";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

function StripeCheckout() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  return (
    <ImageBackground
      source={require("../assets/logo.jpg")}
      style={styles.background}
    >
      <ScrollView>
        <View style={styles.container}>
          <Headline style={styles.headline}>Checkout</Headline>
          <TextInput label="Full name" />
          <TextInput label="email" />
          <TextInput label="phone" />
          {loading ? (
            <Button mode="contained" loading="true">
              checkout
            </Button>
          ) : (
            <Button mode="contained">checkout</Button>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  headline: {
    textAlign: "center",
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  container: {
    marginTop: 200,
    width: "90%",
    marginLeft: 20,
  },
});
export default StripeCheckout;
