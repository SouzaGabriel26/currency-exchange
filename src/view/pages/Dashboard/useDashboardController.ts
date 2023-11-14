import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../../../app/hooks/useAuth";

export function useDashboardController() {
  const { userData } = useAuth();
  const [nameInitials, setNameInitials] = useState<string>();
  const [updatedValue, setUpdatedValue] = useState<{usdValue: number, gbpValue: number, updatedAt: string}>();
  const socket = io("http://localhost:3001");

  useEffect(() => {
    if (userData.name) {
      const nameArray = userData?.name?.split(' ');

      nameArray.length > 1
        ? setNameInitials(nameArray[0].charAt(0) + nameArray[1].charAt(0))
        : setNameInitials(nameArray[0].charAt(0) + nameArray[0].charAt(1))
    }

  }, [userData, setNameInitials]);

  useEffect(() => {
    const loginMessage = {
      type: "login",
      username: userData.name,
    };
    if (updatedValue) {
      socket.emit('value', loginMessage);
    } else {
      socket.emit('firstValue', loginMessage);
    }
  }, [socket, userData.name, updatedValue]);

  socket.on('updated-values', (data) => {
    setUpdatedValue(data);
  });

  return { nameInitials, updatedValue }
}
