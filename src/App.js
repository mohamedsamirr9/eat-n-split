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
  return (
    <>
      <div className="app">
        <FriendsList />
      </div>
    </>
  );
}

function FriendsList() {
  const [friends, setFriends] = useState(initialFriends);
  const [openAddFriend, setOpenAddFriend] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("https://i.pravatar.cc/48");

  function addFriend(e) {
    e.preventDefault();
    if (name === "" || url === "") return;
    setFriends([
      ...friends,
      { id: Date.now(), name: name, image: url, balance: 0 },
    ]);
    setName("");
    setOpenAddFriend(false);
  }

  return (
    <div className="sidebar">
      <ul>
        {friends.map((friend) => (
          <Friend friend={friend} key={friend.id} />
        ))}
      </ul>
      {openAddFriend && (
        <AddFriend
          onAddFriend={addFriend}
          onSetName={setName}
          onSetUrl={setUrl}
          url={url}
        />
      )}

      <button onClick={() => setOpenAddFriend(!openAddFriend)} class="button">
        {openAddFriend ? "Close" : "Add friend"}
      </button>
    </div>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      <p
        className={`${
          friend.balance === 0 ? "" : friend.balance > 0 ? "green" : "red"
        }`}
      >
        {friend.balance === 0
          ? "You and Anthony are even"
          : friend.balance > 0
          ? `${friend.name} owes you ${friend.balance}€`
          : `You owe ${friend.name} ${Math.abs(friend.balance)}€`}
      </p>
      <button className="button">Select</button>
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
