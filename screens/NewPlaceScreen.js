import React, { useState, useCallback } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import ImagePicker from "../components/ImagePicker";
import LocationPicker from "../components/LocationPicker";

import Colors from "../constants/Colors";
import * as placesAction from "../store/places-actions";

const NewPlaceScreen = (props) => {
    const [titleValue, setTitleValue] = useState("");
    const [selectedImage, setSelectedImage] = useState();
    const [selectedLocation, setSelectedLocation] = useState();

    const dispatch = useDispatch();

    const titleCahngeHandler = (text) => {
        //possible to add validation
        setTitleValue(text);
    };

    const imageTakenHandler = (imagePath) => {
        setSelectedImage(imagePath);
    };

    const locationPickedHandler = useCallback((location) => {
        setSelectedLocation(location);
    }, []);

    const savePlaceHandler = () => {
        dispatch(
            placesAction.addPlace(titleValue, selectedImage, selectedLocation)
        );
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
                <ImagePicker onImageTaken={imageTakenHandler} />
                <LocationPicker
                    navigation={props.navigation}
                    onLocationPicked={locationPickedHandler}
                />
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
