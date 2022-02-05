import { StyleSheet, View, Image, Text } from "react-native"

export interface IEmoteProps {
    name: string;
    id: number | string;
}

export default function Emote(props: IEmoteProps): JSX.Element {
    const emoteName: string = props.name.includes('@') ?
        props.name.split('.')[0].split('@')[0] :
        props.name.split('.')[0];

    const endpoint: string = props.name.includes('@') ?
        "http://vezqi.com/duplicates/" :
        "http://vezqi.com/emotes/";

    // We can optionally add back our <Text style={styles.emoteId}>{props.id}</Text>
    return (
        <View style={styles.emote}>
            <Image style={styles.emoteSrc} source={{ uri: endpoint + props.name }} />
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.emoteLabel}>{emoteName}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    emote: {
        width: 100,
        height: 125,
        borderRadius: 5,
        marginTop: 2,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#323130",
    },

    emoteSrc: {
        paddingTop: 25,
        width: 60,
        height: 60,
        margin: "auto",
    },

    emoteId: {
        fontSize: 10,
        color: "#fff",
        textAlign: "center",
        marginTop: 5
    },

    emoteLabel: {
        marginTop: 10,
        fontSize: 10,
        color: "#fff"
    }
});