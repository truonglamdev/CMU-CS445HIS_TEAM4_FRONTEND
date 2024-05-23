import { createContext, useState, useContext, useEffect } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

// eslint-disable-next-line react/prop-types
export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState(() => {
        const savedNotifications = localStorage.getItem('notifications');
        return savedNotifications ? JSON.parse(savedNotifications) : [];
    });

    const [newNotification, setNewNotification] = useState([]);

    useEffect(() => {
        localStorage.setItem('notifications', JSON.stringify(notifications));
    }, [notifications]);

    const addNotification = (message) => {
        setNotifications((prevNotifications) => [...prevNotifications, message]);
        setNewNotification((prevNotifications) => [...prevNotifications, message]);
    };

    const clearNotifications = () => {
        setNotifications([]);
        setNewNotification([]);
    };

    const readNotification = () => {
        setNewNotification([]);
    };

    return (
        <NotificationContext.Provider
            value={{ notifications, addNotification, clearNotifications, readNotification, newNotification }}
        >
            {children}
        </NotificationContext.Provider>
    );
};
