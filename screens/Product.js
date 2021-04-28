import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Picker } from "react-native";
import { Image } from "react-native";
import { FlatList, Platform, Text, View, StyleSheet } from "react-native";
import { Card, Button, Avatar } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';


function Product({ navigation }) {
    const [selectedValue, setSelectedValue] = useState("USD");
    const [changeCurrency, setChangeCurrency] = useState(true);
    const [changeLanguage, setChangeLanguage] = useState(true);
    const [selectedValueLang, setSelectedValueLang] = useState("ENGLISH");
    const data = [
        {
            id: 1,
            nameFtour: 'Ftour1',
            nameFtourArabe: 'فطور رقم واحد',
            image: 'https://res.cloudinary.com/dzjzhwh7o/image/upload/v1619192458/ftour1_ds5phv.jpg',
            price: 200,
            shipping: 'free'
        },
        {
            id: 2,
            nameFtour: 'Ftour2',
            nameFtourArabe: 'فطور رقم اثنان',
            image: 'https://res.cloudinary.com/dzjzhwh7o/image/upload/v1619192458/ftour2_cptyf3.jpg',
            price: 300,
            shipping: 'free'
        },
        {
            id: 3,
            nameFtourArabe: 'فطور رقم ثلاثة',
            nameFtour: 'Ftour2',
            image: 'https://res.cloudinary.com/dzjzhwh7o/image/upload/v1619192459/ftour3_cxccj5.jpg',
            price: 400,
            shipping: 'free'
        }
    ]

    const [currency, setCurrency] = useState();
    async function setData() {
        await AsyncStorage.setItem('currency', 'true')
        await AsyncStorage.setItem('language', 'true')

    }
    useEffect(() => {
        setData()
        axios.get("https://currencyapi.net/api/v1/rates?key=oecDXw0XohoXOxIiGpnoPn2zeYZwWSmg6QIs&base=USD").then((data) => {
            setCurrency(data.data.rates)
        })
    }, [])

    return (
        <ScrollView>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, width: 150 }}
                    onValueChange={async (itemValue, itemIndex) => {
                        setSelectedValue(itemValue)
                        setChangeCurrency(!changeCurrency)
                        await AsyncStorage.setItem('currency', !changeCurrency)
                    }}
                >
                    <Picker.Item label="USD" value="USD" />
                    <Picker.Item label="EUR" value="EUR" />
                </Picker>
                <Picker
                    selectedValue={selectedValueLang}
                    style={{ height: 50, width: 150 }}
                    onValueChange={async (itemValue, itemIndex) => {
                        setSelectedValueLang(itemValue)
                        setChangeLanguage(!changeLanguage)
                        await AsyncStorage.setItem('language', `${!changeLanguage}`)

                    }}
                >
                    <Picker.Item label="ARABE" value="ARABE" />
                    <Picker.Item label="ENGLISH" value="ENGLISH" />
                </Picker>
            </View>
            {data.map(element => (
                <Card key={element.id}>
                    <Image source={{ uri: element.image }} style={{
                        alignSelf: 'stretch', resizeMode: 'contain', width: 300, height: 200, marginRight: 10
                    }} />
                    <Text
                        style={{
                            marginBottom: 10,
                            marginTop: 20,
                        }}

                    >
                        {changeLanguage ? element.nameFtour : element.nameFtourArabe}
                    </Text>


                    <Text style={styles.price} h4>
                        {changeCurrency ? '$ ' + element.price : '€' + (currency.EUR * element.price).toFixed(2)}
                    </Text>
                    <Text h6 style={styles.description}>
                        {changeLanguage ? 'shipping ' + element.shipping : 'التوصيل مجاني'}
                    </Text>
                    {changeLanguage ? (<Button type="clear" title="Buy now" onPress={async () => {
                        await AsyncStorage.setItem('data', JSON.stringify(element))
                        navigation.navigate('Checkout')
                    }} />) :
                        (<Button type="clear" title="شراء الان" onPress={async () => {
                            await AsyncStorage.setItem('data', JSON.stringify(element))
                            navigation.navigate('Checkout')
                        }} />)
                    }

                </Card>
            ))}


        </ScrollView >
    );
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
    },
    name: {
        color: "#5a647d",
        fontWeight: "bold",
        fontSize: 30,
    },
    price: {
        fontWeight: "bold",
        marginBottom: 10,
    },
    description: {
        fontSize: 10,
        color: "#c1c4cd",
    },
});

export default Product;
