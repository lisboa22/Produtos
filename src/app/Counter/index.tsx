import { useState } from "react";
import {Text, Button, View} from "react-native";

export default function Counter() {
    const [count, setCount] = useState(0);

    function incremento() {
        setCount(count + 1);
    }

    function decremento() {
        setCount(count - 1);
    }

    return (
        <View>
            <Text>{count}</Text>
            <Button title="Increment" onPress={incremento} />
            <Button title="Decrement" onPress={decremento} />
        </View>
    );
}
