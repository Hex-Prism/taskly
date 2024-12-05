import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import {
    FormControl,
    Input,
    Button,
    Text,
    Box,
    Flex,
    Heading,
    Stack,
    FormErrorMessage
} from '@chakra-ui/react';
import { API_BASE_URL } from '../util.js';
import { useUser } from '../../context/UserContext.jsx'; 

export default function SignUp() {
    const { updateUser } = useUser();
    const navigate = useNavigate(); 
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();
    const doSubmit = async values => {
        try {
            const res = await fetch(`${API_BASE_URL}/auth/signup`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            const data = await res.json();
            if (res.status === 200) {
                toast.success('Registration was successful. You are participating in the system');
                updateUser(data);
                navigate('/profile');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Something go wrong');
        }
    }; 
    return (
        <Box p='3' maxW='lg' mx='auto'>
            <Heading
                as='h1'
                textAlign='center'
                fontSize='3xl'
                fontWeight='semibold'
                my='7'
            >
                Create an account
            </Heading>
            <form onSubmit={handleSubmit(doSubmit)}>
                <Stack gap='4'>
                    <FormControl isInvalid={errors.username}>
                        <Input
                            id='username'
                            type='text'
                            placeholder='user name'
                            {...register('username', { required: 'Имя пользователя обязательно' })}
                        />
                        <FormErrorMessage>
                            {errors.username && errors.username.message}
                        </FormErrorMessage>
                    </FormControl>
                </Stack>
                <FormControl isInvalid={errors.email}>
                    <Input
                        id='email'
                        type='email'
                        placeholder='email'
                        {...register('email', { required: 'Email обязателен' })}
                    />
                    <FormErrorMessage>
                        {errors.email && errors.email.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.password}>
                    <Input
                        id='password'
                        type='password'
                        placeholder='password'
                        {...register('password', { required: 'Пароль обязателен' })}
                    />
                    <FormErrorMessage>
                        {errors.password && errors.password.message}
                    </FormErrorMessage>
                </FormControl>
                <Button
                    type='submit'
                    isLoading={isSubmitting}
                    colorScheme='teal'
                    textTransform='uppercase'
                >
                    Register
                </Button>
            </form>
            <Flex gap='2' mt='5'>
                <Text>Already have an account?</Text>
                <Link to={'/signin'}>
                    <Text as='span' color='blue.400'>
                        Login
                    </Text>
                </Link>
            </Flex>
        </Box>
    );
}
