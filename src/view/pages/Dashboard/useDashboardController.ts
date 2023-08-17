import { useEffect, useState } from "react";
import { useAuth } from "../../../app/hooks/useAuth";

export function useDashboardController() {
  const { userData } = useAuth();
  const [nameInitials, setNameInitials] = useState<string>();

  useEffect(() => {
    if (userData.name) {
      const nameArray = userData?.name?.split(' ');

      nameArray.length > 1
        ? setNameInitials(nameArray[0].charAt(0) + nameArray[1].charAt(0))
        : setNameInitials(nameArray[0].charAt(0) + nameArray[0].charAt(1))
    }

  }, [userData]);

  return { nameInitials }
}
