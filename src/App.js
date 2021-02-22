import React, { useState, useEffect } from 'react';
// Components
import User from './User';
// Styles
import { Content, Loading } from './App.styles';
// API
import { getUsers } from './API';

function App() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    console.log(scrollHeight)
    console.log(scrollTop)
    console.log(clientHeight)

    // scrollTop: the number of pixels that you have scrolled on the div
    // clientHeight: the size the element which is being scrolled in. It doesn't change
    // scrollHeight: the content in the element. when more data is added, this will increase
    // if the scrollHeight minus the scrollTop is equal to the clientHeight then you have scrolled to the bottom
    if (scrollHeight - scrollTop === clientHeight) {
      // add 1 to page which will trigger the useEffect and get more users.
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    // to use async with useEffect it needs to be used with another function inside and not on useEffect directly
    const loadUsers = async () => {
      setLoading(true); // this is the beginning of fetching data
      const newUsers = await getUsers(page); // fetch first list or next lost of users
      setUsers((prev) => [...prev, ...newUsers]); // use spread operator to carry the previous state forward and concat the newusers to it
      setLoading(false); // loading has finished so it can be set to false
    };

    loadUsers();
  }, [page]); // run useEffect on initial render and everytime 'page' is changed

  return (
    <div className='App'>
      <Content onScroll={handleScroll}>
        {users && users.map((user) => <User key={user.cell} user={user} />)}
      </Content>
      {loading && <Loading>Loading ...</Loading>}
    </div>
  );
}

export default App;
