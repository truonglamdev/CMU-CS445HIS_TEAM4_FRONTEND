import socketIOClient from 'socket.io-client';
import Cookies from 'universal-cookie';

const cookies = new Cookies(null, { path: '/' });
const ENDPOINT = 'http://localhost:8085'; // URL của server
const token = cookies.get('accessToken');
// Thay thế bằng JWT thực tế của bạn
const socket = socketIOClient(ENDPOINT, {
    query: { token },
});

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

export default socket;
