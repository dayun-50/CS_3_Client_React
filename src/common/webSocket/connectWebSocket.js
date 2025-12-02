import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;

export const connectWebSocket = (userToken, userId, onMessageReceived) => {
    if (!userToken) return console.error("WebSocket 연결 실패: 토큰 없음");

    const socket = new SockJS(`http://10.5.5.4/ws-stomp?token=${userToken}`);

    stompClient = new Client({
        webSocketFactory: () => socket,
        connectHeaders: { Authorization: `Bearer ${userToken}` },
        debug: (str) => console.log('[STOMP DEBUG]', str),
        reconnectDelay: 5000,
        onConnect: () => {
            console.log('WebSocket Connected');

            // 유저 알람 구독
            stompClient.subscribe("/user/queue/notify", (msg) => {
                try {
                    const alert = JSON.parse(msg.body);
                    onMessageReceived(alert); // 최상위 상태로 전달
                } catch (err) {
                    console.error('메시지 처리 오류', err);
                }
            });

            // 구독 완료 후 초기 DB 알람 요청
            // ⚠ 반드시 문자열 형태로 보냄
            stompClient.publish({
                destination: "/pub/notify/init",
                body: userId // JSON 객체 X, 문자열 그대로
            });
        },
        onStompError: (frame) => console.error('STOMP ERROR:', frame)
    });

    stompClient.activate();
};

// 메시지 전송
export const sendMessage = (destination, payload) => {
    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination,
            body: JSON.stringify(payload)
        });
    } else {
        console.warn('WebSocket 연결 안 됨');
    }
};
