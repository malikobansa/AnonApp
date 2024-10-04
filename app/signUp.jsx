import { Alert, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import BackButton from '../components/BackButton';
import { useRouter } from 'expo-router';
import { theme } from '../constants/theme';
import { hp, wp } from '../helpers/common';
import Input from '../components/Input';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Button from '../components/Button';
import AntDesign from '@expo/vector-icons/AntDesign';
import { supabase } from '../lib/supabase';

const SignUp = () => {
    const router = useRouter();
    const emailRef = useRef("");
    const nameRef = useRef("");
    const passwordRef = useRef("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async()=>{
        if(!emailRef.current || !passwordRef.current){
            Alert.alert('Sign Up', 'please fill all the fields!');
            return;
        }

        let name = nameRef.current.trim();
        let email = emailRef.current.trim();
        let password = passwordRef.current.trim();
        
        setLoading(true);

        const {data: {session}, error} = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name
                }
            }
        });
        setLoading(false);

        if(error){
            Alert.alert('Sign Up', error.message);
        }
    }

  return (
    <ScreenWrapper bg='white'>
        <StatusBar styles="dark"/>
        <View style={styles.container}>
            <BackButton router={router}/>
            <View>
                <Text style={styles.welcomeText}>Let's 🖐</Text>
                <Text style={styles.welcomeText}>Get Started</Text>
            </View>

            <View style={styles.form}>
                <Text style={{fontSize: hp(1.5), color: theme.colors.text}}>
                    Please enter the details to create an account
                </Text>
                <Input
                    icon={<AntDesign name="user" size={26} color="black" />}
                    placeholder="Enter your Name"
                    onChangeText={value=> nameRef.current = value}
                />
                <Input
                    icon={<Feather name="mail" size={26} color="black" />}
                    placeholder="Enter your Email"
                    onChangeText={value=> emailRef.current = value}
                />
                <Input
                    icon={<MaterialIcons name="password" size={26} color="black" />}
                    placeholder="Enter your Password"
                    onChangeText={value=> passwordRef.current = value}
                    secureTextEntry
                />
                <Button
                    title={'Sign Up'}
                    loading={loading}
                    onPress={onSubmit}
                />
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Already have an account?
                </Text>
                <Pressable onPress={()=> router.push('login')}>
                    <Text style={[styles.footerText, {color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold}]}>
                        Log In
                    </Text>
                </Pressable>
            </View>
        </View>
    </ScreenWrapper>
  )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 45,
        paddingHorizontal: wp(5),
    },
    welcomeText: {
        fontSize: hp(4),
        fontWeight: theme.fonts.bold,
        color: theme.colors.text
    },
    form: {
        gap: 25
    },
    forgotPassword: {
        textAlign:'right',
        fontWeight: theme.fonts.semibold,
        color: theme.colors.text,
    },
    footer: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:'center',
        gap: 5,
    },
    footerText: {
        textAlign:'center',
        color: theme.colors.text,
        fontSize: hp(1.6)
    }
})