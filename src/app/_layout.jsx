import { Stack, Slot } from "expo-router"
import React from "react";

export default function RootLayout () {
    return (
    <Stack>
        <Stack.Screen name='index' options={{title: 'Exercises'}}/>
    </Stack>
    );
}