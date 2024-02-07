import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const transactionCollectionRef = collection(db, "transactions");
    const [transactionsTotals,setTransactionsTotals] = useState({balance:0.0,income:0.0,expenses:0.0})
    const { userId } = useGetUserInfo();
    const getTransactions = async () => {
        let unsubscribe;
        try {
            const queryTransactions = query(transactionCollectionRef, where("userId", "==", userId), orderBy("createdAt"));
            unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
                let docs = [];
                let totalIncome = 0;
                let totalExpenses = 0;

                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id;
                    docs.push({ ...data, id });
                    docs.reverse();
                    if (data.transactionType === "expense") {
                        totalExpenses +=Number(data.transactionAmount);
                    }else {
                        totalIncome += Number(data.transactionAmount);
                    }
                });
                setTransactions(docs);
                let balance = totalIncome - totalExpenses;
                setTransactionsTotals({
                    balance,
                    expenses: totalExpenses,
                    income: totalIncome,
                }
                )
            });

        } catch (error) {
            console.log(error);
        }
        return () => unsubscribe();
    }


    useEffect(() => {
        getTransactions()
    }, [])

    return { transactions, transactionsTotals };
}