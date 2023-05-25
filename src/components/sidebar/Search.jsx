import { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../contexts/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async (username) => {
    setUsername(username);
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username.toLowerCase().trim())
    );
    try {
      const querySnapshot = await getDocs(q);
      const arr = [];
      if (querySnapshot.docs.length === 0) {
        setUser(null);
      } else {
        setUser(arr);
      }
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
    } catch (error) {
      setError(error);
    }
  };

  // const handleKey = (event) => {
  //   event.code === "Enter" && handleSearch();
  // };

  const handleSelect = async (user) => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), {
          messages: [],
        });

        await updateDoc(doc(db, "userChat", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChat", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      setError(error);
    }

    setUser(null);
    setUsername("");
  };

  return (
    <div className={"search relative mb-[20px]"}>
      <div className={"searchForm"}>
        <input
          // onKeyDown={handleKey}
          onChange={(event) => handleSearch(event.target.value)}
          value={username}
          className={`h-[50px] w-full bg-lightMessage p-[16px] placeholder:text-[16px] focus:outline-none dark:bg-darkMessage ${
            user ? "rounded-t-[10px]" : "rounded-[10px]"
          }`}
          placeholder={"🔍 Поиск..."}
        />
      </div>
      {user &&
        user.map((user, index) => (
          <div
            key={index}
            onClick={() => handleSelect(user)}
            className={`foundUser absolute flex w-full 
            cursor-pointer items-center gap-4 bg-lightMessage p-[10px] 
            transition-all last-of-type:rounded-b-[10px] hover:bg-lightHover dark:bg-darkMessage dark:hover:bg-darkHover`}
            style={{
              top: 50 + index * 70,
            }}
          >
            <img
              src={user.photoURL}
              alt={"avatar"}
              className={"h-[50px] w-[50px] rounded-full object-cover"}
            />
            <span>{user.displayName}</span>
          </div>
        ))}
    </div>
  );
};

export default Search;
