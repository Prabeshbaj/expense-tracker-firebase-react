import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import "./styles.css";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
export const ExpenseTracker = () => {

    const navigate = useNavigate();
    const { addTransaction } = useAddTransaction();
    const [description, setDescription] = useState("");
    const { transactions, transactionsTotals } = useGetTransactions();
    const { name, profilePhoto } = useGetUserInfo();
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionType, setTransactionType] = useState("expense");

    const { balance, income, expenses } = transactionsTotals;
    const signUserOut = async () => {
        try {
            await signOut(auth);
            localStorage.clear();
            navigate("/");
        }
        catch (err) {
            console.error(err);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        addTransaction({ description, transactionAmount, transactionType });
        setDescription("");
        setTransactionAmount(0);
    }

    return (
        <>
            <div class="container-md">

                <div className="container">
                    <div class="row">
                        <div class="col-sm text-center">
                            <h1> {name}'s Expense Tracker</h1> </div>
                        <div class="col-sm">
                            {profilePhoto && <div className="profile"><img className="profile-photo" src={profilePhoto} alt="" /> </div>}
                        </div>
                        <div class="col-sm text-right">
                            <button className="btn btn-danger" onClick={signUserOut}>Sign Out</button>
                        </div> 

                        <div className="balance">
                            <h3>Your balance</h3>
                            {balance >= 0 ? (<h2> ${balance}</h2>) : (<h2>-${balance * -1} </h2>)}
                        </div>
                        <div className="summary">
                            <div className="income">
                                <h4>Income</h4>
                                <p>${income}</p>
                            </div>
                            <div className="expenses">
                                <h4>Expenses</h4>
                                <p>${expenses}</p>
                            </div>
                        </div>
                        <form action="" className="" onSubmit={onSubmit}>
                        <div class="mb-3">
                        <label for="description" class="form-label">Description</label>
                            <input type="text" class="form-control" placeholder="Description" value={description} id="description" required onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div class="mb-3">
                            <label for="amount" class="form-label">Amount</label>
                            <input type="number" class="form-control" placeholder="Amount" required value={transactionAmount} id="amount" onChange={(e) => setTransactionAmount(e.target.value)} />
                            </div>
                            <div class="mb-3 form-check">
                            <input type="radio" class="form-check-input" id="expense" value="expense" checked={transactionType === "expense"} onChange={(e) => setTransactionType(e.target.value)} />
                            <label htmlFor="expense">Expense</label>
                            </div>
                            <div class="mb-3 form-check">
                            <input type="radio" class="form-check-input" id="income" value="income" checked={transactionType === "income"} onChange={(e) => setTransactionType(e.target.value)} />
                            <label htmlFor="income">Income</label>
                            </div>
                            
                            <button type="submit" class="btn btn-success">Add Transaction</button>
                        </form>
                    </div>


                </div>
                <div className="transactions">
                    <h3>Transactions</h3>
                    <ul>
                        {transactions.map((transaction) => {
                            const { description, transactionAmount, transactionType } = transaction;
                            return <li>
                                <h4>{description}</h4>
                                <p>${transactionAmount} - <label style={{ color: transactionType === "expense" ? "red" : "green" }}>{transactionType}</label></p>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
}