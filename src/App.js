import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [openAddFriend, setOpenAddFriend] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("https://i.pravatar.cc/48");

  const [friend, setFriend] = useState({});
  const [bill, setBill] = useState("");
  const [expense, setExpense] = useState("");
  const [paying, setPaying] = useState("You");
  const [openSplitBillForm, setOpenSplitBillForm] = useState(false);

  let selectFriendId = friend.id;

  function addFriend(e) {
    e.preventDefault();
    if (!name || !url) return;
    setFriends([
      ...friends,
      { id: Date.now(), name: name, image: url, balance: 0 },
    ]);
    setName("");
    setOpenAddFriend(false);
  }

  function splitBiLL(e) {
    e.preventDefault();
    if (bill === "" || expense === "") return;
    let friendId = friend.id;
    let newFriends;

    newFriends = friends.map((friend) =>
      friend.id === friendId
        ? {
            ...friend,
            balance:
              paying === "You"
                ? friend.balance + (bill - expense)
                : friend.balance - expense,
          }
        : friend
    );
    setFriends(newFriends);
    setOpenSplitBillForm(false);
    setBill(null);
    setExpense(null);
  }

  return (
    <>
      <div className="app">
        <div className="sidebar">
          <FriendsList
            friends={friends}
            onSetFriend={setFriend}
            onSetSplitBillForm={setOpenSplitBillForm}
            openSplitBillForm={openSplitBillForm}
            selectFriendId={selectFriendId}
          />
          {openAddFriend && (
            <AddFriend
              onAddFriend={addFriend}
              onSetName={setName}
              onSetUrl={setUrl}
              url={url}
            />
          )}
          <button
            onClick={() => setOpenAddFriend(!openAddFriend)}
            class="button"
          >
            {openAddFriend ? "Close" : "Add friend"}
          </button>
        </div>
        <FormSplitBill
          friend={friend}
          paying={paying}
          onSetPaying={setPaying}
          bill={bill}
          onSetBill={setBill}
          expense={expense}
          onSetExpense={setExpense}
          onSplitBill={splitBiLL}
          openSplitBillForm={openSplitBillForm}
        />
      </div>
    </>
  );
}

function FriendsList({
  friends,
  onSetFriend,
  onSetSplitBillForm,
  openSplitBillForm,
  selectFriendId,
}) {
  return (
    <>
      <ul>
        {friends.map((friend) => (
          <Friend
            friend={friend}
            key={friend.id}
            onSetFriend={onSetFriend}
            onSetSplitBillForm={onSetSplitBillForm}
            openSplitBillForm={openSplitBillForm}
            selectFriendId={selectFriendId}
          />
        ))}
      </ul>
    </>
  );
}

function Friend({
  friend,
  onSetFriend,
  onSetSplitBillForm,
  openSplitBillForm,
  selectFriendId,
}) {
  return (
    <li
      className={`${
        openSplitBillForm && friend.id === selectFriendId ? "selected" : ""
      }`}
    >
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      <p
        className={`${
          friend.balance === 0 ? "" : friend.balance > 0 ? "green" : "red"
        }`}
      >
        {friend.balance === 0
          ? `You and ${friend.name} are even`
          : friend.balance > 0
          ? `${friend.name} owes you ${friend.balance}€`
          : `You owe ${friend.name} ${Math.abs(friend.balance)}€`}
      </p>
      <button
        className="button"
        onClick={() => {
          onSetFriend(friend);
          onSetSplitBillForm(!openSplitBillForm);
        }}
      >
        {friend.id === selectFriendId
          ? openSplitBillForm
            ? "Close"
            : "Select"
          : "Select"}
      </button>
    </li>
  );
}

function AddFriend({ onAddFriend, onSetName, onSetUrl, url }) {
  return (
    <form onSubmit={(e) => onAddFriend(e)} className="form-add-friend">
      <label>👫 Friend name</label>
      <input type="text" onChange={(e) => onSetName(e.target.value)} />
      <label>🌄 Image URL</label>
      <input
        type="text"
        value={url}
        onChange={(e) => onSetUrl(e.target.value)}
      />
      <button onClick={(e) => onAddFriend(e)} className="button">
        Add
      </button>
    </form>
  );
}

function FormSplitBill({
  friend,
  paying,
  onSetPaying,
  bill,
  onSetBill,
  expense,
  onSetExpense,
  onSplitBill,
  openSplitBillForm,
}) {
  return (
    openSplitBillForm && (
      <form className="form-split-bill " onSubmit={(e) => onSplitBill(e)}>
        <h2>Split a bill with {friend.name}</h2>
        <label>💰 Bill value</label>
        <input type="number" onChange={(e) => onSetBill(e.target.value)} />
        <label>🧍‍♀️ Your expense</label>
        <input type="number" onChange={(e) => onSetExpense(e.target.value)} />
        <label>👫 {friend.name}'s expense</label>
        <input type="number" disabled value={bill - expense} />
        <label>🤑 Who is paying the bill</label>
        <select value={paying} onChange={(e) => onSetPaying(e.target.value)}>
          <option value="You">You</option>
          <option value={friend.name}>{friend.name}</option>
        </select>
        <button className="button" onClick={(e) => onSplitBill(e)}>
          Split Bill
        </button>
      </form>
    )
  );
}
