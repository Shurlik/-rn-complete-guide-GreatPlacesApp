import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import ImagePicker from "../components/ImagePicker";

import Colors from "../constants/Colors";
import * as placesAction from "../store/places-actions";

const NewPlaceScreen = (props) => {
    const [titleValue, setTitleValue] = useState("");

    const dispatch = useDispatch();

    const titleCahngeHandler = (text) => {
        //possible to add validation
        setTitleValue(text);
    };

    const savePlaceHandler = () => {
        dispatch(placesAction.addPlace(titleValue));
        props.navigation.goBack();
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.lable}>Title</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={titleCahngeHandler}
                    value={titleValue}
                />
                <ImagePicker />
                <Button
                    title="Save place"
                    color={Colors.primary}
                    onPress={savePlaceHandler}
                />
            </View>
        </ScrollView>
    );
};

NewPlaceScreen.navigationOptions = {
    headerTitle: "Add place",
};

export default NewPlaceScreen;

const styles = StyleSheet.create({
    form: {
        margin: 30,
    },
    lable: {
        fontSize: 18,
        marginBottom: 15,
    },
    textInput: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2,
    },
});
