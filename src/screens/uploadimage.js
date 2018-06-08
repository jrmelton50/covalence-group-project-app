import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import { styles } from '../../App';

export default class UploadImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: "",
            uploadImage: false
        }
    }

    uploadFile(file) {
        return RNFetchBlob.fetch('POST', 'https://api.cloudinary.com/v1_1/hxkggeeaw/image/upload?upload_preset=gbe07ivt', {
            'Content-Type': 'multipart/form-data'
        }, [
                { name: 'file', filename: file.fileName, data: RNFetchBlob.wrap(file.origURL) }
            ])
    }

    submit() {
        let options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }

        this.setState({
            uploadImg: true
        });

        ImagePicker.showImagePicker(options, (res) => {
            if (res.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (res.error) {
                console.log('Image Picker Error: ', res.error);
            }
            else if (res.customButton) {
                console.log('User tapped the custom button: ', res.customButton);
            }
            else {
                uploadFile(res)
                    .then(res => res.json())
                    .then(result => {
                        this.setState({
                            avatarSource: { uri: result.secure_url },
                            uploadImg: false
                        });
                    })
            }
        });
    }

    render() {
        return (
            <View style={styles.container} >
                <Text>React Native Image Upload with Cloudinary!</Text>
                <TouchableOpacity onPress={this.submit} style={styles.imageBtn} >
                    <Image source={this.state.avatarSource} />
                    {/* <Image source={this.state.avatarSource} styles={styles.image} /> */}
                </TouchableOpacity>
            </View>
        )
    }
}