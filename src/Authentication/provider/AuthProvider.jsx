import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () => {
        setLoading(true);
        googleProvider.setCustomParameters({
            prompt: 'select_account'
        });
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = async () => {
        setLoading(true);
        try {
            localStorage.removeItem('access-token');
            await signOut(auth);
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            try {
                setUser(currentUser);
                if (currentUser) {
                    // get token and store it
                    const userInfo = { email: currentUser.email };
                    const response = await axiosPublic.post('/jwt', userInfo);
                    if (response.data.token) {
                        localStorage.setItem('access-token', response.data.token);
                        // Check admin status after getting token
                        const adminCheck = await axiosPublic.get(`/users/admin/${currentUser.email}`);
                        setIsAdmin(adminCheck.data.isAdmin);
                    }
                } else {
                    localStorage.removeItem('access-token');
                    setIsAdmin(false);
                }
            } catch (error) {
                console.error('Auth state change error:', error);
            } finally {
                setLoading(false);
            }
        });
    
        return () => unsubscribe();
    }, [axiosPublic]);

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;