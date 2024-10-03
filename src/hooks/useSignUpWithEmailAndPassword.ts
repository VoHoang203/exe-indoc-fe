import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, fireStore } from "../FireBase/firebase";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import {toast} from "react-toastify"
import useAuthStore from "../strore/authStore";
import { RegisterInputs } from "../pages/Register/Register";
import { User } from "../strore/authStore";
import { useState } from "react";

const useSignUpWithEmailAndPassword = () => {
	const [createUserWithEmailAndPassword, , loading, error] = useCreateUserWithEmailAndPassword(auth);
	const loginUser = useAuthStore((state) => state.login);
	const [customError,setCustomEror] = useState<string | null>(null)
	const signup = async (inputs:RegisterInputs) => {
		if (!inputs.email || !inputs.password ) {
			toast.error("Please fill all the fields")
			setCustomEror("Please fill all the fields")
			return;
		}

		const usersRef = collection(fireStore, "users");

		const q = query(usersRef, where("username", "==", inputs.email));
		const querySnapshot = await getDocs(q);

		if (!querySnapshot.empty) {
			console.log("alo",JSON.stringify(error))
			toast.error("Username already exists")
			setCustomEror("Username already exists")
			return;
		}

		try {
			const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
			if (!newUser && error) {
				toast.error(JSON.stringify(error))
				setCustomEror(JSON.stringify(error))
				return;
			}
			if (newUser) {
				const userDoc : User = {
					uid: newUser.user.uid,
					email: inputs.email,
					username: inputs.email,
					password: inputs.password,
					bio: "",
					profilePicURL: "",
					followers: [],
					following: [],
					posts: [],
					role: 'buyer',
					createdAt: Date.now(),
					updateAt:Date.now(),
					isDelete:false,
				};
				await setDoc(doc(fireStore, "users", newUser.user.uid), userDoc);
				localStorage.setItem("user-info", JSON.stringify(userDoc));
				loginUser(userDoc);
			}
		} catch (error) {
			
			toast.error(JSON.stringify(error))
			setCustomEror(JSON.stringify(error))
		}
	};

	return { loading, customError, signup };
};

export default useSignUpWithEmailAndPassword;